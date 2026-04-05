"""Retrieval stage: vector + keyword + hybrid (RRF).

- Vector search: pgvector cosine distance (SQLAlchemy 2.0 async).
- Keyword search: rank_bm25 over in-memory chunks. (MVP)
  실제 규모에서는 ParadeDB(pg_search) 또는 Elasticsearch로 교체 권장.
- Hybrid: Reciprocal Rank Fusion (Cormack et al., 2009).
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any

import numpy as np
from rank_bm25 import BM25Okapi
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ...models.tutor import DocumentChunk


@dataclass
class RetrievedChunk:
    chunk_id: int
    content: str
    document_title: str
    section: str | None
    metadata: dict[str, Any] = field(default_factory=dict)
    vector_score: float = 0.0
    keyword_score: float = 0.0
    hybrid_score: float = 0.0

    def to_dict(self) -> dict:
        return {
            "chunk_id": self.chunk_id,
            "content": self.content,
            "document_title": self.document_title,
            "section": self.section,
            "metadata": self.metadata,
            "vector_score": self.vector_score,
            "keyword_score": self.keyword_score,
            "hybrid_score": self.hybrid_score,
        }


def _row_to_chunk(row: DocumentChunk, *, vector_score: float = 0.0) -> RetrievedChunk:
    return RetrievedChunk(
        chunk_id=row.id,
        content=row.content,
        document_title=getattr(row, "document_title", "") or "",
        section=getattr(row, "section", None),
        metadata=dict(getattr(row, "metadata_json", None) or getattr(row, "meta", None) or {}),
        vector_score=vector_score,
    )


async def vector_search(
    db: AsyncSession,
    query_embedding: list[float],
    top_k: int,
) -> list[RetrievedChunk]:
    """pgvector 코사인 유사도 기반 벡터 검색.

    Args:
        db: AsyncSession
        query_embedding: 질의 임베딩 벡터
        top_k: 상위 K
    Returns:
        RetrievedChunk 리스트 (vector_score에 유사도 저장)
    """
    # pgvector는 `<=>` 연산자가 cosine distance. 유사도 = 1 - distance
    distance = DocumentChunk.embedding.cosine_distance(query_embedding)
    stmt = (
        select(DocumentChunk, distance.label("distance"))
        .order_by(distance.asc())
        .limit(top_k)
    )
    result = await db.execute(stmt)
    chunks: list[RetrievedChunk] = []
    for row, dist in result.all():
        similarity = float(1.0 - (dist or 0.0))
        chunks.append(_row_to_chunk(row, vector_score=similarity))
    return chunks


async def keyword_search(
    db: AsyncSession,
    query: str,
    top_k: int,
) -> list[RetrievedChunk]:
    """BM25 키워드 검색. (MVP: 전체 청크를 메모리로 로드)

    NOTE: 프로덕션 스케일에선 ParadeDB(pg_search) 또는 Elasticsearch로 교체할 것.

    Args:
        db: AsyncSession
        query: 원문 질의
        top_k: 상위 K
    """
    result = await db.execute(select(DocumentChunk))
    rows: list[DocumentChunk] = list(result.scalars().all())
    if not rows:
        return []

    # 간단한 공백 토크나이저 (한국어/영어 혼합 상황에서 MVP로 충분)
    def tokenize(t: str) -> list[str]:
        return [w for w in t.lower().split() if w]

    corpus = [tokenize(r.content or "") for r in rows]
    bm25 = BM25Okapi(corpus)
    scores = bm25.get_scores(tokenize(query))
    if len(scores) == 0:
        return []

    idx = np.argsort(scores)[::-1][:top_k]
    out: list[RetrievedChunk] = []
    for i in idx:
        s = float(scores[int(i)])
        if s <= 0:
            continue
        c = _row_to_chunk(rows[int(i)])
        c.keyword_score = s
        out.append(c)
    return out


async def hybrid_search(
    db: AsyncSession,
    query: str,
    top_k: int,
    query_embedding: list[float] | None = None,
) -> list[RetrievedChunk]:
    """벡터 + 키워드 결과를 Reciprocal Rank Fusion(RRF)로 결합.

    RRF: score(d) = Σ 1/(k + rank_i(d)), k=60 (Cormack et al., 2009)

    Args:
        db: AsyncSession
        query: 원문 질의
        top_k: 최종 상위 K
        query_embedding: 이미 계산된 임베딩(있으면 재사용)
    """
    from ...core.llm import embed  # 지연 import (순환 방지)

    if query_embedding is None:
        query_embedding = (await embed(query))[0]

    vec = await vector_search(db, query_embedding, top_k=top_k * 2)
    kw = await keyword_search(db, query, top_k=top_k * 2)

    k_const = 60.0
    fused: dict[int, RetrievedChunk] = {}

    for rank, c in enumerate(vec):
        fused.setdefault(c.chunk_id, c).hybrid_score += 1.0 / (k_const + rank + 1)
        fused[c.chunk_id].vector_score = max(fused[c.chunk_id].vector_score, c.vector_score)

    for rank, c in enumerate(kw):
        existing = fused.get(c.chunk_id)
        if existing is None:
            fused[c.chunk_id] = c
            existing = c
        existing.hybrid_score += 1.0 / (k_const + rank + 1)
        existing.keyword_score = max(existing.keyword_score, c.keyword_score)

    ranked = sorted(fused.values(), key=lambda x: x.hybrid_score, reverse=True)
    return ranked[:top_k]

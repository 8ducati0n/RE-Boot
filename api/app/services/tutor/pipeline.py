"""Agentic RAG Pipeline orchestrator.

RE:Boot AI Tutor의 핵심 DAG(Directed Acyclic Graph).

파이프라인 전체 흐름:

    query
      │
      ▼
   [1] query_analysis  ─ (needs_clarification?) → 조기 종료
      │
      ▼
   [2] query_transform  (hyde ∥ multi_query)  ← asyncio.gather 병렬
      │
      ▼
   [3] retrieval  (query 변형 × hybrid_search(vector+BM25) → RRF 병합)
      │
      ▼
   [4] rerank  (LLM RankGPT, top_k = settings.RAG_RERANK_TOP_K)
      │
      ▼
   [5] CRAG 평가  ─ verdict=INCORRECT → fallback 메시지 후 종료
      │
      ▼
   [6] generate  (CoT + Citation 스트리밍)  → 토큰을 delta로 흘림
      │
      ▼
   [7] grounding  +  [8] self_reflect   (sequential post-hoc 검증)
      │
      ▼
   [9] follow-ups / sources 주석  +  done

참고 논문:
- Asai et al. (2024) Self-RAG (ICLR)
- Yan et al. (2024) CRAG (arXiv:2401.15884)
- Gao et al. (2022) HyDE
- Sun et al. (2023) RankGPT
- Cormack et al. (2009) RRF
"""

from __future__ import annotations

import asyncio
import time
from dataclasses import dataclass, field
from typing import Any, AsyncGenerator, Literal

from sqlalchemy.ext.asyncio import AsyncSession

from ...config import settings
from ...core.llm import embed
from .crag import evaluate_retrieval_quality
from .followup import suggest_followups
from .generator import generate_answer
from .grounding import check_grounding
from .query_analysis import analyze_query
from .query_transform import hyde, multi_query
from .reflection import self_reflect
from .reranker import llm_rerank
from .retrieval import RetrievedChunk, hybrid_search

StreamEventType = Literal[
    "step", "delta", "sources", "followups", "warning", "error", "done"
]


@dataclass
class StreamEvent:
    type: StreamEventType
    data: dict[str, Any] = field(default_factory=dict)


# ---------- 헬퍼 ----------

def _rrf_merge(
    ranked_lists: list[list[RetrievedChunk]],
    top_k: int,
    k_const: float = 60.0,
) -> list[RetrievedChunk]:
    """여러 순위 리스트를 Reciprocal Rank Fusion으로 병합."""
    fused: dict[int, RetrievedChunk] = {}
    for lst in ranked_lists:
        for rank, c in enumerate(lst):
            existing = fused.get(c.chunk_id)
            if existing is None:
                # shallow copy via dataclass init
                existing = RetrievedChunk(
                    chunk_id=c.chunk_id,
                    content=c.content,
                    document_title=c.document_title,
                    section=c.section,
                    metadata=dict(c.metadata),
                    vector_score=c.vector_score,
                    keyword_score=c.keyword_score,
                    hybrid_score=0.0,
                )
                fused[c.chunk_id] = existing
            existing.hybrid_score += 1.0 / (k_const + rank + 1)
            existing.vector_score = max(existing.vector_score, c.vector_score)
            existing.keyword_score = max(existing.keyword_score, c.keyword_score)
    ranked = sorted(fused.values(), key=lambda x: x.hybrid_score, reverse=True)
    return ranked[:top_k]


def _step(name: str, t0: float, **extra: Any) -> StreamEvent:
    return StreamEvent(
        type="step",
        data={"stage": name, "elapsed_ms": round((time.perf_counter() - t0) * 1000, 1), **extra},
    )


# ---------- 오케스트레이터 ----------

async def run_agentic_rag(
    db: AsyncSession,
    query: str,
    chat_history: list[dict] | None = None,
) -> AsyncGenerator[StreamEvent, None]:
    """전체 Agentic RAG 파이프라인을 실행하며 StreamEvent를 생성한다.

    Args:
        db: SQLAlchemy AsyncSession
        query: 사용자 질의
        chat_history: 이전 대화 기록 [{role, content}, ...] (현재는 analysis 힌트용)
    Yields:
        StreamEvent (type: step | delta | sources | followups | warning | error | done)
    """
    t_total = time.perf_counter()
    chat_history = chat_history or []

    # ===== [1] Query Analysis =====
    t = time.perf_counter()
    yield StreamEvent(type="step", data={"stage": "query_analysis", "status": "start"})
    try:
        analysis = await analyze_query(query)
    except Exception as e:
        yield StreamEvent(type="error", data={"stage": "query_analysis", "message": str(e)})
        yield StreamEvent(type="done", data={"reason": "analysis_failed"})
        return
    yield _step(
        "query_analysis",
        t,
        intent=analysis.intent,
        ambiguity=analysis.ambiguity_score,
    )

    # 모호 질의 → 조기 반환 (clarification)
    if analysis.needs_clarification and analysis.clarification_question:
        yield StreamEvent(type="delta", data={"text": analysis.clarification_question})
        yield StreamEvent(
            type="done",
            data={
                "reason": "clarification_requested",
                "total_ms": round((time.perf_counter() - t_total) * 1000, 1),
            },
        )
        return

    # ===== [2] Query Transformation (병렬) =====
    t = time.perf_counter()
    yield StreamEvent(type="step", data={"stage": "query_transform", "status": "start"})
    try:
        hyde_doc, variants = await asyncio.gather(
            hyde(query),
            multi_query(query, n=3),
        )
    except Exception as e:
        yield StreamEvent(type="error", data={"stage": "query_transform", "message": str(e)})
        hyde_doc, variants = query, [query]

    # 검색용 질의 집합: 원문 + multi_query (임베딩 검색에는 hyde_doc 사용)
    retrieval_queries = [query] + [v for v in variants if v and v != query]
    yield _step(
        "query_transform",
        t,
        variants=len(retrieval_queries),
        hyde_len=len(hyde_doc or ""),
    )

    # ===== [3] Retrieval (각 변형마다 hybrid, 결과 RRF 병합) =====
    t = time.perf_counter()
    yield StreamEvent(type="step", data={"stage": "retrieval", "status": "start"})
    try:
        # HyDE 임베딩은 의미검색용, 키워드 부분은 원문 질의 사용
        hyde_embedding = (await embed(hyde_doc or query))[0]

        async def _search_one(q: str, is_primary: bool) -> list[RetrievedChunk]:
            emb = hyde_embedding if is_primary else None
            return await hybrid_search(
                db, q, top_k=settings.RAG_TOP_K, query_embedding=emb
            )

        tasks = [
            _search_one(q, is_primary=(i == 0))
            for i, q in enumerate(retrieval_queries)
        ]
        per_query_results = await asyncio.gather(*tasks, return_exceptions=True)
        ranked_lists: list[list[RetrievedChunk]] = [
            r for r in per_query_results if isinstance(r, list)
        ]
        merged = _rrf_merge(ranked_lists, top_k=settings.RAG_TOP_K * 2)
    except Exception as e:
        yield StreamEvent(type="error", data={"stage": "retrieval", "message": str(e)})
        merged = []
    yield _step("retrieval", t, candidates=len(merged))

    if not merged:
        fallback = "강의 자료에서 관련 근거를 찾지 못했습니다. 질문을 조금 더 구체적으로 적어주시면 다시 검색해볼게요."
        yield StreamEvent(type="delta", data={"text": fallback})
        yield StreamEvent(type="done", data={"reason": "empty_retrieval"})
        return

    # ===== [4] Rerank =====
    t = time.perf_counter()
    yield StreamEvent(type="step", data={"stage": "reranking", "status": "start"})
    try:
        top_chunks = await llm_rerank(query, merged, top_k=settings.RAG_RERANK_TOP_K)
    except Exception as e:
        yield StreamEvent(type="error", data={"stage": "reranking", "message": str(e)})
        top_chunks = merged[: settings.RAG_RERANK_TOP_K]
    yield _step("reranking", t, kept=len(top_chunks))

    # ===== [5] CRAG 평가 =====
    t = time.perf_counter()
    yield StreamEvent(type="step", data={"stage": "crag_check", "status": "start"})
    try:
        crag = await evaluate_retrieval_quality(query, top_chunks)
    except Exception as e:
        yield StreamEvent(type="error", data={"stage": "crag_check", "message": str(e)})
        from .crag import CRAGAssessment
        crag = CRAGAssessment(verdict="AMBIGUOUS", confidence=0.0, reasoning=str(e))
    yield _step("crag_check", t, verdict=crag.verdict, confidence=crag.confidence)

    if crag.verdict == "INCORRECT":
        fallback = (
            "강의 자료에서 이 질문을 해결할 충분한 근거를 찾지 못했습니다. "
            "조교에게 문의하시거나, 질문을 더 구체적으로 바꿔 다시 시도해주세요."
        )
        yield StreamEvent(type="delta", data={"text": fallback})
        yield StreamEvent(
            type="sources",
            data={"chunks": [c.to_dict() for c in top_chunks]},
        )
        yield StreamEvent(
            type="done",
            data={
                "reason": "crag_incorrect",
                "total_ms": round((time.perf_counter() - t_total) * 1000, 1),
            },
        )
        return

    # ===== [6] Generation (streaming) =====
    t = time.perf_counter()
    yield StreamEvent(type="step", data={"stage": "generation", "status": "start"})

    answer_buf: list[str] = []
    try:
        async for delta in generate_answer(query, top_chunks, analysis):
            answer_buf.append(delta)
            yield StreamEvent(type="delta", data={"text": delta})
    except Exception as e:
        yield StreamEvent(type="error", data={"stage": "generation", "message": str(e)})
    full_answer = "".join(answer_buf)
    yield _step("generation", t, length=len(full_answer))

    # ===== [7] Grounding + [8] Self-Reflection (순차) =====
    t = time.perf_counter()
    try:
        grounding = await check_grounding(full_answer, top_chunks)
    except Exception:
        from .grounding import GroundingReport
        grounding = GroundingReport(grounded=False, score=0.0)
    yield _step("grounding", t, score=grounding.score, grounded=grounding.grounded)

    t = time.perf_counter()
    try:
        reflection = await self_reflect(query, full_answer, analysis)
    except Exception:
        from .reflection import ReflectionReport
        reflection = ReflectionReport(True, 0.5, None)
    yield _step(
        "reflection",
        t,
        completeness=reflection.completeness,
        addresses=reflection.addresses_question,
    )

    # 근거 점수가 임계값 미만이면 경고 (그래도 답변은 전달)
    if grounding.score < settings.RAG_GROUNDING_THRESHOLD:
        yield StreamEvent(
            type="warning",
            data={
                "stage": "grounding",
                "message": "일부 내용이 강의 자료로 충분히 뒷받침되지 않을 수 있습니다.",
                "score": grounding.score,
                "unsupported": grounding.unsupported_claims[:5],
            },
        )

    # ===== [9] Sources + Follow-ups =====
    yield StreamEvent(
        type="sources",
        data={"chunks": [c.to_dict() for c in top_chunks]},
    )

    try:
        followups = await suggest_followups(query, full_answer, top_chunks)
    except Exception:
        followups = []
    yield StreamEvent(type="followups", data={"questions": followups})

    yield StreamEvent(
        type="done",
        data={
            "reason": "stop",
            "total_ms": round((time.perf_counter() - t_total) * 1000, 1),
            "grounding_score": grounding.score,
            "completeness": reflection.completeness,
        },
    )

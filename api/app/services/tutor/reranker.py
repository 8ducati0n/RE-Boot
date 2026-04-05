"""LLM Reranker (RankGPT-style).

참고: Sun et al. (2023) RankGPT (arXiv:2304.09542).
후보 청크를 LLM이 0~10점으로 평가하고 상위 K를 반환한다.
"""

from __future__ import annotations

import json

from ...core.llm import chat_json
from .prompts import rerank as P
from .retrieval import RetrievedChunk


async def llm_rerank(
    query: str,
    chunks: list[RetrievedChunk],
    top_k: int,
) -> list[RetrievedChunk]:
    """LLM 기반 재순위화.

    Args:
        query: 원문 질의
        chunks: 후보 청크 리스트
        top_k: 최종 상위 K
    Returns:
        rerank score 상위 top_k 청크 (score는 hybrid_score에 덮어 씀)
    """
    if not chunks:
        return []

    # 입력을 chunk_id → chunk 맵으로
    by_id = {c.chunk_id: c for c in chunks}
    payload = [{"chunk_id": c.chunk_id, "content": c.content} for c in chunks]

    try:
        raw = await chat_json(
            messages=[
                {"role": "system", "content": P.SYSTEM},
                {"role": "user", "content": P.build_prompt(query, payload)},
            ],
            tier="fast",
        )
    except Exception:
        raw = None

    scored: list[tuple[float, RetrievedChunk]] = []
    if isinstance(raw, list):
        items = raw
    elif isinstance(raw, dict) and isinstance(raw.get("results"), list):
        items = raw["results"]
    else:
        items = []

    for item in items:
        try:
            cid = int(item.get("chunk_id"))
            score = float(item.get("score", 0.0))
        except (TypeError, ValueError):
            continue
        c = by_id.get(cid)
        if c is not None:
            c.hybrid_score = score  # rerank score로 덮어쓰기 (다운스트림 정렬용)
            scored.append((score, c))

    if not scored:
        # LLM 실패 시 hybrid_score 기준으로 fallback
        return sorted(chunks, key=lambda x: x.hybrid_score, reverse=True)[:top_k]

    scored.sort(key=lambda x: x[0], reverse=True)
    return [c for _, c in scored[:top_k]]

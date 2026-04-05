"""Corrective RAG (CRAG) retrieval-quality evaluator.

참고: Yan et al. (2024) "Corrective Retrieval Augmented Generation"
(arXiv:2401.15884). 검색 품질이 나쁠 때 생성을 차단/수정한다.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Literal

from ...core.llm import chat_json
from .prompts import crag as P
from .retrieval import RetrievedChunk

Verdict = Literal["CORRECT", "AMBIGUOUS", "INCORRECT"]


@dataclass
class CRAGAssessment:
    verdict: Verdict
    confidence: float
    reasoning: str


async def evaluate_retrieval_quality(
    query: str,
    chunks: list[RetrievedChunk],
) -> CRAGAssessment:
    """CRAG 평가기: 검색 결과가 질의에 충분한지 판정.

    Args:
        query: 원문 질의
        chunks: rerank 후 상위 청크들
    Returns:
        CRAGAssessment(verdict, confidence, reasoning)
    """
    if not chunks:
        return CRAGAssessment(
            verdict="INCORRECT",
            confidence=1.0,
            reasoning="검색 결과 없음",
        )

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

    verdict = (raw or {}).get("verdict") if isinstance(raw, dict) else None
    if verdict not in ("CORRECT", "AMBIGUOUS", "INCORRECT"):
        verdict = "AMBIGUOUS"

    return CRAGAssessment(
        verdict=verdict,  # type: ignore[arg-type]
        confidence=float((raw or {}).get("confidence", 0.5) if isinstance(raw, dict) else 0.5),
        reasoning=str((raw or {}).get("reasoning", "") if isinstance(raw, dict) else ""),
    )

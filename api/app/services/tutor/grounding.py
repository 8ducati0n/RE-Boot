"""Grounding / hallucination check.

참고:
- Manakul et al. (2023) "SelfCheckGPT" (EMNLP 2023)
- Asai et al. (2024) "Self-RAG" (ICLR 2024) — ISSUP reflection token.
각 claim을 sources와 대조해 grounded 여부 점수를 산출한다.
"""

from __future__ import annotations

from dataclasses import dataclass, field

from ...core.llm import chat_json
from .prompts import grounding as P
from .retrieval import RetrievedChunk


@dataclass
class GroundingReport:
    grounded: bool
    score: float
    unsupported_claims: list[str] = field(default_factory=list)
    supported_claims: list[dict] = field(default_factory=list)


async def check_grounding(
    answer: str,
    chunks: list[RetrievedChunk],
) -> GroundingReport:
    """답변의 각 주장이 sources로 지지되는지 LLM 검증.

    Args:
        answer: 생성된 답변 (<answer> 섹션 또는 전체)
        chunks: 생성에 사용된 청크
    Returns:
        GroundingReport
    """
    if not chunks or not answer.strip():
        return GroundingReport(grounded=False, score=0.0)

    payload = [{"chunk_id": c.chunk_id, "content": c.content} for c in chunks]
    try:
        raw = await chat_json(
            messages=[
                {"role": "system", "content": P.SYSTEM},
                {"role": "user", "content": P.build_prompt(answer, payload)},
            ],
            tier="fast",
        )
    except Exception:
        raw = None

    if not isinstance(raw, dict):
        return GroundingReport(grounded=False, score=0.0)

    return GroundingReport(
        grounded=bool(raw.get("grounded", False)),
        score=float(raw.get("score", 0.0) or 0.0),
        unsupported_claims=list(raw.get("unsupported_claims") or []),
        supported_claims=list(raw.get("supported_claims") or []),
    )

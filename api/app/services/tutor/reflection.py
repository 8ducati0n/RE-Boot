"""Self-reflection stage.

참고: Asai et al. (2024) "Self-RAG" (ICLR 2024).
답변이 질문을 제대로 해결하는지, 보완이 필요한지 LLM이 자기 평가한다.
"""

from __future__ import annotations

from dataclasses import dataclass

from ...core.llm import chat_json
from .prompts import reflect as P
from .query_analysis import QueryAnalysis


@dataclass
class ReflectionReport:
    addresses_question: bool
    completeness: float
    suggested_improvement: str | None


async def self_reflect(
    query: str,
    answer: str,
    analysis: QueryAnalysis,
) -> ReflectionReport:
    """답변에 대한 자기 성찰 평가.

    Args:
        query: 원문 질의
        answer: 생성된 답변
        analysis: 질의 분석 결과 (intent 전달용)
    Returns:
        ReflectionReport
    """
    if not answer.strip():
        return ReflectionReport(False, 0.0, "답변이 비어있습니다.")

    try:
        raw = await chat_json(
            messages=[
                {"role": "system", "content": P.SYSTEM},
                {"role": "user", "content": P.build_prompt(query, answer, analysis.to_dict())},
            ],
            tier="fast",
        )
    except Exception:
        raw = None

    if not isinstance(raw, dict):
        return ReflectionReport(True, 0.5, None)

    return ReflectionReport(
        addresses_question=bool(raw.get("addresses_question", True)),
        completeness=float(raw.get("completeness", 0.5) or 0.5),
        suggested_improvement=raw.get("suggested_improvement"),
    )

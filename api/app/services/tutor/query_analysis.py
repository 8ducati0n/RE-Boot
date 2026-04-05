"""Query analysis stage.

학습자 질의를 분석해 intent/entities/ambiguity 등을 구조화한다.
LLM JSON 모드를 사용하며 실패 시 보수적 기본값으로 fallback.
"""

from __future__ import annotations

from dataclasses import dataclass, asdict
from typing import Literal

from ...core.llm import chat_json
from .prompts import query_analysis as P

Intent = Literal["factual", "conceptual", "troubleshooting", "comparative", "meta"]


@dataclass
class QueryAnalysis:
    intent: Intent
    entities: list[str]
    ambiguity_score: float
    needs_clarification: bool
    clarification_question: str | None
    language: str

    def to_dict(self) -> dict:
        return asdict(self)


async def analyze_query(query: str) -> QueryAnalysis:
    """LLM으로 질의 의도와 모호성을 분석.

    Args:
        query: 사용자 원문 질문
    Returns:
        QueryAnalysis 데이터클래스
    """
    try:
        raw = await chat_json(
            messages=[
                {"role": "system", "content": P.SYSTEM},
                {"role": "user", "content": P.build_prompt(query)},
            ],
            tier="fast",
        )
    except Exception:
        raw = {}

    intent = raw.get("intent") if raw else None
    if intent not in ("factual", "conceptual", "troubleshooting", "comparative", "meta"):
        intent = "conceptual"

    return QueryAnalysis(
        intent=intent,  # type: ignore[arg-type]
        entities=list(raw.get("entities") or []),
        ambiguity_score=float(raw.get("ambiguity_score") or 0.0),
        needs_clarification=bool(raw.get("needs_clarification") or False),
        clarification_question=raw.get("clarification_question"),
        language=str(raw.get("language") or "ko"),
    )

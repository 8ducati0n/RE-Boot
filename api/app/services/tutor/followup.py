"""Follow-up question suggestions (ZPD-inspired scaffolding)."""

from __future__ import annotations

import json

from ...core.llm import chat
from .prompts import followup as P
from .query_transform import _extract_json_array  # type: ignore
from .retrieval import RetrievedChunk


async def suggest_followups(
    query: str,
    answer: str,
    chunks: list[RetrievedChunk],
) -> list[str]:
    """학습 확장을 위한 3개의 후속 질문 생성.

    Args:
        query: 원문 질의
        answer: 생성된 답변
        chunks: 참고 청크
    Returns:
        후속 질문 3개 (실패 시 빈 리스트)
    """
    payload = [{"chunk_id": c.chunk_id, "content": c.content[:300]} for c in chunks]
    try:
        text = await chat(
            messages=[
                {"role": "system", "content": P.SYSTEM},
                {"role": "user", "content": P.build_prompt(query, answer, payload)},
            ],
            tier="fast",
        )
        parsed = json.loads(_extract_json_array(text))
        if isinstance(parsed, list):
            return [str(q) for q in parsed][:3]
    except Exception:
        pass
    return []

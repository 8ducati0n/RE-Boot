"""Query transformation stage (HyDE / Multi-Query / Decomposition).

참고 논문:
- Gao et al. (2022) HyDE (arXiv:2212.10496)
- Rackauckas (2024) RAG-Fusion
- Zhou et al. (2022) Least-to-Most Prompting (arXiv:2205.10625)
"""

from __future__ import annotations

import json

from ...core.llm import chat
from .prompts import hyde as P_HYDE
from .prompts import multi_query as P_MQ
from .prompts import decompose as P_DEC


async def hyde(query: str) -> str:
    """HyDE: 가상의 모범 답안을 생성해 임베딩 검색용 pseudo-document로 사용.

    Args:
        query: 원문 질의
    Returns:
        가상의 답안 문단 (plain text)
    """
    try:
        text = await chat(
            messages=[
                {"role": "system", "content": P_HYDE.SYSTEM},
                {"role": "user", "content": P_HYDE.build_prompt(query)},
            ],
            tier="fast",
        )
        return (text or "").strip() or query
    except Exception:
        return query


async def multi_query(query: str, n: int = 3) -> list[str]:
    """질의를 N개의 서로 다른 스타일로 재작성.

    Args:
        query: 원문 질의
        n: 재작성 개수
    Returns:
        재작성된 질의 리스트 (원문 포함하지 않음)
    """
    try:
        text = await chat(
            messages=[
                {"role": "system", "content": P_MQ.SYSTEM},
                {"role": "user", "content": P_MQ.build_prompt(query, n)},
            ],
            tier="fast",
        )
        parsed = json.loads(_extract_json_array(text))
        if isinstance(parsed, list):
            return [str(q) for q in parsed][:n]
    except Exception:
        pass
    return [query]


async def decompose(query: str) -> list[str]:
    """복합 질문을 원자적 하위 질문들로 분해.

    Args:
        query: 원문 질의
    Returns:
        하위 질문 리스트 (단순 질의면 [query])
    """
    try:
        text = await chat(
            messages=[
                {"role": "system", "content": P_DEC.SYSTEM},
                {"role": "user", "content": P_DEC.build_prompt(query)},
            ],
            tier="fast",
        )
        parsed = json.loads(_extract_json_array(text))
        if isinstance(parsed, list) and parsed:
            return [str(q) for q in parsed]
    except Exception:
        pass
    return [query]


def _extract_json_array(text: str) -> str:
    """LLM 출력에서 JSON 배열만 추출 (코드블록/머리말 제거)."""
    if not text:
        return "[]"
    s = text.strip()
    # ```json ... ``` 제거
    if s.startswith("```"):
        s = s.strip("`")
        if s.lower().startswith("json"):
            s = s[4:]
    # 첫 '['부터 마지막 ']'까지
    l = s.find("[")
    r = s.rfind("]")
    if l != -1 and r != -1 and r > l:
        return s[l : r + 1]
    return "[]"

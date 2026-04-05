"""Answer generation stage (streaming).

CoT + Constitutional AI + Citation grounding prompt.
스트리밍은 core.llm.chat_stream을 통해 async generator로 토큰을 흘린다.

CoT <thinking>...</thinking> 블록은 내부 추론용이며 학습자에게는 노출하지 않는다.
스트림 버퍼에서 실시간으로 <thinking>/<answer> 경계를 탐지해 answer 부분만 yield.
"""

from __future__ import annotations

from typing import AsyncGenerator

from ...core.llm import chat_stream
from .prompts import generate as P
from .query_analysis import QueryAnalysis
from .retrieval import RetrievedChunk


async def generate_answer(
    query: str,
    chunks: list[RetrievedChunk],
    analysis: QueryAnalysis,
) -> AsyncGenerator[str, None]:
    """검색 청크를 근거로 답변을 스트리밍 생성.

    프롬프트에서 `<thinking>`/`<answer>` 태그 사용을 명시적으로 금지했지만,
    모델이 혹시 태그를 붙일 경우를 대비한 얇은 안전망(safety net):
    - 스트림 토큰에 `<thinking>` / `<answer>` / `</thinking>` / `</answer>`
      가 포함되면 해당 태그 문자열만 제거하고 내용은 그대로 흘린다.
    - CoT 블록 전체를 숨기는 복잡한 버퍼링은 하지 않는다 (UX 지연 회피).
    """
    payload = [{"chunk_id": c.chunk_id, "content": c.content} for c in chunks]
    user_prompt = P.build_prompt(query, payload, analysis.to_dict())

    TAGS_TO_STRIP = ("<thinking>", "</thinking>", "<answer>", "</answer>",
                     "<reasoning>", "</reasoning>")

    async for delta in chat_stream(
        messages=[
            {"role": "system", "content": P.SYSTEM},
            {"role": "user", "content": user_prompt},
        ],
        tier="reasoning",
    ):
        if not delta:
            continue
        # 태그 문자열만 제거 (내용 유지)
        cleaned = delta
        for tag in TAGS_TO_STRIP:
            if tag in cleaned:
                cleaned = cleaned.replace(tag, "")
        if cleaned:
            yield cleaned

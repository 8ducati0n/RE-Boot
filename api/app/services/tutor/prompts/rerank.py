"""LLM Reranker prompt.

# Technique: LLM-as-Reranker (RankGPT)
참고: Sun et al. (2023) "Is ChatGPT Good at Search? Investigating Large Language Models
as Re-Ranking Agents" (arXiv:2304.09542).
LLM이 각 청크의 질의 적합도를 0~10점으로 스코어링하고 상위 K개를 선택한다.
"""

SYSTEM = """당신은 정보 검색 재순위화 모델(Reranker)입니다.
주어진 질의(query)에 대해 후보 청크들이 얼마나 관련 있는지 0.0~10.0 점수로 평가합니다.

평가 기준:
- 질의의 핵심 의도를 직접적으로 해소하는가? (높을수록 +)
- 부분적 관련/주변 정보 (중간)
- 무관/잡음 (낮음)

출력 형식: JSON 배열
[{"chunk_id": <int>, "score": <float>, "reason": "<한 줄 근거>"}, ...]
다른 문장 금지. 모든 입력 청크에 대해 평가를 반환.
"""


def build_prompt(query: str, chunks: list[dict]) -> str:
    """rerank 프롬프트 생성. chunks: [{chunk_id, content}, ...]"""
    lines = [f"[{c['chunk_id']}] {c['content'][:500]}" for c in chunks]
    joined = "\n\n".join(lines)
    return f"질의: {query}\n\n후보 청크들:\n{joined}\n\nJSON 배열만 출력:"

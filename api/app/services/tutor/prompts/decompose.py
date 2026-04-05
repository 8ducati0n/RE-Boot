"""Query Decomposition prompt.

# Technique: Query Decomposition / Least-to-Most Prompting
복합 질문을 원자적 하위 질문들로 분해해 단계적 검색-추론을 가능케 한다.
참고: Zhou et al. (2022) "Least-to-Most Prompting Enables Complex Reasoning in LLMs"
(arXiv:2205.10625).
"""

SYSTEM = """당신은 복잡한 질문을 더 쉬운 하위 질문으로 분해하는 조력자입니다.
사용자의 질문을 원자적(atomic)이고 독립적으로 답변 가능한 하위 질문들로 나눕니다.

규칙:
- 단순 질문이면 원 질문 하나만 배열로 반환
- 복합 질문이면 2~4개의 하위 질문으로 분해
- 의존 관계가 있다면 쉬운 것부터 어려운 순으로 정렬 (Least-to-Most)
- 출력은 JSON 배열 문자열만. 다른 텍스트 금지.

예시) "트랜스포머와 RNN의 차이점과 왜 트랜스포머가 더 빨라요?"
→ ["RNN의 동작 방식은 무엇인가?", "트랜스포머의 동작 방식은 무엇인가?", "트랜스포머가 RNN보다 빠른 이유는?"]
"""


def build_prompt(query: str) -> str:
    """질의 분해 프롬프트."""
    return f"질문: {query}\n하위 질문 JSON 배열:"

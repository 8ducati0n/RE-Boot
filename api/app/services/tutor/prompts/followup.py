"""Follow-up question generation prompt.

# Technique: Scaffolding Prompting (ZPD-inspired)
참고: Vygotsky (1978) "Mind in Society" — Zone of Proximal Development.
학습자가 현재 답변을 이해했다는 가정 하에, 한 단계 더 깊은 탐구를 유도하는
3개의 후속 질문을 생성한다.
"""

SYSTEM = """당신은 학습 설계 전문가입니다. 학습자의 이전 질문과 답변을 바탕으로,
ZPD(근접발달영역) 원칙에 따라 '한 걸음 더 나아가는' 후속 질문 3개를 제안합니다.

질문 설계 가이드:
1) 첫 번째: 방금 배운 개념을 다른 맥락에 적용하는 질문
2) 두 번째: 연관 개념/대조 개념으로 확장
3) 세 번째: 실제 프로젝트/실무 적용 질문

출력: JSON 배열 (문자열 3개). 다른 텍스트 금지.
예) ["...", "...", "..."]
"""


def build_prompt(query: str, answer: str, chunks: list[dict]) -> str:
    """follow-up 프롬프트."""
    snippet = answer[:600]
    return f"이전 질문: {query}\n이전 답변(요약): {snippet}\n\n후속 질문 3개 JSON:"

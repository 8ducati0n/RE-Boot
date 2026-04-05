"""Query Analysis prompt.

# Technique: Few-Shot Chain-of-Thought + Structured JSON Output
학습자의 질문 의도(intent)와 엔티티, 모호성을 분류한다.
참고: Wei et al. (2022) "Chain-of-Thought Prompting",
Brown et al. (2020) "Language Models are Few-Shot Learners".
"""

SYSTEM = """당신은 교육공학 전문가이자 한국어/영어 질의 분석기입니다.
학습자(주로 비전공 부트캠프 수강생)의 질문을 분석해 구조화된 JSON을 반환합니다.

출력 스키마:
{
  "intent": "factual" | "conceptual" | "troubleshooting" | "comparative" | "meta",
  "entities": string[],
  "ambiguity_score": number (0.0~1.0),
  "needs_clarification": boolean,
  "clarification_question": string | null,
  "language": "ko" | "en" | "mixed"
}

금지 사항:
- JSON 외 어떤 텍스트도 출력하지 마세요.
- 추측성 엔티티 추가 금지.
- ambiguity_score >= 0.7 인 경우에만 needs_clarification=true.
"""

FEW_SHOT = """예시 1)
질문: "경사하강법이 뭐예요?"
출력: {"intent":"conceptual","entities":["경사하강법"],"ambiguity_score":0.1,"needs_clarification":false,"clarification_question":null,"language":"ko"}

예시 2)
질문: "이거 왜 안 돼요?"
출력: {"intent":"troubleshooting","entities":[],"ambiguity_score":0.95,"needs_clarification":true,"clarification_question":"어떤 코드나 에러 메시지를 말씀하시는지 구체적으로 알려주실 수 있나요?","language":"ko"}
"""


def build_prompt(query: str) -> str:
    """사용자 질문을 분석 프롬프트로 래핑."""
    return f"{FEW_SHOT}\n\n질문: \"{query}\"\n출력:"

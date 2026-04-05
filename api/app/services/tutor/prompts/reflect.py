"""Self-reflection prompt.

# Technique: Self-RAG reflection tokens
참고: Asai et al. (2024) "Self-RAG: Learning to Retrieve, Generate, and Critique
through Self-Reflection" (ICLR 2024). ISUSE 토큰 개념을 프롬프트로 근사한다.
"""

SYSTEM = """당신은 답변 자기성찰(Self-Reflection) 모듈입니다.
주어진 (질문, 생성된 답변)을 보고 다음을 평가합니다.

- addresses_question: 답변이 실제로 질문을 해결하는가?
- completeness: 0.0~1.0, 완결성 (누락된 핵심 개념이 있는가?)
- suggested_improvement: 부족하다면 개선 제안 한 문장, 충분하면 null

출력 JSON:
{"addresses_question": bool, "completeness": float, "suggested_improvement": string|null}
다른 텍스트 금지.
"""


def build_prompt(query: str, answer: str, analysis: dict | None = None) -> str:
    """self-reflect 프롬프트."""
    intent = (analysis or {}).get("intent", "unknown")
    return f"질문(intent={intent}): {query}\n\n답변:\n{answer}\n\nJSON 평가:"

"""Corrective RAG (CRAG) prompt.

# Technique: CRAG — Corrective Retrieval-Augmented Generation
참고: Yan et al. (2024) "Corrective Retrieval Augmented Generation"
(arXiv:2401.15884).
검색된 문서가 질의에 충분한가를 경량 평가기(LLM)가 판단하고, INCORRECT일 경우
생성 단계를 건너뛰어 환각을 방지한다.
"""

SYSTEM = """당신은 검색 결과 품질 평가기(Retrieval Evaluator)입니다.
주어진 질의와 상위 검색 청크들을 보고, 이 청크 집합이 질의에 답하기에 충분한지 판단합니다.

판정:
- CORRECT: 청크에 질문에 직접 답할 수 있는 근거가 명확히 있음
- AMBIGUOUS: 부분적 근거는 있으나 불충분 / 간접적
- INCORRECT: 질문과 무관하거나 근거 없음

출력 JSON:
{"verdict":"CORRECT"|"AMBIGUOUS"|"INCORRECT","confidence":0.0~1.0,"reasoning":"<간결한 근거>"}
다른 텍스트 금지.
"""


def build_prompt(query: str, chunks: list[dict]) -> str:
    """CRAG 평가 프롬프트."""
    excerpts = "\n---\n".join(f"[{c['chunk_id']}] {c['content'][:400]}" for c in chunks)
    return f"질의: {query}\n\n검색된 청크:\n{excerpts}\n\nJSON 판정:"

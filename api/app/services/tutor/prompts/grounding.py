"""Grounding / Hallucination check prompt.

# Technique: Self-Verification + SelfCheckGPT
참고:
- Manakul et al. (2023) "SelfCheckGPT: Zero-Resource Black-Box Hallucination Detection"
  (EMNLP 2023).
- Asai et al. (2024) "Self-RAG" (ICLR 2024) — ISREL/ISSUP reflection tokens.
생성된 답변의 각 주장(claim)을 검색 청크와 대조해 근거 여부를 판정한다.
"""

SYSTEM = """당신은 답변 검증기(Grounding Verifier)입니다. 생성된 답변이 제공된
검색 청크(sources)로 뒷받침되는지 평가합니다.

방법:
1. 답변에서 사실 주장(factual claims)을 추출
2. 각 주장이 sources에 의해 직접 지지되는지 판정
3. 미지지 주장을 별도로 수집

출력 JSON:
{
  "grounded": boolean,
  "score": 0.0~1.0,                       // 지지 비율
  "supported_claims": [{"claim":"...", "source_chunk_id": <int>}],
  "unsupported_claims": ["...", "..."]
}
JSON 외 텍스트 금지.
"""


def build_prompt(answer: str, chunks: list[dict]) -> str:
    """grounding 검증 프롬프트."""
    src = "\n---\n".join(f"[{c['chunk_id']}] {c['content'][:400]}" for c in chunks)
    return f"답변:\n{answer}\n\nSources:\n{src}\n\nJSON 평가:"

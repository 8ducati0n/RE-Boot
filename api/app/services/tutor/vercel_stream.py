"""Vercel AI SDK Data Stream Protocol (v1) encoder.

참고: https://sdk.vercel.ai/docs/ai-sdk-ui/stream-protocol#data-stream-protocol

각 이벤트는 한 줄:
    <type_char>:<json>\n

type_char:
- '0' : text delta  (JSON string)
- '2' : data        (JSON array of objects — custom data)
- '3' : error       (JSON string)
- '8' : message annotations (JSON array — e.g. sources, followups)
- 'd' : done        (JSON object: { finishReason, usage })

Response headers (클라이언트 파서가 인식):
    x-vercel-ai-data-stream: v1
    content-type: text/plain; charset=utf-8
"""

from __future__ import annotations

import json
from typing import Any


class VercelStreamEncoder:
    """Vercel AI SDK v3 Data Stream Protocol 라인 인코더.

    모든 메서드는 '한 줄' 프로토콜 문자열(끝에 \\n 포함)을 반환한다.
    """

    @staticmethod
    def _dumps(obj: Any) -> str:
        return json.dumps(obj, ensure_ascii=False, separators=(",", ":"))

    def text_delta(self, text: str) -> str:
        """0:<json-string>\\n 형식으로 텍스트 토큰 전송."""
        return f"0:{self._dumps(text)}\n"

    def data(self, payload: list[dict]) -> str:
        """2:<json-array>\\n — 커스텀 데이터(파이프라인 step 이벤트 등)."""
        return f"2:{self._dumps(payload)}\n"

    def message_annotation(self, annotations: list[dict]) -> str:
        """8:<json-array>\\n — 메시지 단위 주석(sources, followups 등)."""
        return f"8:{self._dumps(annotations)}\n"

    def error(self, msg: str) -> str:
        """3:<json-string>\\n — 에러."""
        return f"3:{self._dumps(msg)}\n"

    def done(
        self,
        finish_reason: str = "stop",
        usage: dict | None = None,
    ) -> str:
        """d:<json>\\n — 종료 이벤트."""
        body = {
            "finishReason": finish_reason,
            "usage": usage or {"promptTokens": 0, "completionTokens": 0},
        }
        return f"d:{self._dumps(body)}\n"


# 공통 헤더 상수 (라우터에서 사용)
VERCEL_STREAM_HEADERS = {
    "x-vercel-ai-data-stream": "v1",
    "content-type": "text/plain; charset=utf-8",
    "cache-control": "no-cache, no-transform",
    "connection": "keep-alive",
    "x-accel-buffering": "no",
}

"""Async LLM wrapper with pluggable providers.

Supports two backends, selected by ``settings.LLM_PROVIDER``:

- ``gemini`` (default for RE:Boot demo) — Google Gemini 2.5 family via
  ``google-genai`` SDK. Uses a tiered model strategy:

    * fast       : ``gemini-2.5-flash-lite``
    * chat       : ``gemini-2.5-flash``
    * reasoning  : ``gemini-2.5-pro`` (only for the final tutor answer)

  Embeddings use ``text-embedding-004`` (768-dim).

- ``openai`` — original OpenAI implementation (kept for fallback).

All functions expose a uniform shape regardless of provider:

    chat(messages, *, tier='chat', temperature=0.3)            -> str
    chat_json(messages, *, tier='chat', temperature=0.2)       -> dict
    chat_stream(messages, *, tier='reasoning', temperature=0.3)-> AsyncGen[str]
    embed(texts)                                                -> list[list[float]]

The rest of the Agentic RAG pipeline (``app/services/tutor/*``) talks to
these functions only, so swapping providers requires no pipeline changes.
"""

from __future__ import annotations

import asyncio
import json
import re
from collections.abc import AsyncGenerator
from typing import Any, Literal

from ..config import settings

Tier = Literal["fast", "chat", "reasoning"]


# ────────────────────────────────────────────────────────────────────────────
# Model resolution
# ────────────────────────────────────────────────────────────────────────────

def _resolve_model(tier: Tier, override: str | None) -> str:
    if override:
        return override
    if tier == "fast":
        return getattr(settings, "LLM_MODEL_FAST", None) or settings.LLM_CHAT_MODEL
    if tier == "reasoning":
        return settings.LLM_REASONING_MODEL
    return settings.LLM_CHAT_MODEL


# ────────────────────────────────────────────────────────────────────────────
# Gemini backend
# ────────────────────────────────────────────────────────────────────────────

_gemini_client = None


def _get_gemini():
    """Lazy import + singleton for the google-genai client."""
    global _gemini_client
    if _gemini_client is None:
        try:
            from google import genai  # type: ignore
        except ImportError as e:
            raise RuntimeError(
                "google-genai not installed. Run `pip install google-genai`."
            ) from e
        if not settings.GEMINI_API_KEY:
            raise RuntimeError("GEMINI_API_KEY is not set in environment.")
        _gemini_client = genai.Client(api_key=settings.GEMINI_API_KEY)
    return _gemini_client


def _messages_to_gemini(messages: list[dict[str, Any]]) -> tuple[str, list[dict]]:
    """Convert OpenAI-shaped messages → (system_instruction, contents[]).

    Gemini uses a system_instruction parameter separate from contents, and
    the role names are 'user' and 'model' (not 'assistant').
    """
    system_parts: list[str] = []
    contents: list[dict] = []
    for msg in messages:
        role = msg.get("role", "user")
        content = msg.get("content", "")
        if not content:
            continue
        if role == "system":
            system_parts.append(str(content))
            continue
        mapped_role = "model" if role == "assistant" else "user"
        contents.append({"role": mapped_role, "parts": [{"text": str(content)}]})
    system_instruction = "\n\n".join(system_parts) if system_parts else None
    return system_instruction, contents


async def _gemini_chat(
    messages: list[dict[str, Any]],
    *,
    model: str,
    temperature: float,
    json_mode: bool = False,
) -> str:
    client = _get_gemini()
    system_instruction, contents = _messages_to_gemini(messages)

    cfg: dict[str, Any] = {"temperature": temperature}
    if json_mode:
        cfg["response_mime_type"] = "application/json"
    if system_instruction:
        cfg["system_instruction"] = system_instruction

    # google-genai is sync-only in current releases → run in thread executor
    def _call():
        return client.models.generate_content(
            model=model,
            contents=contents,
            config=cfg,
        )

    resp = await asyncio.to_thread(_call)
    return (getattr(resp, "text", None) or "").strip()


async def _gemini_chat_stream(
    messages: list[dict[str, Any]],
    *,
    model: str,
    temperature: float,
) -> AsyncGenerator[str, None]:
    client = _get_gemini()
    system_instruction, contents = _messages_to_gemini(messages)

    cfg: dict[str, Any] = {"temperature": temperature}
    if system_instruction:
        cfg["system_instruction"] = system_instruction

    loop = asyncio.get_event_loop()
    queue: asyncio.Queue = asyncio.Queue()
    SENTINEL = object()

    def _producer():
        try:
            for chunk in client.models.generate_content_stream(
                model=model, contents=contents, config=cfg
            ):
                text = getattr(chunk, "text", None)
                if text:
                    loop.call_soon_threadsafe(queue.put_nowait, text)
        except Exception as e:  # pragma: no cover
            loop.call_soon_threadsafe(queue.put_nowait, f"[stream error: {e}]")
        finally:
            loop.call_soon_threadsafe(queue.put_nowait, SENTINEL)

    loop.run_in_executor(None, _producer)

    while True:
        item = await queue.get()
        if item is SENTINEL:
            break
        yield item  # type: ignore[misc]


async def _gemini_embed(texts: list[str], model: str) -> list[list[float]]:
    """Embed via Gemini. gemini-embedding-001 returns 3072d by default;
    we truncate to settings.LLM_EMBEDDING_DIM (768) via Matryoshka output_dimensionality."""
    if not texts:
        return []
    client = _get_gemini()

    # google-genai SDK uses EmbedContentConfig for dimension control.
    try:
        from google.genai import types as genai_types  # type: ignore
        config = genai_types.EmbedContentConfig(
            output_dimensionality=settings.LLM_EMBEDDING_DIM,
        )
    except Exception:
        config = None

    def _call():
        kwargs: dict[str, Any] = {"model": model, "contents": texts}
        if config is not None:
            kwargs["config"] = config
        return client.models.embed_content(**kwargs)

    resp = await asyncio.to_thread(_call)
    out: list[list[float]] = []
    embeddings = getattr(resp, "embeddings", None) or getattr(resp, "embedding", None)
    if embeddings is None:
        return []
    if not isinstance(embeddings, list):
        embeddings = [embeddings]
    for item in embeddings:
        values = getattr(item, "values", None) or getattr(item, "embedding", None) or item
        out.append(list(values))
    return out


# ────────────────────────────────────────────────────────────────────────────
# OpenAI backend (fallback)
# ────────────────────────────────────────────────────────────────────────────

_openai_client = None


def _get_openai():
    global _openai_client
    if _openai_client is None:
        from openai import AsyncOpenAI  # type: ignore
        _openai_client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    return _openai_client


async def _openai_chat(
    messages: list[dict[str, Any]],
    *,
    model: str,
    temperature: float,
    json_mode: bool = False,
) -> str:
    client = _get_openai()
    kwargs: dict[str, Any] = {"model": model, "messages": messages, "temperature": temperature}
    if json_mode:
        kwargs["response_format"] = {"type": "json_object"}
    resp = await client.chat.completions.create(**kwargs)
    return resp.choices[0].message.content or ""


async def _openai_chat_stream(
    messages: list[dict[str, Any]],
    *,
    model: str,
    temperature: float,
) -> AsyncGenerator[str, None]:
    client = _get_openai()
    stream = await client.chat.completions.create(
        model=model, messages=messages, temperature=temperature, stream=True
    )
    async for chunk in stream:
        try:
            delta = chunk.choices[0].delta.content
        except (IndexError, AttributeError):
            delta = None
        if delta:
            yield delta


async def _openai_embed(texts: list[str], model: str) -> list[list[float]]:
    if not texts:
        return []
    client = _get_openai()
    resp = await client.embeddings.create(model=model, input=texts)
    return [row.embedding for row in resp.data]


# ────────────────────────────────────────────────────────────────────────────
# Public unified API
# ────────────────────────────────────────────────────────────────────────────

def _provider() -> str:
    return (getattr(settings, "LLM_PROVIDER", "openai") or "openai").lower()


def _effective_provider(tier: Tier) -> str:
    """Return the provider to use for *tier*, respecting hybrid mode.

    When ``settings.LLM_HYBRID`` is True **and** the tier is ``"reasoning"``
    **and** an OpenAI API key is configured, force the OpenAI backend so
    that GPT-4o handles the heavy-lifting while Gemini handles fast/chat.
    Otherwise fall back to the single-provider setting.
    """
    if (
        getattr(settings, "LLM_HYBRID", False)
        and tier == "reasoning"
        and settings.OPENAI_API_KEY
    ):
        return "openai"
    return _provider()


# OpenAI model to use when hybrid mode overrides the reasoning tier.
_HYBRID_REASONING_MODEL = "gpt-4o"


def _resolve_hybrid_model(tier: Tier, override: str | None, effective: str) -> str:
    """Like ``_resolve_model`` but accounts for hybrid provider switches.

    When the effective provider differs from the configured default (i.e.
    hybrid mode kicked in), use the hard-coded OpenAI reasoning model
    instead of the Gemini model name stored in settings.
    """
    if override:
        return override
    if effective != _provider() and tier == "reasoning":
        return _HYBRID_REASONING_MODEL
    return _resolve_model(tier, override)


async def chat(
    messages: list[dict[str, Any]],
    *,
    tier: Tier = "chat",
    model: str | None = None,
    temperature: float = 0.3,
    **_ignored: Any,
) -> str:
    """Plain chat completion. Returns the assistant's text."""
    effective = _effective_provider(tier)
    resolved = _resolve_hybrid_model(tier, model, effective)
    if effective == "gemini":
        return await _gemini_chat(messages, model=resolved, temperature=temperature)
    return await _openai_chat(messages, model=resolved, temperature=temperature)


_JSON_CODEBLOCK = re.compile(r"```(?:json)?\s*(\{.*?\}|\[.*?\])\s*```", re.DOTALL)


def _extract_json(raw: str) -> Any:
    """Tolerant JSON parser for LLM outputs (handles code fences, extra text)."""
    raw = raw.strip()
    if not raw:
        return {}
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        pass
    m = _JSON_CODEBLOCK.search(raw)
    if m:
        try:
            return json.loads(m.group(1))
        except json.JSONDecodeError:
            pass
    # Last resort: find first { ... } or [ ... ]
    for opener, closer in (("{", "}"), ("[", "]")):
        start = raw.find(opener)
        end = raw.rfind(closer)
        if start != -1 and end != -1 and end > start:
            try:
                return json.loads(raw[start : end + 1])
            except json.JSONDecodeError:
                continue
    return {"_raw": raw[:500], "_error": "invalid_json"}


async def chat_json(
    messages: list[dict[str, Any]],
    *,
    tier: Tier = "chat",
    model: str | None = None,
    schema: dict[str, Any] | None = None,
    temperature: float = 0.2,
    **_ignored: Any,
) -> Any:
    """Force a JSON response and parse it. Returns dict or list."""
    if schema is not None:
        hint = {
            "role": "system",
            "content": "Respond ONLY with valid JSON matching this schema: "
            + json.dumps(schema, ensure_ascii=False),
        }
        messages = [hint, *messages]
    effective = _effective_provider(tier)
    resolved = _resolve_hybrid_model(tier, model, effective)
    if effective == "gemini":
        raw = await _gemini_chat(
            messages, model=resolved, temperature=temperature, json_mode=True
        )
    else:
        raw = await _openai_chat(
            messages, model=resolved, temperature=temperature, json_mode=True
        )
    return _extract_json(raw)


async def chat_stream(
    messages: list[dict[str, Any]],
    *,
    tier: Tier = "reasoning",
    model: str | None = None,
    temperature: float = 0.3,
    **_ignored: Any,
) -> AsyncGenerator[str, None]:
    """Stream token-level text from the model (for the final tutor answer)."""
    effective = _effective_provider(tier)
    resolved = _resolve_hybrid_model(tier, model, effective)
    if effective == "gemini":
        async for chunk in _gemini_chat_stream(
            messages, model=resolved, temperature=temperature
        ):
            yield chunk
    else:
        async for chunk in _openai_chat_stream(
            messages, model=resolved, temperature=temperature
        ):
            yield chunk


async def embed(texts: list[str] | str, model: str | None = None) -> list[list[float]]:
    """Embed one or many texts. Always returns list[list[float]]."""
    if isinstance(texts, str):
        texts = [texts]
    if not texts:
        return []
    resolved = model or settings.LLM_EMBEDDING_MODEL
    if _provider() == "gemini":
        return await _gemini_embed(texts, resolved)
    return await _openai_embed(texts, resolved)

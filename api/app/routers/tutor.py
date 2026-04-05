"""Tutor router — Agentic RAG AI 튜터 엔드포인트.

주요 엔드포인트:
- POST /api/tutor/chat     : Vercel AI SDK Data Stream Protocol (v1) 스트리밍 응답
- POST /api/tutor/ingest   : 교수자 전용 — 자료 ingestion (chunk + embed + store)
- GET  /api/tutor/sessions : 사용자의 채팅 세션 목록
- GET  /api/tutor/sessions/{id}/messages : 세션 메시지 조회

참고:
- Vercel AI SDK Data Stream Protocol v1
  https://sdk.vercel.ai/docs/ai-sdk-ui/stream-protocol#data-stream-protocol
"""

from __future__ import annotations

from typing import AsyncGenerator

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..core.llm import embed
from ..database import get_db
from ..deps import get_current_user
from ..models import User, UserRole
from ..models.tutor import ChatMessage, ChatSession, DocumentChunk
from ..services.tutor.pipeline import run_agentic_rag
from ..services.tutor.vercel_stream import VERCEL_STREAM_HEADERS, VercelStreamEncoder

router = APIRouter()


# ---------- Schemas ----------

class ChatMessageIn(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessageIn] = Field(..., min_length=1)
    session_id: int | None = None


class IngestRequest(BaseModel):
    title: str
    content: str
    section: str | None = None


class IngestResponse(BaseModel):
    title: str
    chunks_created: int


class ChatSessionOut(BaseModel):
    id: int
    title: str | None = None
    created_at: str | None = None


class ChatMessageOut(BaseModel):
    id: int
    role: str
    content: str
    created_at: str | None = None


# ---------- Chunking helper ----------

def _chunk_text(text: str, chunk_tokens: int = 500, overlap: int = 50) -> list[str]:
    """대략적 토큰 단위 청킹. (MVP — 공백 분리 기반, 1 token ≈ 1 word 근사)

    프로덕션에선 tiktoken 사용을 권장한다.
    """
    words = text.split()
    if not words:
        return []
    chunks: list[str] = []
    step = max(1, chunk_tokens - overlap)
    for start in range(0, len(words), step):
        piece = words[start : start + chunk_tokens]
        if not piece:
            break
        chunks.append(" ".join(piece))
        if start + chunk_tokens >= len(words):
            break
    return chunks


# ---------- POST /chat ----------

@router.post("/chat")
async def chat(
    payload: ChatRequest,
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
) -> StreamingResponse:
    """Agentic RAG 파이프라인을 Vercel AI SDK Data Stream Protocol로 스트리밍.

    클라이언트(Next.js + `useChat`)는 `x-vercel-ai-data-stream: v1` 헤더를
    감지하여 자동 파싱한다.

    스트리밍 완료 후 user/assistant 메시지를 ChatSession/ChatMessage에 저장한다.
    """
    if not payload.messages:
        raise HTTPException(400, "messages is empty")

    # 마지막 user 메시지를 질의로 사용
    user_msgs = [m for m in payload.messages if m.role == "user"]
    if not user_msgs:
        raise HTTPException(400, "no user message found")
    query = user_msgs[-1].content
    history = [m.model_dump() for m in payload.messages[:-1]]

    # ── 세션 확보 (기존 session_id 가 있으면 재사용, 없으면 신규 생성) ──
    session: ChatSession | None = None
    if payload.session_id:
        session = await db.get(ChatSession, payload.session_id)
        if session is None or session.student_id != current.id:
            raise HTTPException(404, "session not found")
    if session is None:
        session = ChatSession(
            student_id=current.id,
            title=query[:100],  # 첫 질문으로 세션 제목 지정
        )
        db.add(session)
        await db.flush()  # id 확보

    # ── user 메시지 저장 ──
    user_msg = ChatMessage(
        session_id=session.id,
        role="user",
        content=query,
    )
    db.add(user_msg)
    await db.flush()

    encoder = VercelStreamEncoder()

    # 스트리밍 중 assistant 응답과 sources 를 수집할 버퍼
    collected_text: list[str] = []
    collected_sources: list[dict] = []

    async def stream() -> AsyncGenerator[bytes, None]:
        # 클라이언트에 session_id 를 알려줘서 후속 메시지에서 재사용 가능하도록
        yield encoder.data(
            [{"type": "session", "data": {"session_id": session.id}}]
        ).encode("utf-8")
        try:
            async for event in run_agentic_rag(db, query, history):
                if event.type == "delta":
                    text = event.data.get("text", "")
                    collected_text.append(text)
                    yield encoder.text_delta(text).encode("utf-8")
                elif event.type == "step":
                    yield encoder.data(
                        [{"type": "step", "data": event.data}]
                    ).encode("utf-8")
                elif event.type == "warning":
                    yield encoder.data(
                        [{"type": "warning", "data": event.data}]
                    ).encode("utf-8")
                elif event.type == "sources":
                    collected_sources.extend(
                        event.data if isinstance(event.data, list) else [event.data]
                    )
                    yield encoder.message_annotation(
                        [{"type": "sources", "data": event.data}]
                    ).encode("utf-8")
                elif event.type == "followups":
                    yield encoder.message_annotation(
                        [{"type": "followups", "data": event.data}]
                    ).encode("utf-8")
                elif event.type == "error":
                    yield encoder.error(str(event.data.get("message", "error"))).encode(
                        "utf-8"
                    )
                elif event.type == "done":
                    yield encoder.done("stop").encode("utf-8")
                    # ── assistant 메시지 저장 ──
                    assistant_msg = ChatMessage(
                        session_id=session.id,
                        role="assistant",
                        content="".join(collected_text),
                        sources=collected_sources or None,
                    )
                    db.add(assistant_msg)
                    await db.commit()
                    return
        except Exception as e:  # pragma: no cover - 안전망
            yield encoder.error(f"pipeline_exception: {e}").encode("utf-8")
            yield encoder.done("error").encode("utf-8")

    return StreamingResponse(
        stream(),
        media_type="text/plain; charset=utf-8",
        headers=VERCEL_STREAM_HEADERS,
    )


# ---------- POST /ingest ----------

@router.post("/ingest", response_model=IngestResponse)
async def ingest(
    payload: IngestRequest,
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
) -> IngestResponse:
    """교수자 전용 — 강의 자료를 청킹·임베딩해 DocumentChunk에 저장.

    Args:
        payload: {title, content, section?}
    Returns:
        생성된 청크 수
    """
    if current.role not in (UserRole.INSTRUCTOR, UserRole.MANAGER):
        raise HTTPException(403, "instructor role required")

    pieces = _chunk_text(payload.content, chunk_tokens=500, overlap=50)
    if not pieces:
        raise HTTPException(400, "empty content after chunking")

    created = 0
    for idx, piece in enumerate(pieces):
        vec = (await embed(piece))[0]
        chunk = DocumentChunk(
            document_title=payload.title,
            section=payload.section,
            content=piece,
            embedding=vec,
            meta={"chunk_index": idx},
        )
        db.add(chunk)
        created += 1

    await db.commit()
    return IngestResponse(title=payload.title, chunks_created=created)


# ---------- GET /sessions ----------

@router.get("/sessions", response_model=list[ChatSessionOut])
async def list_sessions(
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
) -> list[ChatSessionOut]:
    """현재 사용자의 채팅 세션 목록."""
    stmt = (
        select(ChatSession)
        .where(ChatSession.student_id == current.id)
        .order_by(ChatSession.created_at.desc())
    )
    rows = (await db.execute(stmt)).scalars().all()
    return [
        ChatSessionOut(
            id=r.id,
            title=getattr(r, "title", None),
            created_at=str(getattr(r, "created_at", "") or ""),
        )
        for r in rows
    ]


# ---------- GET /sessions/{id}/messages ----------

@router.get("/sessions/{session_id}/messages", response_model=list[ChatMessageOut])
async def get_session_messages(
    session_id: int,
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
) -> list[ChatMessageOut]:
    """특정 세션의 메시지 목록 (소유자 검증 포함)."""
    session = await db.get(ChatSession, session_id)
    if session is None or session.student_id != current.id:
        raise HTTPException(404, "session not found")

    stmt = (
        select(ChatMessage)
        .where(ChatMessage.session_id == session_id)
        .order_by(ChatMessage.created_at.asc())
    )
    rows = (await db.execute(stmt)).scalars().all()
    return [
        ChatMessageOut(
            id=r.id,
            role=r.role,
            content=r.content,
            created_at=str(getattr(r, "created_at", "") or ""),
        )
        for r in rows
    ]

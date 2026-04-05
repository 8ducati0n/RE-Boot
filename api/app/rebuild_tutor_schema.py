"""One-shot: drop + recreate tables whose schema depends on EMBEDDING_DIM.

Run when switching embedding provider (dimension change).
    docker compose exec -T api python -m app.rebuild_tutor_schema
"""

from __future__ import annotations

import asyncio

from sqlalchemy import text

from .database import engine
from .models.tutor import ChatMessage, ChatSession, DocumentChunk  # noqa: F401


async def run() -> None:
    print("[rebuild] DROP document_chunks / chat_messages / chat_sessions (CASCADE) ...")
    async with engine.begin() as conn:
        await conn.execute(text("DROP TABLE IF EXISTS chat_messages CASCADE"))
        await conn.execute(text("DROP TABLE IF EXISTS chat_sessions CASCADE"))
        await conn.execute(text("DROP TABLE IF EXISTS document_chunks CASCADE"))
        print("[rebuild] dropped.")
        # Recreate from metadata
        from .database import Base
        # ensure all tutor models registered
        await conn.run_sync(Base.metadata.create_all)
        print("[rebuild] recreated via metadata.create_all (tutor tables only added back, others preserved).")
    await engine.dispose()
    print("[rebuild] done.")


if __name__ == "__main__":
    asyncio.run(run())

"""One-shot DB bootstrap for MVP demo.

Usage (inside the api container or with PYTHONPATH set):
    python -m app.bootstrap_db

Actions (idempotent):
- CREATE EXTENSION IF NOT EXISTS vector
- Base.metadata.create_all()  (all tables from app.models)
- Upsert 3 demo users (student / instructor / manager)

Alembic 마이그레이션이 정비되기 전까지만 사용한다.
"""

from __future__ import annotations

import asyncio

from sqlalchemy import text

from .database import Base, engine
from .initial_data import create_demo_users  # type: ignore
# Import all model modules so Base.metadata knows about every table
from . import models  # noqa: F401


async def bootstrap() -> None:
    print("[bootstrap] CREATE EXTENSION vector ...")
    async with engine.begin() as conn:
        await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
        print("[bootstrap] Base.metadata.create_all ...")
        await conn.run_sync(Base.metadata.create_all)

    print("[bootstrap] creating demo users ...")
    try:
        await create_demo_users()
        print("[bootstrap] demo users ready")
    except Exception as e:
        print(f"[bootstrap] demo users skipped: {type(e).__name__}: {e}")

    await engine.dispose()
    print("[bootstrap] done.")


if __name__ == "__main__":
    asyncio.run(bootstrap())

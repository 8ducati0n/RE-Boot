"""FastAPI application entry point."""

import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .routers import adapt, analytics, auth, diagnose, mastery, tutor


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifecycle hooks.

    Cloud Run 과 같은 stateless 환경에서는 `docker compose exec` 로 수동
    부트스트랩을 실행할 수 없다. AUTO_BOOTSTRAP=true 가 설정되어 있으면
    첫 부팅 시 자동으로 (1) pgvector 확장 활성화 (2) 테이블 생성 (3) 데모
    사용자 upsert (4) 시드 데이터 로드 를 수행한다.

    모두 idempotent 하므로 여러 번 호출해도 안전하다. 로컬 docker-compose
    에서는 기본값 false → 기존처럼 app.bootstrap_db / app.seed_demo 를
    수동 실행.
    """
    if os.environ.get("AUTO_BOOTSTRAP", "false").lower() in ("true", "1", "yes"):
        print("[lifespan] AUTO_BOOTSTRAP=true — running bootstrap + seed")
        try:
            from sqlalchemy import text

            from .database import Base, engine
            from .initial_data import create_demo_users
            from . import models  # noqa: F401 — register all models

            async with engine.begin() as conn:
                await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
                await conn.run_sync(Base.metadata.create_all)
            print("[lifespan]   tables ensured + pgvector ready")

            try:
                await create_demo_users()
                print("[lifespan]   demo users upserted")
            except Exception as e:
                print(f"[lifespan]   demo users skipped: {type(e).__name__}: {e}")

            # seed_demo 는 idempotent (delete + reinsert). 플래그로 첫 배포만 실행.
            if os.environ.get("AUTO_SEED_DEMO", "true").lower() in ("true", "1", "yes"):
                try:
                    from .seed_demo import seed

                    await seed()
                    print("[lifespan]   demo scenario data seeded")
                except Exception as e:
                    print(f"[lifespan]   seed_demo failed: {type(e).__name__}: {e}")
        except Exception as e:
            print(f"[lifespan] ❌ AUTO_BOOTSTRAP error: {type(e).__name__}: {e}")

    yield
    # Shutdown hooks (nothing to do for stateless API)


app = FastAPI(
    title="RE:Boot API",
    description="Human-in-the-Loop 적응형 학습 플랫폼 — 미디어전 출품작 백엔드",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers — one per domain module (이론 ↔ 구현 1:1 매핑)
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(diagnose.router, prefix="/api/diagnose", tags=["1-diagnose (ZPD)"])
app.include_router(adapt.router, prefix="/api/adapt", tags=["2-adapt (AI-TPACK HITL)"])
app.include_router(mastery.router, prefix="/api/mastery", tags=["3-mastery (Bloom+Ebbinghaus)"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["+a-analytics (LA+EWS)"])
app.include_router(tutor.router, prefix="/api/tutor", tags=["tutor (Agentic RAG)"])


@app.get("/health", tags=["meta"])
async def health() -> dict:
    return {"status": "ok", "service": "eduation-media-api", "version": "0.1.0"}

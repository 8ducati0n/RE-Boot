"""Application settings loaded from environment variables."""

from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://reboot:reboot@localhost:5432/eduation_media"

    # Auth
    JWT_SECRET: str = "change-me-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    ALLOWED_ORIGINS: str = "http://localhost:5173"

    # LLM
    LLM_PROVIDER: str = "openai"
    LLM_HYBRID: bool = True
    OPENAI_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    LLM_CHAT_MODEL: str = "gemini-2.5-flash"
    LLM_REASONING_MODEL: str = "gemini-2.5-pro"
    LLM_MODEL_FAST: str = "gemini-2.5-flash-lite"
    LLM_EMBEDDING_MODEL: str = "text-embedding-004"
    LLM_EMBEDDING_DIM: int = 768

    # RAG
    RAG_TOP_K: int = 8
    RAG_RERANK_TOP_K: int = 4
    RAG_SIMILARITY_THRESHOLD: float = 0.7
    RAG_GROUNDING_THRESHOLD: float = 0.7

    @property
    def allowed_origins_list(self) -> list[str]:
        return [o.strip() for o in self.ALLOWED_ORIGINS.split(",") if o.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()

"""Spaced repetition DTOs (Ebbinghaus 1885 + SM-2)."""

from __future__ import annotations

from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict


class SpacedRepItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    student_id: int
    concept: str | None = None
    question: str | None = None
    answer: str | None = None
    schedule: list[dict[str, Any]] = []
    next_due_at: datetime | None = None
    created_at: datetime | None = None


class SpacedRepAnswer(BaseModel):
    answer: str

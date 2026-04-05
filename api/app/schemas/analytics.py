"""Analytics DTOs — Pulse / Early Warning / Weak Zone."""

from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict


class PulseCreate(BaseModel):
    pulse_type: Literal["UNDERSTAND", "CONFUSED"]
    session_id: int | None = None
    concept: str | None = None


class AtRiskStudentOut(BaseModel):
    student_id: int
    level: Literal["HIGH", "MEDIUM", "LOW"]
    factors: list[str]
    last_active_at: datetime | None = None


class WeakZoneOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    student_id: int
    concept: str
    trigger: str | None = None
    status: str | None = None
    signals_count: int | None = None
    created_at: datetime | None = None

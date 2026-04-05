"""Formative assessment DTOs (Bloom mastery learning)."""

from __future__ import annotations

from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict

from ..models.formative import FormativeStatus


class FormativeAssessmentOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    student_id: int
    source_topic: str
    status: FormativeStatus
    created_at: datetime
    # 학습자 응답 화면용: 정답 필드는 제거한 형태
    questions: list[dict[str, Any]] = []


class FormativeSubmission(BaseModel):
    answers: list[dict[str, Any]]


class FormativeResultOut(BaseModel):
    assessment_id: int
    score: int
    total: int
    ratio: float
    wrong_concepts: list[str] = []
    sr_items_created: int = 0

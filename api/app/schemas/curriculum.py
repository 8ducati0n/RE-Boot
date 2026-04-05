"""Curriculum DTOs."""

from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel, ConfigDict

from ..models.curriculum import (
    CurriculumItemStatus,
    CurriculumItemType,
    CurriculumStatus,
)


class CurriculumItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    curriculum_id: int
    title: str
    item_type: CurriculumItemType
    skill_id: int | None = None
    order: int
    status: CurriculumItemStatus


class CurriculumOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    student_id: int
    title: str
    status: CurriculumStatus
    created_at: datetime
    items: list[CurriculumItemOut] = []

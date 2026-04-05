"""Skill + GapMap DTOs (Vygotsky ZPD)."""

from __future__ import annotations

from pydantic import BaseModel, ConfigDict

from ..models.skill import SkillStatus


class SkillOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    category: str | None = None
    difficulty_level: int
    description: str | None = None
    order: int


class StudentSkillOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    student_id: int
    skill_id: int
    status: SkillStatus
    progress: int


class SkillGap(BaseModel):
    skill_id: int
    name: str
    category: str | None = None
    status: SkillStatus
    difficulty_level: int


class CategoryStats(BaseModel):
    total: int
    owned: int
    learning: int
    weak: int
    gap: int
    gap_ratio: float


class GapMapOut(BaseModel):
    categories: dict[str, CategoryStats]
    gaps: list[SkillGap]

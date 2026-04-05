"""Placement diagnostic DTOs (ZPD — level=1/2/3)."""

from __future__ import annotations

from typing import Any

from pydantic import BaseModel, ConfigDict

from .skill import SkillGap


class PlacementQuestionOut(BaseModel):
    """공개 진단 문항 — 정답은 포함하지 않는다."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    question_text: str
    options: dict[str, Any] | list[Any]
    category: str | None = None
    difficulty: int
    order: int


class PlacementSubmission(BaseModel):
    answers: list[dict[str, Any]]


class PlacementResultOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    level: int
    score: int
    total: int
    category_scores: dict[str, Any]
    gap_map: list[SkillGap] = []

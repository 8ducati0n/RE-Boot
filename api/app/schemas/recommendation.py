"""AIRecommendation DTOs — HITL 게이트 API 경계."""

from __future__ import annotations

from datetime import datetime
from typing import Any, Literal

from pydantic import BaseModel, ConfigDict

from ..models.recommendation import (
    RecommendationStatus,
    RecommendationTier,
    RecommendationType,
)


class RecommendationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    type: RecommendationType
    tier: RecommendationTier
    status: RecommendationStatus
    reason: str | None = None
    evidence: dict[str, Any] = {}
    payload: dict[str, Any] = {}
    created_at: datetime
    grounding_score: float | None = None
    reviewed_by: int | None = None

    @classmethod
    def from_orm_rec(cls, rec) -> "RecommendationOut":
        return cls(
            id=rec.id,
            type=rec.type,
            tier=rec.tier,
            status=rec.status,
            reason=rec.reason,
            evidence=rec.evidence or {},
            payload=rec.payload or {},
            created_at=rec.created_at,
            grounding_score=rec.grounding_score,
            reviewed_by=rec.reviewed_by_id,
        )


class RecommendationAction(BaseModel):
    action: Literal["approve", "replace", "reject"]
    replacement_payload: dict[str, Any] | None = None
    instructor_note: str | None = None

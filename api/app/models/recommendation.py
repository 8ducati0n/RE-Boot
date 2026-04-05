"""AI Recommendation — the 2-Tier Trust gate.

Theoretical grounding
---------------------
This model operationalises Mishra & Koehler's (2006) TPACK framework, extended
to an AI-TPACK lens: an LLM can generate pedagogically reasonable suggestions
(Technological Pedagogical Content Knowledge), but it cannot replace the
instructor's situated judgement about *this* cohort and *this* learner.

Every LLM output that touches a student is therefore persisted here first and
routed through a two-tier trust gate before delivery:

Tier 1 (AUTO)    : low-risk, high-confidence actions (spaced-review reminders,
                   auto-generated formative items, pulse check follow-ups).
                   Still grounded against retrieval evidence; bypass manual
                   review only when ``grounding_score`` clears the configured
                   threshold.
Tier 2 (MANUAL)  : high-stakes actions (curriculum rerouting, risk alerts,
                   peer-group formation, tutor answers for cohort display).
                   Require an instructor to move the row from
                   ``PENDING_APPROVAL`` -> ``APPROVED`` / ``REPLACED`` /
                   ``REJECTED`` before ``DELIVERED``.

``evidence`` stores the concrete data points (quiz ids, pulse ids, embeddings
hits) the model used, so the instructor can audit the reasoning — this is the
"explainability" half of AI-TPACK in practice.

References
----------
Mishra, P., & Koehler, M. J. (2006). Technological pedagogical content
knowledge: A framework for teacher knowledge. *Teachers College Record,
108*(6), 1017-1054.
"""

from __future__ import annotations

import enum
from datetime import datetime
from typing import Any

from sqlalchemy import JSON, DateTime, Enum, Float, ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from ..database import Base


class RecommendationType(enum.StrEnum):
    REVIEW_ROUTE = "REVIEW_ROUTE"
    SUPPLEMENT = "SUPPLEMENT"
    REROUTE = "REROUTE"
    ALERT = "ALERT"
    GROUP_STUDY = "GROUP_STUDY"
    TUTOR_ANSWER = "TUTOR_ANSWER"


class RecommendationTier(enum.StrEnum):
    AUTO = "AUTO"
    MANUAL = "MANUAL"


class RecommendationStatus(enum.StrEnum):
    PENDING_GROUNDING = "PENDING_GROUNDING"
    PENDING_APPROVAL = "PENDING_APPROVAL"
    APPROVED = "APPROVED"
    REPLACED = "REPLACED"
    REJECTED = "REJECTED"
    DELIVERED = "DELIVERED"


class AIRecommendation(Base):
    __tablename__ = "ai_recommendations"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    type: Mapped[RecommendationType] = mapped_column(
        Enum(RecommendationType, name="ai_recommendation_type"), nullable=False
    )
    tier: Mapped[RecommendationTier] = mapped_column(
        Enum(RecommendationTier, name="ai_recommendation_tier"),
        default=RecommendationTier.MANUAL,
        nullable=False,
    )
    status: Mapped[RecommendationStatus] = mapped_column(
        Enum(RecommendationStatus, name="ai_recommendation_status"),
        default=RecommendationStatus.PENDING_GROUNDING,
        nullable=False,
    )

    target_student_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )

    payload: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False, default=dict)
    reason: Mapped[str | None] = mapped_column(Text, nullable=True)
    evidence: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False, default=dict)

    created_by_model: Mapped[str] = mapped_column(String(120), nullable=False)
    grounding_score: Mapped[float | None] = mapped_column(Float, nullable=True)

    reviewed_by_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    reviewed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    delivered_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

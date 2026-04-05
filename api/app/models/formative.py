"""Formative assessment — LLM-generated micro-checks triggered mid-lesson."""

from __future__ import annotations

import enum
from datetime import datetime
from typing import Any

from sqlalchemy import JSON, Boolean, DateTime, Enum, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from ..database import Base


class FormativeStatus(enum.StrEnum):
    GENERATED = "GENERATED"
    DELIVERED = "DELIVERED"
    SUBMITTED = "SUBMITTED"
    ARCHIVED = "ARCHIVED"


class FormativeAssessment(Base):
    __tablename__ = "formative_assessments"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    student_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )
    source_topic: Mapped[str] = mapped_column(String(255), nullable=False)
    questions: Mapped[list[dict[str, Any]]] = mapped_column(JSON, nullable=False, default=list)
    status: Mapped[FormativeStatus] = mapped_column(
        Enum(FormativeStatus, name="formative_status"),
        default=FormativeStatus.GENERATED,
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class FormativeResponse(Base):
    __tablename__ = "formative_responses"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    assessment_id: Mapped[int] = mapped_column(
        ForeignKey("formative_assessments.id", ondelete="CASCADE"),
        index=True,
        nullable=False,
    )
    answers: Mapped[list[dict[str, Any]]] = mapped_column(JSON, nullable=False, default=list)
    score: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    total: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    sr_items_created: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    submitted_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

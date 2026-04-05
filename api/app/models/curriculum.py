"""Personalised curriculum + item sequencing."""

from __future__ import annotations

import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column

from ..database import Base


class CurriculumStatus(enum.StrEnum):
    DRAFT = "DRAFT"
    ACTIVE = "ACTIVE"
    COMPLETED = "COMPLETED"
    ARCHIVED = "ARCHIVED"


class CurriculumItemType(enum.StrEnum):
    LECTURE = "LECTURE"
    SUPPLEMENT = "SUPPLEMENT"
    REVIEW = "REVIEW"
    PROJECT = "PROJECT"


class CurriculumItemStatus(enum.StrEnum):
    PENDING = "PENDING"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    SKIPPED = "SKIPPED"


class Curriculum(Base):
    __tablename__ = "curricula"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    student_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[CurriculumStatus] = mapped_column(
        Enum(CurriculumStatus, name="curriculum_status"),
        default=CurriculumStatus.DRAFT,
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class CurriculumItem(Base):
    __tablename__ = "curriculum_items"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    curriculum_id: Mapped[int] = mapped_column(
        ForeignKey("curricula.id", ondelete="CASCADE"), index=True, nullable=False
    )
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    item_type: Mapped[CurriculumItemType] = mapped_column(
        Enum(CurriculumItemType, name="curriculum_item_type"),
        nullable=False,
    )
    skill_id: Mapped[int | None] = mapped_column(
        ForeignKey("skills.id", ondelete="SET NULL"), nullable=True
    )
    order: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    status: Mapped[CurriculumItemStatus] = mapped_column(
        Enum(CurriculumItemStatus, name="curriculum_item_status"),
        default=CurriculumItemStatus.PENDING,
        nullable=False,
    )

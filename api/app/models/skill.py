"""Skill taxonomy + per-student skill state.

StudentSkill 의 status 는 Vygotsky (1978) 의 근접발달영역(ZPD) 이론에 기반한다:
- OWNED : 이미 숙달된 영역 (ZPD 하단)
- LEARNING / WEAK : 적절한 스캐폴딩으로 도달 가능한 ZPD
- GAP : 개입 없이는 도달 불가 → 보충 루트 필요
"""

from __future__ import annotations

import enum
from datetime import datetime

from sqlalchemy import DateTime, Enum, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from ..database import Base


class SkillStatus(enum.StrEnum):
    OWNED = "OWNED"
    LEARNING = "LEARNING"
    GAP = "GAP"
    WEAK = "WEAK"


class Skill(Base):
    __tablename__ = "skills"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    category: Mapped[str | None] = mapped_column(String(120), nullable=True)
    difficulty_level: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)


class StudentSkill(Base):
    __tablename__ = "student_skills"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    student_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )
    skill_id: Mapped[int] = mapped_column(
        ForeignKey("skills.id", ondelete="CASCADE"), index=True, nullable=False
    )
    status: Mapped[SkillStatus] = mapped_column(
        Enum(SkillStatus, name="student_skill_status"),
        default=SkillStatus.LEARNING,
        nullable=False,
    )
    progress: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

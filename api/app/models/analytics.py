"""Analytics signals: weak zones, risk, peer groups, pulse checks."""

from __future__ import annotations

import enum
from datetime import datetime
from typing import Any

from sqlalchemy import JSON, DateTime, Enum, ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from ..database import Base


class WeakZoneTrigger(enum.StrEnum):
    QUIZ_WRONG = "QUIZ_WRONG"
    PULSE_CONFUSED = "PULSE_CONFUSED"
    COMBINED = "COMBINED"


class WeakZoneStatus(enum.StrEnum):
    DETECTED = "DETECTED"
    RESOLVED = "RESOLVED"


class RiskLevel(enum.StrEnum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"


class PeerGroupStatus(enum.StrEnum):
    PROPOSED = "PROPOSED"
    ACTIVE = "ACTIVE"
    ARCHIVED = "ARCHIVED"


class PulseType(enum.StrEnum):
    UNDERSTAND = "UNDERSTAND"
    CONFUSED = "CONFUSED"


class WeakZoneSignal(Base):
    __tablename__ = "weak_zone_signals"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    student_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )
    concept: Mapped[str] = mapped_column(String(255), nullable=False)
    trigger_type: Mapped[WeakZoneTrigger] = mapped_column(
        Enum(WeakZoneTrigger, name="weak_zone_trigger"), nullable=False
    )
    trigger_detail: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False, default=dict)
    status: Mapped[WeakZoneStatus] = mapped_column(
        Enum(WeakZoneStatus, name="weak_zone_status"),
        default=WeakZoneStatus.DETECTED,
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class RiskSignal(Base):
    __tablename__ = "risk_signals"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    student_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )
    level: Mapped[RiskLevel] = mapped_column(
        Enum(RiskLevel, name="risk_level"), nullable=False
    )
    factors: Mapped[dict[str, Any]] = mapped_column(JSON, nullable=False, default=dict)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class PeerGroup(Base):
    __tablename__ = "peer_groups"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    members: Mapped[list[int]] = mapped_column(JSON, nullable=False, default=list)
    reason: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[PeerGroupStatus] = mapped_column(
        Enum(PeerGroupStatus, name="peer_group_status"),
        default=PeerGroupStatus.PROPOSED,
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )


class PulseCheck(Base):
    __tablename__ = "pulse_checks"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    student_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )
    session_id: Mapped[int | None] = mapped_column(nullable=True)
    pulse_type: Mapped[PulseType] = mapped_column(
        Enum(PulseType, name="pulse_type"), nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

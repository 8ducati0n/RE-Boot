"""Weak zone detection — quiz-wrong streak + pulse-confused clustering.

A *weak zone* is a concept the learner repeatedly fails on: either through
consecutive wrong answers on formatives/quizzes, or by emitting multiple
``CONFUSED`` pulses during a live session. The signal is persisted for the
instructor dashboard and, for QUIZ_WRONG, auto-generates an
``AIRecommendation(type=SUPPLEMENT, tier=AUTO)`` so Tier 1 grounding can
deliver a supplementary resource.
"""

from __future__ import annotations

from datetime import datetime, timedelta, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ...models import (
    PulseCheck,
    PulseType,
    RecommendationTier,
    RecommendationType,
    WeakZoneSignal,
    WeakZoneStatus,
    WeakZoneTrigger,
)
from ..adapt.recommendation_gate import create_recommendation


async def check_quiz_weak_zone(
    db: AsyncSession,
    student_id: int,
    concept: str,
    consecutive_wrong: int,
) -> WeakZoneSignal | None:
    """연속 오답 2회 이상 → WeakZoneSignal + SUPPLEMENT 제안 생성."""

    if consecutive_wrong < 2:
        return None

    signal = WeakZoneSignal(
        student_id=student_id,
        concept=concept,
        trigger_type=WeakZoneTrigger.QUIZ_WRONG,
        trigger_detail={"consecutive_wrong": consecutive_wrong},
        status=WeakZoneStatus.DETECTED,
    )
    db.add(signal)
    await db.flush()

    await create_recommendation(
        db,
        type=RecommendationType.SUPPLEMENT,
        tier=RecommendationTier.AUTO,
        target_student_id=student_id,
        payload={"concept": concept, "action": "deliver_supplement"},
        reason=f"'{concept}' 개념 연속 오답 {consecutive_wrong}회",
        evidence={
            "signal_id": signal.id,
            "concept": concept,
            "consecutive_wrong": consecutive_wrong,
        },
        created_by_model="weak_zone.rule_v1",
    )
    return signal


async def check_pulse_weak_zone(
    db: AsyncSession,
    student_id: int,
    session_id: int | None,
) -> WeakZoneSignal | None:
    """최근 3분 이내 CONFUSED 펄스가 2회 이상이면 WeakZoneSignal 생성."""

    since = datetime.now(timezone.utc) - timedelta(minutes=3)
    stmt = select(PulseCheck).where(
        PulseCheck.student_id == student_id,
        PulseCheck.pulse_type == PulseType.CONFUSED,
        PulseCheck.created_at >= since,
    )
    if session_id is not None:
        stmt = stmt.where(PulseCheck.session_id == session_id)
    result = await db.execute(stmt)
    confused = result.scalars().all()

    if len(confused) < 2:
        return None

    signal = WeakZoneSignal(
        student_id=student_id,
        concept=f"session:{session_id}" if session_id else "live_session",
        trigger_type=WeakZoneTrigger.PULSE_CONFUSED,
        trigger_detail={
            "session_id": session_id,
            "confused_count": len(confused),
            "window_min": 3,
        },
        status=WeakZoneStatus.DETECTED,
    )
    db.add(signal)
    await db.flush()
    return signal

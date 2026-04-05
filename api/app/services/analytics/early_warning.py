"""Early Warning System — rule-based at-risk detection.

Theoretical grounding
---------------------
- Siemens, G. (2013). Learning Analytics as an intervention layer.
- LAK 2025 Best Paper: retention prediction + fairness-aware thresholds.

Rules (intentionally explainable — no black box):
  1. 7+ days since last activity           → candidate, factor "inactivity"
  2. recent average quiz score < 60        → factor "low_score"
  3. 3+ recent quiz failures               → factor "quiz_failures"

Level assignment:
  - ≥ 14 days inactive              → HIGH
  - 7–13 days inactive              → MEDIUM
  - otherwise (but still factors)   → LOW

When a student becomes HIGH risk, an ``AIRecommendation(type=ALERT,
tier=MANUAL)`` is enqueued via the HITL gate.
"""

from __future__ import annotations

from datetime import datetime, timedelta, timezone

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from ...models import (
    FormativeResponse,
    PulseCheck,
    RecommendationTier,
    RecommendationType,
    User,
    UserRole,
)
from ..adapt.recommendation_gate import create_recommendation


async def detect_at_risk_students(db: AsyncSession) -> list[dict]:
    """Return at-risk student summaries.

    Each entry has shape::

        {
            "student_id": int,
            "level": "HIGH" | "MEDIUM" | "LOW",
            "factors": list[str],
            "last_active_at": datetime | None,
        }
    """

    now = datetime.now(timezone.utc)

    students_result = await db.execute(select(User).where(User.role == UserRole.STUDENT))
    students = students_result.scalars().all()

    # Last activity = most recent pulse or formative submission.
    pulse_rows = await db.execute(
        select(PulseCheck.student_id, func.max(PulseCheck.created_at)).group_by(
            PulseCheck.student_id
        )
    )
    last_pulse = {sid: ts for sid, ts in pulse_rows.all()}

    # FormativeResponse has assessment_id only — join via FormativeAssessment.
    from ...models import FormativeAssessment  # local import to avoid cycles

    form_rows = await db.execute(
        select(
            FormativeAssessment.student_id,
            func.max(FormativeResponse.submitted_at),
        ).join(
            FormativeResponse,
            FormativeResponse.assessment_id == FormativeAssessment.id,
        ).group_by(FormativeAssessment.student_id)
    )
    last_form = {sid: ts for sid, ts in form_rows.all()}

    # Recent quiz stats (last 14 days).
    window_start = now - timedelta(days=14)
    recent_rows = await db.execute(
        select(
            FormativeAssessment.student_id,
            FormativeResponse.score,
            FormativeResponse.total,
        )
        .join(FormativeResponse, FormativeResponse.assessment_id == FormativeAssessment.id)
        .where(FormativeResponse.submitted_at >= window_start)
    )
    recent_by_student: dict[int, list[tuple[int, int]]] = {}
    for sid, score, total in recent_rows.all():
        recent_by_student.setdefault(sid, []).append((int(score), int(total or 0)))

    at_risk: list[dict] = []

    for student in students:
        factors: list[str] = []
        last_active = max(
            [t for t in (last_pulse.get(student.id), last_form.get(student.id)) if t],
            default=None,
        )

        days_inactive: float | None = None
        if last_active is not None:
            days_inactive = (now - last_active).total_seconds() / 86400.0

        if days_inactive is None or days_inactive >= 7:
            factors.append("inactivity_7d+")

        recent = recent_by_student.get(student.id, [])
        if recent:
            ratios = [s / t for s, t in recent if t > 0]
            if ratios:
                avg_ratio = sum(ratios) / len(ratios)
                if avg_ratio < 0.6:
                    factors.append("avg_score_below_60")
            failures = sum(1 for s, t in recent if t > 0 and (s / t) < 0.6)
            if failures >= 3:
                factors.append("recent_quiz_failures_3+")

        if not factors:
            continue

        if days_inactive is not None and days_inactive >= 14:
            level = "HIGH"
        elif days_inactive is not None and days_inactive >= 7:
            level = "MEDIUM"
        else:
            level = "LOW"

        entry = {
            "student_id": student.id,
            "level": level,
            "factors": factors,
            "last_active_at": last_active,
        }
        at_risk.append(entry)

        if level == "HIGH":
            await create_recommendation(
                db,
                type=RecommendationType.ALERT,
                tier=RecommendationTier.MANUAL,
                target_student_id=student.id,
                payload={"level": level, "factors": factors},
                reason=f"{student.full_name or student.email} 학습자 고위험 경보",
                evidence={
                    "factors": factors,
                    "days_inactive": days_inactive,
                    "last_active_at": last_active.isoformat() if last_active else None,
                },
                created_by_model="early_warning.rule_v1",
            )

    return at_risk

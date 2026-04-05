"""Analytics router — Pulse / At-Risk / Weak Zones / Peer Groups.

Siemens (2013) 의 Learning Analytics 원칙: *분석의 목적은 개입*.
대시보드는 수단이며, 모든 지표가 ``AIRecommendation`` 을 생성할 수 있어야 한다.
"""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..deps import get_current_user
from ..models import (
    PulseCheck,
    PulseType,
    User,
    UserRole,
    WeakZoneSignal,
    WeakZoneStatus,
)
from ..schemas import (
    AtRiskStudentOut,
    PulseCreate,
    WeakZoneOut,
)
from ..services.analytics.early_warning import detect_at_risk_students
from ..services.analytics.peer_grouping import propose_group_study
from ..services.analytics.weak_zone import check_pulse_weak_zone

router = APIRouter()


@router.post("/pulse", status_code=201)
async def submit_pulse(
    payload: PulseCreate,
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
) -> dict:
    """학습자의 UNDERSTAND / CONFUSED 펄스 기록."""

    pulse = PulseCheck(
        student_id=current.id,
        session_id=payload.session_id,
        pulse_type=PulseType(payload.pulse_type),
    )
    db.add(pulse)
    await db.flush()

    weak_signal = None
    if pulse.pulse_type == PulseType.CONFUSED:
        weak_signal = await check_pulse_weak_zone(
            db, student_id=current.id, session_id=payload.session_id
        )

    await db.commit()
    return {
        "id": pulse.id,
        "pulse_type": pulse.pulse_type.value,
        "weak_zone_signal_id": weak_signal.id if weak_signal else None,
    }


@router.get("/at-risk", response_model=list[AtRiskStudentOut])
async def at_risk(
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
) -> list[AtRiskStudentOut]:
    """교수자/매니저 — 이탈 위험 학습자 목록."""

    if current.role not in (UserRole.INSTRUCTOR, UserRole.MANAGER):
        raise HTTPException(403, "instructor or manager role required")

    entries = await detect_at_risk_students(db)
    await db.commit()
    return [AtRiskStudentOut(**e) for e in entries]


@router.get("/weak-zones", response_model=list[WeakZoneOut])
async def weak_zones(
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
) -> list[WeakZoneOut]:
    """교수자용 — DETECTED 상태의 약점 시그널 목록."""

    if current.role not in (UserRole.INSTRUCTOR, UserRole.MANAGER):
        raise HTTPException(403, "instructor or manager role required")

    result = await db.execute(
        select(WeakZoneSignal)
        .where(WeakZoneSignal.status == WeakZoneStatus.DETECTED)
        .order_by(WeakZoneSignal.created_at.desc())
    )
    rows = result.scalars().all()
    return [
        WeakZoneOut(
            id=r.id,
            student_id=r.student_id,
            concept=r.concept,
            trigger=r.trigger_type.value if r.trigger_type else None,
            status=r.status.value if r.status else None,
            signals_count=(r.trigger_detail or {}).get("consecutive_wrong")
            or (r.trigger_detail or {}).get("confused_count"),
            created_at=r.created_at,
        )
        for r in rows
    ]


@router.post("/peer-groups/propose")
async def propose_peer_groups(
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
) -> dict:
    """교수자 트리거 — 약점 클러스터링 → GROUP_STUDY 제안 생성.

    Johnson & Johnson (1994) 의 협동학습 이론 + 박진아·김지은 (2024) 에서
    보고된 동료 관계(F10) 17.65% 를 구조적 개입으로 전환한다.
    """

    if current.role not in (UserRole.INSTRUCTOR, UserRole.MANAGER):
        raise HTTPException(403, "instructor or manager role required")

    created_ids = await propose_group_study(db)
    await db.commit()
    return {"created_recommendation_ids": created_ids, "count": len(created_ids)}

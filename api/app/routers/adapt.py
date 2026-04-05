"""Adapt router — AI-TPACK HITL gate surface.

모든 AI 제안은 ``AIRecommendation`` 로 저장되고, Tier 1/2 게이트를 통과한
뒤에만 학습자에게 노출된다. (Mishra & Koehler, 2006)
"""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from ..database import get_db
from ..deps import get_current_user
from ..models import (
    AIRecommendation,
    Curriculum,
    CurriculumItem,
    CurriculumStatus,
    RecommendationStatus,
    RecommendationType,
    User,
    UserRole,
)
from ..schemas import (
    CurriculumItemOut,
    CurriculumOut,
    RecommendationAction,
    RecommendationOut,
)
from ..services.adapt.curriculum_generator import generate_curriculum_for_student
from ..services.adapt.recommendation_gate import (
    approve_recommendation,
    deliver_approved,
)

router = APIRouter()


@router.get("/curriculum", response_model=CurriculumOut)
async def my_curriculum(
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
) -> CurriculumOut:
    """현재 사용자의 승인된(ACTIVE) 커리큘럼을 반환한다."""

    stmt = (
        select(Curriculum)
        .where(
            Curriculum.student_id == current.id,
            Curriculum.status == CurriculumStatus.ACTIVE,
        )
        .order_by(Curriculum.created_at.desc())
        .limit(1)
    )
    curriculum = (await db.execute(stmt)).scalar_one_or_none()
    if curriculum is None:
        raise HTTPException(404, "no active curriculum")

    items_result = await db.execute(
        select(CurriculumItem)
        .where(CurriculumItem.curriculum_id == curriculum.id)
        .order_by(CurriculumItem.order)
    )
    items = [CurriculumItemOut.model_validate(i) for i in items_result.scalars().all()]

    return CurriculumOut(
        id=curriculum.id,
        student_id=curriculum.student_id,
        title=curriculum.title,
        status=curriculum.status,
        created_at=curriculum.created_at,
        items=items,
    )


@router.post("/curriculum/generate", response_model=RecommendationOut)
async def trigger_curriculum_generation(
    student_id: int,
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
) -> RecommendationOut:
    """교수자 전용 — 특정 학습자 대상 AI 커리큘럼 생성을 트리거한다."""

    if current.role not in (UserRole.INSTRUCTOR, UserRole.MANAGER):
        raise HTTPException(403, "instructor role required")

    rec = await generate_curriculum_for_student(db, student_id)
    await db.commit()
    await db.refresh(rec)
    return RecommendationOut.from_orm_rec(rec)


@router.get("/recommendations", response_model=list[RecommendationOut])
async def list_recommendations(
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
    status: RecommendationStatus | None = Query(default=None),
    type: RecommendationType | None = Query(default=None),
    student_id: int | None = Query(default=None),
) -> list[RecommendationOut]:
    """제안 목록.

    - 교수자/매니저: 기본 ``PENDING_APPROVAL`` 조회
    - 학습자: 본인의 ``APPROVED`` / ``DELIVERED`` 만 조회
    """

    stmt = select(AIRecommendation)
    if current.role == UserRole.STUDENT:
        stmt = stmt.where(
            AIRecommendation.target_student_id == current.id,
            AIRecommendation.status.in_(
                [RecommendationStatus.APPROVED, RecommendationStatus.DELIVERED]
            ),
        )
    else:
        if status is None:
            stmt = stmt.where(
                AIRecommendation.status == RecommendationStatus.PENDING_APPROVAL
            )
        if student_id is not None:
            stmt = stmt.where(AIRecommendation.target_student_id == student_id)

    if status is not None and current.role != UserRole.STUDENT:
        stmt = stmt.where(AIRecommendation.status == status)
    if type is not None:
        stmt = stmt.where(AIRecommendation.type == type)

    stmt = stmt.order_by(AIRecommendation.created_at.desc())
    rows = (await db.execute(stmt)).scalars().all()
    return [RecommendationOut.from_orm_rec(r) for r in rows]


@router.post(
    "/recommendations/{rec_id}/action", response_model=RecommendationOut
)
async def act_on_recommendation(
    rec_id: int,
    payload: RecommendationAction,
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
) -> RecommendationOut:
    """교수자 Tier 2 판단 — approve / replace / reject."""

    if current.role not in (UserRole.INSTRUCTOR, UserRole.MANAGER):
        raise HTTPException(403, "instructor role required")

    existing = await db.get(AIRecommendation, rec_id)
    if existing is None:
        raise HTTPException(404, "recommendation not found")

    try:
        rec = await approve_recommendation(
            db,
            rec_id=rec_id,
            instructor_id=current.id,
            action=payload.action,
            replacement=payload.replacement_payload,
            note=payload.instructor_note,
        )
    except ValueError as exc:
        raise HTTPException(400, str(exc)) from exc

    if rec.status == RecommendationStatus.APPROVED:
        await deliver_approved(db, rec)

    await db.commit()
    await db.refresh(rec)
    return RecommendationOut.from_orm_rec(rec)

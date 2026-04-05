"""Mastery router — Bloom formative loop + Ebbinghaus spaced repetition."""

from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..deps import get_current_user
from ..models import (
    FormativeAssessment,
    FormativeResponse,
    FormativeStatus,
    SpacedRepetitionItem,
    User,
)
from ..schemas import (
    FormativeAssessmentOut,
    FormativeResultOut,
    FormativeSubmission,
    SpacedRepAnswer,
    SpacedRepItemOut,
)
from ..services.mastery import spaced_repetition as sr_service
from ..services.mastery.formative_gen import generate_formative

router = APIRouter()


def _strip_answers(questions: list[dict]) -> list[dict]:
    """학습자 화면용으로 정답 필드를 제거한다."""

    sanitized: list[dict] = []
    for q in questions:
        if not isinstance(q, dict):
            continue
        clone = {k: v for k, v in q.items() if k not in ("answer", "correct", "explanation")}
        sanitized.append(clone)
    return sanitized


@router.post("/formative/generate", response_model=FormativeAssessmentOut)
async def create_formative(
    topic: str,
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
) -> FormativeAssessmentOut:
    """주어진 토픽에 대한 5문항 형성평가 생성."""

    assessment = await generate_formative(db, current.id, topic)
    await db.commit()
    await db.refresh(assessment)
    return FormativeAssessmentOut(
        id=assessment.id,
        student_id=assessment.student_id,
        source_topic=assessment.source_topic,
        status=assessment.status,
        created_at=assessment.created_at,
        questions=_strip_answers(assessment.questions or []),
    )


@router.get("/formative/{assessment_id}", response_model=FormativeAssessmentOut)
async def get_formative(
    assessment_id: int,
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
) -> FormativeAssessmentOut:
    """형성평가 문항 조회 — 정답 필드는 응답에서 제외."""

    assessment = await db.get(FormativeAssessment, assessment_id)
    if assessment is None:
        raise HTTPException(404, "formative not found")

    return FormativeAssessmentOut(
        id=assessment.id,
        student_id=assessment.student_id,
        source_topic=assessment.source_topic,
        status=assessment.status,
        created_at=assessment.created_at,
        questions=_strip_answers(assessment.questions or []),
    )


@router.post("/formative/{assessment_id}/submit", response_model=FormativeResultOut)
async def submit_formative(
    assessment_id: int,
    payload: FormativeSubmission,
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
) -> FormativeResultOut:
    """채점 + 오답 개념을 SR 큐로 이관 (Bloom → Ebbinghaus 루프)."""

    assessment = await db.get(FormativeAssessment, assessment_id)
    if assessment is None:
        raise HTTPException(404, "formative not found")

    questions = {i: q for i, q in enumerate(assessment.questions or []) if isinstance(q, dict)}
    score = 0
    total = len(questions)
    wrong_concepts: list[str] = []

    for ans in payload.answers:
        try:
            idx = int(ans.get("index"))
        except (TypeError, ValueError):
            continue
        q = questions.get(idx)
        if q is None:
            continue
        if str(ans.get("answer", "")) == str(q.get("answer", "")):
            score += 1
        else:
            concept = str(q.get("concept") or q.get("question") or f"q{idx}")
            if concept not in wrong_concepts:
                wrong_concepts.append(concept)

    response_row = FormativeResponse(
        assessment_id=assessment.id,
        answers=payload.answers,
        score=score,
        total=total,
        sr_items_created=False,
    )
    db.add(response_row)

    sr_created = 0
    for concept in wrong_concepts:
        matching_q = next(
            (q for q in assessment.questions or [] if isinstance(q, dict) and q.get("concept") == concept),
            None,
        )
        question_text = (matching_q or {}).get("question", concept)
        answer_text = (matching_q or {}).get("answer", "")
        schedule = sr_service.build_schedule(difficulty="medium")
        sr_item = SpacedRepetitionItem(
            student_id=current.id,
            concept_name=concept,
            review_question=str(question_text),
            review_answer=str(answer_text),
            difficulty="medium",
            schedule=schedule,
            current_review=0,
            ease=1.0,
        )
        db.add(sr_item)
        sr_created += 1

    response_row.sr_items_created = sr_created > 0
    assessment.status = FormativeStatus.SUBMITTED
    await db.commit()

    return FormativeResultOut(
        assessment_id=assessment.id,
        score=score,
        total=total,
        ratio=(score / total) if total else 0.0,
        wrong_concepts=wrong_concepts,
        sr_items_created=sr_created,
    )


@router.get("/spaced-repetition/due", response_model=list[SpacedRepItemOut])
async def due_items(
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
) -> list[SpacedRepItemOut]:
    """오늘 복습이 필요한 SR 아이템 목록."""

    now = datetime.now(timezone.utc)
    stmt = select(SpacedRepetitionItem).where(
        SpacedRepetitionItem.student_id == current.id
    )
    items = (await db.execute(stmt)).scalars().all()

    due: list[SpacedRepItemOut] = []
    for it in items:
        next_iso = sr_service.next_due(it.schedule or [])
        if next_iso is None:
            continue
        try:
            next_dt = datetime.fromisoformat(next_iso)
        except ValueError:
            continue
        if next_dt <= now:
            due.append(
                SpacedRepItemOut(
                    id=it.id,
                    student_id=it.student_id,
                    concept=it.concept_name,
                    question=it.review_question,
                    answer=None,  # hide answer until user submits
                    schedule=it.schedule or [],
                    next_due_at=next_dt,
                    created_at=it.created_at,
                )
            )
    return due


@router.post(
    "/spaced-repetition/{item_id}/answer", response_model=SpacedRepItemOut
)
async def answer_sr_item(
    item_id: int,
    payload: SpacedRepAnswer,
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
) -> SpacedRepItemOut:
    """SR 아이템 응답 → ``advance`` 로 스케줄 갱신."""

    item = await db.get(SpacedRepetitionItem, item_id)
    if item is None or item.student_id != current.id:
        raise HTTPException(404, "sr item not found")

    was_correct = payload.answer.strip().lower() == (item.review_answer or "").strip().lower()
    next_iso = sr_service.advance(item, was_correct=was_correct)
    await db.commit()
    await db.refresh(item)

    next_dt = None
    if next_iso:
        try:
            next_dt = datetime.fromisoformat(next_iso)
        except ValueError:
            next_dt = None

    return SpacedRepItemOut(
        id=item.id,
        student_id=item.student_id,
        concept=item.concept_name,
        question=item.review_question,
        answer=item.review_answer if was_correct else None,
        schedule=item.schedule or [],
        next_due_at=next_dt,
        created_at=item.created_at,
    )

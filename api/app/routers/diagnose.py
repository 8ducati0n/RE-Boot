"""Diagnostic router — Vygotsky ZPD placement.

학습자의 **현재 수준(Level)** 과 **잠재 수준** 사이의 간극을 정량화한다.
정답률 ratio ≥ 0.7 → Lv3, ≥ 0.4 → Lv2, else → Lv1 규칙은 근접발달영역
(Zone of Proximal Development, Vygotsky 1978) 의 RE:Boot 운용 정의다.
"""

from __future__ import annotations

from collections import defaultdict
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ..database import get_db
from ..deps import get_current_user
from ..models import (
    PlacementQuestion,
    PlacementResult,
    Skill,
    SkillStatus,
    StudentSkill,
    User,
)
from ..schemas import (
    CategoryStats,
    GapMapOut,
    PlacementQuestionOut,
    PlacementResultOut,
    PlacementSubmission,
    SkillGap,
)

router = APIRouter()


@router.get("/questions", response_model=list[PlacementQuestionOut])
async def list_questions(db: AsyncSession = Depends(get_db)) -> list[PlacementQuestionOut]:
    """공개 진단 문항 목록 — 정답은 절대 포함하지 않는다."""

    result = await db.execute(select(PlacementQuestion).order_by(PlacementQuestion.order))
    questions = result.scalars().all()
    return [PlacementQuestionOut.model_validate(q) for q in questions]


def _compute_level(ratio: float) -> int:
    if ratio >= 0.7:
        return 3
    if ratio >= 0.4:
        return 2
    return 1


@router.post("/submit", response_model=PlacementResultOut)
async def submit(
    payload: PlacementSubmission,
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
) -> PlacementResultOut:
    """진단 응답 채점 + PlacementResult + StudentSkill 초기화."""

    q_result = await db.execute(select(PlacementQuestion))
    questions = {q.id: q for q in q_result.scalars().all()}
    if not questions:
        raise HTTPException(404, "no placement questions configured")

    correct_total = 0
    category_hits: dict[str, dict[str, int]] = defaultdict(
        lambda: {"correct": 0, "total": 0}
    )

    for ans in payload.answers:
        try:
            qid = int(ans.get("question_id"))
        except (TypeError, ValueError):
            continue
        chosen = str(ans.get("answer", ""))
        q = questions.get(qid)
        if q is None:
            continue
        category = q.category or "general"
        category_hits[category]["total"] += 1
        if chosen == q.correct_answer:
            correct_total += 1
            category_hits[category]["correct"] += 1

    total = len(questions)
    ratio = correct_total / total if total else 0.0
    level = _compute_level(ratio)

    category_scores: dict[str, Any] = {
        cat: {
            "correct": h["correct"],
            "total": h["total"],
            "ratio": (h["correct"] / h["total"]) if h["total"] else 0.0,
        }
        for cat, h in category_hits.items()
    }

    result_row = PlacementResult(
        student_id=current.id,
        level=level,
        score=correct_total,
        total_questions=total,
        answers=payload.answers,
        category_scores=category_scores,
    )
    db.add(result_row)
    await db.flush()

    # Initialise StudentSkill rows: skills at or below reached level → LEARNING,
    # above → GAP (ZPD boundary).
    skills_result = await db.execute(select(Skill))
    all_skills = skills_result.scalars().all()

    existing_result = await db.execute(
        select(StudentSkill).where(StudentSkill.student_id == current.id)
    )
    existing = {ss.skill_id: ss for ss in existing_result.scalars().all()}

    gap_entries: list[SkillGap] = []
    for skill in all_skills:
        cat_hit = category_hits.get(skill.category or "general", {"correct": 0, "total": 0})
        cat_ratio = (
            cat_hit["correct"] / cat_hit["total"] if cat_hit["total"] else ratio
        )
        if skill.difficulty_level <= level and cat_ratio >= 0.7:
            status = SkillStatus.OWNED
        elif skill.difficulty_level <= level:
            status = SkillStatus.LEARNING
        elif skill.difficulty_level == level + 1:
            status = SkillStatus.WEAK
        else:
            status = SkillStatus.GAP

        row = existing.get(skill.id)
        if row is None:
            row = StudentSkill(student_id=current.id, skill_id=skill.id, status=status)
            db.add(row)
        else:
            row.status = status

        if status in (SkillStatus.GAP, SkillStatus.WEAK):
            gap_entries.append(
                SkillGap(
                    skill_id=skill.id,
                    name=skill.name,
                    category=skill.category,
                    status=status,
                    difficulty_level=skill.difficulty_level,
                )
            )

    await db.commit()
    await db.refresh(result_row)

    return PlacementResultOut(
        id=result_row.id,
        level=result_row.level,
        score=result_row.score,
        total=result_row.total_questions,
        category_scores=result_row.category_scores,
        gap_map=gap_entries,
    )


@router.get("/gap-map", response_model=GapMapOut)
async def gap_map(
    db: AsyncSession = Depends(get_db),
    current: User = Depends(get_current_user),
) -> GapMapOut:
    """현재 사용자 기준 카테고리별 ZPD Gap 맵."""

    stmt = (
        select(StudentSkill, Skill)
        .join(Skill, Skill.id == StudentSkill.skill_id)
        .where(StudentSkill.student_id == current.id)
    )
    rows = (await db.execute(stmt)).all()
    if not rows:
        raise HTTPException(404, "no skill map — run placement first")

    by_category: dict[str, dict[str, int]] = defaultdict(
        lambda: {"total": 0, "owned": 0, "learning": 0, "weak": 0, "gap": 0}
    )
    gaps: list[SkillGap] = []

    for ss, skill in rows:
        bucket = by_category[skill.category or "general"]
        bucket["total"] += 1
        if ss.status == SkillStatus.OWNED:
            bucket["owned"] += 1
        elif ss.status == SkillStatus.LEARNING:
            bucket["learning"] += 1
        elif ss.status == SkillStatus.WEAK:
            bucket["weak"] += 1
            gaps.append(
                SkillGap(
                    skill_id=skill.id,
                    name=skill.name,
                    category=skill.category,
                    status=ss.status,
                    difficulty_level=skill.difficulty_level,
                )
            )
        elif ss.status == SkillStatus.GAP:
            bucket["gap"] += 1
            gaps.append(
                SkillGap(
                    skill_id=skill.id,
                    name=skill.name,
                    category=skill.category,
                    status=ss.status,
                    difficulty_level=skill.difficulty_level,
                )
            )

    categories = {
        cat: CategoryStats(
            total=stats["total"],
            owned=stats["owned"],
            learning=stats["learning"],
            weak=stats["weak"],
            gap=stats["gap"],
            gap_ratio=(stats["gap"] + stats["weak"]) / stats["total"]
            if stats["total"]
            else 0.0,
        )
        for cat, stats in by_category.items()
    }
    return GapMapOut(categories=categories, gaps=gaps)

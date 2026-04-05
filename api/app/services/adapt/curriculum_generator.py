"""LLM-driven personalised curriculum generator.

The student's ``StudentSkill`` rows (ZPD map) are handed to the chat model,
which returns a 12-week plan as structured JSON. The plan is never delivered
directly; it is wrapped in an ``AIRecommendation(type=REROUTE, tier=MANUAL)``
and enters the HITL gate for instructor approval (see
``recommendation_gate``).
"""

from __future__ import annotations

import json

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ...config import settings
from ...core.llm import chat_json
from ...models import (
    AIRecommendation,
    RecommendationTier,
    RecommendationType,
    Skill,
    SkillStatus,
    StudentSkill,
)
from .recommendation_gate import create_recommendation


async def generate_curriculum_for_student(
    db: AsyncSession, student_id: int
) -> AIRecommendation:
    """학습자의 갭 영역을 기반으로 12주 커리큘럼을 생성한다."""

    stmt = (
        select(StudentSkill, Skill)
        .join(Skill, Skill.id == StudentSkill.skill_id)
        .where(StudentSkill.student_id == student_id)
    )
    result = await db.execute(stmt)
    rows = result.all()

    gaps = [
        {
            "skill": skill.name,
            "category": skill.category,
            "level": skill.difficulty_level,
            "status": str(ss.status.value if hasattr(ss.status, "value") else ss.status),
        }
        for ss, skill in rows
        if ss.status in (SkillStatus.GAP, SkillStatus.WEAK, SkillStatus.LEARNING)
    ]

    system_prompt = (
        "You are an expert bootcamp curriculum designer. "
        "Return ONLY valid JSON with the following shape: "
        '{"title": str, "weeks": [{"week": int, "goal": str, '
        '"items": [{"title": str, "type": "LECTURE|SUPPLEMENT|REVIEW|PROJECT", '
        '"skill": str}]}]}'
    )
    user_prompt = (
        "Generate a 12-week curriculum for a bootcamp student with these gaps: "
        + json.dumps(gaps, ensure_ascii=False)
    )

    llm_payload = await chat_json(
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        model=settings.LLM_CHAT_MODEL,
        temperature=0.3,
    )

    rec = await create_recommendation(
        db,
        type=RecommendationType.REROUTE,
        tier=RecommendationTier.MANUAL,
        target_student_id=student_id,
        payload=llm_payload if isinstance(llm_payload, dict) else {"raw": llm_payload},
        reason="학습자의 GAP 영역을 기반으로 한 12주 개인 맞춤 커리큘럼 제안",
        evidence={"gaps": gaps, "gap_count": len(gaps)},
        created_by_model=settings.LLM_CHAT_MODEL,
    )
    return rec

"""Formative assessment generation — Bloom (1968) mastery learning.

Produces 5 MCQs from a topic using the chat LLM, then persists a
``FormativeAssessment`` row. Wrong answers at submission time become
``SpacedRepetitionItem`` entries (see ``routers.mastery``).
"""

from __future__ import annotations

import json

from sqlalchemy.ext.asyncio import AsyncSession

from ...config import settings
from ...core.llm import chat_json
from ...models import FormativeAssessment, FormativeStatus


async def generate_formative(
    db: AsyncSession, student_id: int, topic: str
) -> FormativeAssessment:
    """주어진 토픽에 대한 5문항 형성평가를 생성해 저장한다."""

    system_prompt = (
        "You write short formative assessment items in Korean for bootcamp "
        "learners. Return ONLY valid JSON with shape: "
        '{"questions": [{"concept": str, "question": str, '
        '"options": [str, str, str, str], "answer": str, '
        '"explanation": str}]}. Produce exactly 5 questions.'
    )
    user_prompt = f"주제: {topic}. 5개의 객관식 형성평가 문항을 생성해주세요."

    llm_result = await chat_json(
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        model=settings.LLM_CHAT_MODEL,
        temperature=0.4,
    )

    questions: list[dict] = []
    if isinstance(llm_result, dict):
        raw_questions = llm_result.get("questions")
        if isinstance(raw_questions, list):
            questions = [q for q in raw_questions if isinstance(q, dict)]

    if not questions:
        # Deterministic fallback so the API contract is honoured when the LLM
        # is unavailable (offline dev / CI).
        questions = [
            {
                "concept": topic,
                "question": f"[{topic}] 기본 개념 확인 문항 {i + 1}",
                "options": ["A", "B", "C", "D"],
                "answer": "A",
                "explanation": "자동 생성 스텁",
            }
            for i in range(5)
        ]

    assessment = FormativeAssessment(
        student_id=student_id,
        source_topic=topic,
        questions=questions,
        status=FormativeStatus.GENERATED,
    )
    db.add(assessment)
    await db.flush()
    return assessment

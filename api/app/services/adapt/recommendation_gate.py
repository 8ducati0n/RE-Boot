"""2-Tier HITL gate for every LLM-originated suggestion.

Theoretical grounding — AI-TPACK
--------------------------------
Mishra & Koehler (2006) decompose effective teaching into Technology(T),
Content(C) and Pedagogy(P). An LLM can contribute strongly to T and C, but the
pedagogical judgement of *when and to whom* a suggestion should be delivered
remains the instructor's responsibility. This module operationalises that
division of labour:

- **Tier 1 — AUTO**: low-stakes, evidence-verifiable suggestions (spaced review
  reminders, auto supplements). The recommendation first sits in
  ``PENDING_GROUNDING``; once ``run_grounding_gate`` clears the retrieval check
  it is auto-approved.
- **Tier 2 — MANUAL**: high-stakes suggestions (curriculum reroutes, risk
  alerts, peer group formation). Always created in ``PENDING_APPROVAL`` and
  require an instructor to ``approve`` / ``replace`` / ``reject``.

Every transition persists ``reason`` + ``evidence`` so the instructor panel can
audit the decision (explainability half of AI-TPACK).

Reference
---------
Mishra, P., & Koehler, M. J. (2006). Technological Pedagogical Content
Knowledge: A framework for teacher knowledge. *Teachers College Record,
108*(6), 1017-1054.
"""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from sqlalchemy.ext.asyncio import AsyncSession

from ...config import settings
from ...models import (
    AIRecommendation,
    PeerGroup,
    PeerGroupStatus,
    RecommendationStatus,
    RecommendationTier,
    RecommendationType,
)


async def create_recommendation(
    db: AsyncSession,
    *,
    type: RecommendationType,
    tier: RecommendationTier,
    target_student_id: int,
    payload: dict[str, Any],
    reason: str | None,
    evidence: dict[str, Any],
    created_by_model: str,
) -> AIRecommendation:
    """AI 제안을 게이트에 등록한다.

    Tier 정책:
      - ``AUTO``   → ``PENDING_GROUNDING`` (Tier 1 자동 grounding 대기)
      - ``MANUAL`` → ``PENDING_APPROVAL`` (Tier 2 교수자 승인 대기)
    """

    initial_status = (
        RecommendationStatus.PENDING_GROUNDING
        if tier == RecommendationTier.AUTO
        else RecommendationStatus.PENDING_APPROVAL
    )
    rec = AIRecommendation(
        type=type,
        tier=tier,
        status=initial_status,
        target_student_id=target_student_id,
        payload=payload or {},
        reason=reason,
        evidence=evidence or {},
        created_by_model=created_by_model,
    )
    db.add(rec)
    await db.flush()
    return rec


async def run_grounding_gate(
    db: AsyncSession,
    rec: AIRecommendation,
    sources: list[str],
) -> AIRecommendation:
    """Tier 1 자동 게이트: grounding score 가 임계값 이상이면 APPROVED.

    임계값 미달 시에는 Tier 2 로 **에스컬레이트**하여 교수자 승인 큐에 올린다.
    """

    # Lazy import to avoid a circular dep with services.tutor (owned by another agent).
    try:
        from ..tutor.grounding import check_grounding  # type: ignore
    except Exception:  # pragma: no cover - tutor module may not be written yet
        async def check_grounding(text: str, sources: list[str]) -> float:  # type: ignore
            return 0.0

    claim_text = (rec.reason or "") + " " + str(rec.payload or "")
    score = await check_grounding(claim_text, sources)
    rec.grounding_score = float(score)

    if score >= settings.RAG_GROUNDING_THRESHOLD:
        rec.status = RecommendationStatus.APPROVED
    else:
        # Human escalation — Tier 2.
        rec.status = RecommendationStatus.PENDING_APPROVAL

    await db.flush()
    return rec


async def approve_recommendation(
    db: AsyncSession,
    rec_id: int,
    instructor_id: int,
    action: str,
    replacement: dict[str, Any] | None = None,
    note: str | None = None,
) -> AIRecommendation:
    """Tier 2 교수자 판단 — approve / replace / reject 상태 전이."""

    rec = await db.get(AIRecommendation, rec_id)
    if rec is None:
        raise ValueError(f"recommendation {rec_id} not found")

    now = datetime.now(timezone.utc)
    rec.reviewed_by_id = instructor_id
    rec.reviewed_at = now

    if action == "approve":
        rec.status = RecommendationStatus.APPROVED
    elif action == "replace":
        if replacement is not None:
            rec.payload = replacement
        rec.status = RecommendationStatus.REPLACED
        # A replaced recommendation is considered instructor-authored and
        # therefore immediately approved for delivery.
        rec.status = RecommendationStatus.APPROVED
    elif action == "reject":
        rec.status = RecommendationStatus.REJECTED
    else:
        raise ValueError(f"unknown action '{action}'")

    if note:
        evidence = dict(rec.evidence or {})
        evidence["instructor_note"] = note
        rec.evidence = evidence

    await db.flush()
    return rec


async def deliver_approved(db: AsyncSession, rec: AIRecommendation) -> AIRecommendation:
    """APPROVED 상태의 제안을 학습자에게 실제 전달하고 부수효과를 실행한다."""

    if rec.status != RecommendationStatus.APPROVED:
        raise ValueError("only APPROVED recommendations can be delivered")

    rec.delivered_at = datetime.now(timezone.utc)
    rec.status = RecommendationStatus.DELIVERED

    # Side effects per type.
    if rec.type == RecommendationType.GROUP_STUDY:
        payload = rec.payload or {}
        members = payload.get("members") or payload.get("student_ids") or []
        concept = payload.get("concept") or "group-study"
        group = PeerGroup(
            name=f"약점 동기화 — {concept}",
            members=list(members),
            reason=rec.reason,
            status=PeerGroupStatus.PROPOSED,
        )
        db.add(group)

    await db.flush()
    return rec

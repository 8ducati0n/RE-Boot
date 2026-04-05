"""Peer grouping via cosine similarity over weak-zone profiles.

Theoretical grounding
---------------------
- **Johnson, D. W., & Johnson, R. T. (1994).** *Learning Together and Alone:
  Cooperative, Competitive, and Individualistic Learning*. Allyn & Bacon.
  Cooperative learning is most effective when members share a concrete
  interdependent goal — here, overcoming the *same* weak zone.
- **박진아·김지은 (2024).** 부트캠프형 소프트웨어 교육 인식과 학습 이탈 방지
  요인. *컴퓨터교육학회 논문지*, 27(1). 보고된 이탈 방지 요인 중 **동료 관계
  (F10)** 가 **17.65% — 1위**. RE:Boot 의 GROUP_STUDY 제안은 이 실증 지표를
  구조적 개입으로 전환하는 장치다.

Pipeline
--------
1. Read every ``DETECTED`` ``WeakZoneSignal`` row.
2. Build a student × concept binary matrix.
3. Compute cosine similarity across student vectors (sklearn).
4. Greedy-cluster students who share the same dominant concept and exceed a
   similarity floor.
5. For each cluster create ``AIRecommendation(type=GROUP_STUDY, tier=MANUAL)``.
"""

from __future__ import annotations

from collections import defaultdict
from typing import Any

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from ...models import (
    RecommendationTier,
    RecommendationType,
    WeakZoneSignal,
    WeakZoneStatus,
)
from ..adapt.recommendation_gate import create_recommendation


async def cluster_weak_students(
    db: AsyncSession,
    *,
    min_group_size: int = 3,
    max_group_size: int = 5,
    similarity_floor: float = 0.5,
) -> list[dict[str, Any]]:
    """약점 프로파일 코사인 유사도 기반 클러스터링."""

    result = await db.execute(
        select(WeakZoneSignal).where(WeakZoneSignal.status == WeakZoneStatus.DETECTED)
    )
    signals = result.scalars().all()
    if not signals:
        return []

    # student_id -> {concept: count}
    profile: dict[int, dict[str, int]] = defaultdict(lambda: defaultdict(int))
    for sig in signals:
        profile[sig.student_id][sig.concept] += 1

    concepts = sorted({c for p in profile.values() for c in p.keys()})
    if not concepts:
        return []

    student_ids = sorted(profile.keys())
    matrix: list[list[float]] = [
        [float(profile[sid].get(c, 0)) for c in concepts] for sid in student_ids
    ]

    # Cosine similarity — prefer sklearn, fall back to a pure-Python path for
    # environments without the dependency installed.
    try:
        from sklearn.metrics.pairwise import cosine_similarity  # type: ignore

        sim = cosine_similarity(matrix)
    except Exception:  # pragma: no cover - fallback
        import math

        def _cos(a: list[float], b: list[float]) -> float:
            num = sum(x * y for x, y in zip(a, b))
            da = math.sqrt(sum(x * x for x in a))
            db_ = math.sqrt(sum(y * y for y in b))
            if da == 0 or db_ == 0:
                return 0.0
            return num / (da * db_)

        sim = [[_cos(row, other) for other in matrix] for row in matrix]

    clusters: list[dict[str, Any]] = []

    # One cluster candidate per concept: students whose dominant weak concept
    # is this one AND who exceed the similarity floor with the seed student.
    by_dominant: dict[str, list[int]] = defaultdict(list)
    for sid in student_ids:
        dominant = max(profile[sid].items(), key=lambda kv: kv[1])[0]
        by_dominant[dominant].append(sid)

    for concept, members in by_dominant.items():
        if len(members) < min_group_size:
            continue

        seed = members[0]
        seed_idx = student_ids.index(seed)
        sims: list[float] = []
        picked: list[int] = []
        for sid in members:
            other_idx = student_ids.index(sid)
            s = float(sim[seed_idx][other_idx])
            if s >= similarity_floor:
                picked.append(sid)
                sims.append(s)
            if len(picked) >= max_group_size:
                break

        if len(picked) < min_group_size:
            continue

        clusters.append(
            {
                "concept": concept,
                "student_ids": picked,
                "similarity_avg": sum(sims) / len(sims) if sims else 0.0,
            }
        )

    return clusters


async def propose_group_study(db: AsyncSession) -> list[int]:
    """Create GROUP_STUDY recommendations for each detected cluster.

    Returns the ids of the created ``AIRecommendation`` rows.
    """

    clusters = await cluster_weak_students(db)
    created_ids: list[int] = []

    for cluster in clusters:
        concept = cluster["concept"]
        members = cluster["student_ids"]
        seed = members[0]

        rec = await create_recommendation(
            db,
            type=RecommendationType.GROUP_STUDY,
            tier=RecommendationTier.MANUAL,
            target_student_id=seed,
            payload={"concept": concept, "members": members},
            reason=f"동일 약점: {concept}",
            evidence={
                "concept": concept,
                "student_ids": members,
                "signals_count": len(members),
                "similarity_avg": cluster["similarity_avg"],
            },
            created_by_model="peer_grouping.cosine_v1",
        )
        created_ids.append(rec.id)

    return created_ids

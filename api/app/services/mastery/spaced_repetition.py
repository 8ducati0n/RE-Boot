"""Spaced repetition scheduler — Ebbinghaus + SM-2 hybrid.

Theoretical grounding
---------------------
- **Ebbinghaus, H. (1885).** *Über das Gedächtnis*. Leipzig: Duncker & Humblot.
  Showed that recall of nonsense material decays roughly exponentially, and
  that review sessions "re-set" the curve.
- **SuperMemo SM-2 (Wozniak, 1990).** Adjusts the expanding-interval schedule
  per item using an *ease factor* driven by recall quality. Correct reviews
  advance to the next slot; incorrect recall collapses the schedule back.

Design notes
------------
The schedule is a list of ``{review_num, label, due_at, completed}`` dicts so
the UI can render both progress and upcoming review dates without recomputing.
Difficulty multipliers widen or shrink the base intervals; ``ease`` is an
additional per-learner knob the caller can update from historical recall
quality.

Public API
----------
- :data:`DEFAULT_INTERVALS` — base schedule, override via
  ``settings.SPACED_REPETITION_INTERVALS``.
- :data:`DIFFICULTY_MULTIPLIERS` — easy/medium/hard + 1..5 numeric scale.
- :func:`build_schedule` — create a fresh schedule for a new SR item.
- :func:`advance` — mutate an existing item after a review answer.
- :func:`next_due` — pick the next ``due_at`` from a schedule.
"""

from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any

from ...config import settings
from ...models import SpacedRepetitionItem

DEFAULT_INTERVALS: list[dict[str, Any]] = [
    {"label": "10분 후", "minutes": 10},
    {"label": "1일 후", "minutes": 1440},
    {"label": "1주일 후", "minutes": 10080},
    {"label": "1개월 후", "minutes": 43200},
    {"label": "6개월 후", "minutes": 259200},
]

DIFFICULTY_MULTIPLIERS: dict[Any, float] = {
    "easy": 1.3,
    "medium": 1.0,
    "hard": 0.7,
    1: 1.4,
    2: 1.2,
    3: 1.0,
    4: 0.85,
    5: 0.7,
}


def _intervals() -> list[dict[str, Any]]:
    override = getattr(settings, "SPACED_REPETITION_INTERVALS", None)
    if override:
        return list(override)
    return DEFAULT_INTERVALS


def _multiplier(difficulty: Any | None) -> float:
    if difficulty is None:
        return 1.0
    return float(DIFFICULTY_MULTIPLIERS.get(difficulty, 1.0))


def build_schedule(
    now: datetime | None = None,
    *,
    difficulty: Any | None = None,
    ease: float = 1.0,
) -> list[dict[str, Any]]:
    """새 SR 아이템의 복습 스케줄을 생성한다.

    :param difficulty: ``easy``/``medium``/``hard`` 또는 1..5 정수.
    :param ease: 학습자 개인화 배수 (과거 복습 성공률 기반).
    """

    now = now or datetime.now(timezone.utc)
    mult = _multiplier(difficulty) * max(0.1, float(ease))
    schedule: list[dict[str, Any]] = []
    for idx, step in enumerate(_intervals(), start=1):
        delta = timedelta(minutes=float(step["minutes"]) * mult)
        schedule.append(
            {
                "review_num": idx,
                "label": step["label"],
                "due_at": (now + delta).isoformat(),
                "completed": False,
            }
        )
    return schedule


def next_due(schedule: list[dict[str, Any]]) -> str | None:
    """스케줄에서 다음 미완료 due_at ISO 문자열을 반환한다."""

    for slot in schedule or []:
        if not slot.get("completed"):
            return slot.get("due_at")
    return None


def advance(item: SpacedRepetitionItem, *, was_correct: bool) -> str | None:
    """SR 아이템의 스케줄을 갱신하고 다음 due iso 문자열을 돌려준다.

    - 정답: 현재 슬롯 완료, 다음 슬롯이 다음 due.
    - 오답(SM-2 lapse): 첫 간격의 25%로 리셋, 현재 review index 를 0 으로.
    """

    schedule = list(item.schedule or [])
    now = datetime.now(timezone.utc)

    if was_correct:
        current_idx = int(item.current_review or 0)
        if current_idx < len(schedule):
            schedule[current_idx]["completed"] = True
            schedule[current_idx]["completed_at"] = now.isoformat()
            item.current_review = current_idx + 1
        # Small ease bump for a correct recall (SM-2 style, bounded).
        item.ease = min(2.5, float(item.ease or 1.0) + 0.05)
        item.schedule = schedule
        return next_due(schedule)

    # Lapse: reset to the first interval at 25% of its base duration.
    item.ease = max(0.5, float(item.ease or 1.0) - 0.2)
    base_steps = _intervals()
    first_minutes = float(base_steps[0]["minutes"]) * 0.25
    reset_due = (now + timedelta(minutes=first_minutes)).isoformat()
    new_schedule: list[dict[str, Any]] = [
        {
            "review_num": 1,
            "label": f"재시도 — {base_steps[0]['label']} (25%)",
            "due_at": reset_due,
            "completed": False,
        }
    ]
    for idx, step in enumerate(base_steps[1:], start=2):
        delta = timedelta(
            minutes=float(step["minutes"]) * _multiplier(item.difficulty) * float(item.ease)
        )
        new_schedule.append(
            {
                "review_num": idx,
                "label": step["label"],
                "due_at": (now + delta).isoformat(),
                "completed": False,
            }
        )
    item.schedule = new_schedule
    item.current_review = 0
    return reset_due

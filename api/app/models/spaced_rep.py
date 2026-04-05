"""Spaced Repetition items.

Grounded in Ebbinghaus's (1885) forgetting-curve work: reviews are scheduled at
expanding intervals so each recall attempt re-strengthens the memory trace
right as it is about to decay. The ``schedule`` JSON stores the full review
plan (e.g. 1d / 3d / 7d / 16d / 35d) with per-slot completion flags, and
``ease`` acts as an SM-2 style multiplier updated from recall quality.

Reference
---------
Ebbinghaus, H. (1885). *Über das Gedächtnis: Untersuchungen zur experimentellen
Psychologie*. Duncker & Humblot. (English: "Memory: A Contribution to
Experimental Psychology", 1913.)
"""

from __future__ import annotations

from datetime import datetime
from typing import Any

from sqlalchemy import JSON, DateTime, Float, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from ..database import Base


class SpacedRepetitionItem(Base):
    __tablename__ = "spaced_repetition_items"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    student_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), index=True, nullable=False
    )
    concept_name: Mapped[str] = mapped_column(String(255), nullable=False)
    review_question: Mapped[str] = mapped_column(Text, nullable=False)
    review_answer: Mapped[str] = mapped_column(Text, nullable=False)
    review_options: Mapped[list[Any] | dict[str, Any] | None] = mapped_column(
        JSON, nullable=True
    )
    difficulty: Mapped[str] = mapped_column(String(32), default="medium", nullable=False)
    # schedule: [{review_num, label, due_at, completed}]
    schedule: Mapped[list[dict[str, Any]]] = mapped_column(JSON, nullable=False, default=list)
    current_review: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    ease: Mapped[float] = mapped_column(Float, default=1.0, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

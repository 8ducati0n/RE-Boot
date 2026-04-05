"""Pydantic v2 schemas — API boundary DTOs.

각 스키마는 ORM 모델과 분리되어 있으며, `from_attributes=True` 로 SQLAlchemy
객체 → Pydantic 변환을 지원한다.
"""

from .user import UserCreate, UserLogin, UserOut, TokenOut
from .skill import SkillOut, StudentSkillOut, GapMapOut, CategoryStats, SkillGap
from .placement import (
    PlacementQuestionOut,
    PlacementSubmission,
    PlacementResultOut,
)
from .curriculum import CurriculumOut, CurriculumItemOut
from .recommendation import RecommendationOut, RecommendationAction
from .formative import (
    FormativeAssessmentOut,
    FormativeSubmission,
    FormativeResultOut,
)
from .spaced_rep import SpacedRepItemOut, SpacedRepAnswer
from .analytics import PulseCreate, AtRiskStudentOut, WeakZoneOut

__all__ = [
    "UserCreate",
    "UserLogin",
    "UserOut",
    "TokenOut",
    "SkillOut",
    "StudentSkillOut",
    "GapMapOut",
    "CategoryStats",
    "SkillGap",
    "PlacementQuestionOut",
    "PlacementSubmission",
    "PlacementResultOut",
    "CurriculumOut",
    "CurriculumItemOut",
    "RecommendationOut",
    "RecommendationAction",
    "FormativeAssessmentOut",
    "FormativeSubmission",
    "FormativeResultOut",
    "SpacedRepItemOut",
    "SpacedRepAnswer",
    "PulseCreate",
    "AtRiskStudentOut",
    "WeakZoneOut",
]

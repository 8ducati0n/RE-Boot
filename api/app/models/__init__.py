"""ORM models for RE:Boot.

Re-exports every model so `from app.models import *` and Alembic autogen work.
"""

from .user import User, UserRole
from .skill import Skill, StudentSkill, SkillStatus
from .placement import PlacementQuestion, PlacementResult
from .curriculum import (
    Curriculum,
    CurriculumItem,
    CurriculumStatus,
    CurriculumItemType,
    CurriculumItemStatus,
)
from .recommendation import (
    AIRecommendation,
    RecommendationType,
    RecommendationTier,
    RecommendationStatus,
)
from .formative import FormativeAssessment, FormativeResponse, FormativeStatus
from .spaced_rep import SpacedRepetitionItem
from .analytics import (
    WeakZoneSignal,
    WeakZoneTrigger,
    WeakZoneStatus,
    RiskSignal,
    RiskLevel,
    PeerGroup,
    PeerGroupStatus,
    PulseCheck,
    PulseType,
)
from .tutor import ChatSession, ChatMessage, ChatRole, DocumentChunk

__all__ = [
    "User",
    "UserRole",
    "Skill",
    "StudentSkill",
    "SkillStatus",
    "PlacementQuestion",
    "PlacementResult",
    "Curriculum",
    "CurriculumItem",
    "CurriculumStatus",
    "CurriculumItemType",
    "CurriculumItemStatus",
    "AIRecommendation",
    "RecommendationType",
    "RecommendationTier",
    "RecommendationStatus",
    "FormativeAssessment",
    "FormativeResponse",
    "FormativeStatus",
    "SpacedRepetitionItem",
    "WeakZoneSignal",
    "WeakZoneTrigger",
    "WeakZoneStatus",
    "RiskSignal",
    "RiskLevel",
    "PeerGroup",
    "PeerGroupStatus",
    "PulseCheck",
    "PulseType",
    "ChatSession",
    "ChatMessage",
    "ChatRole",
    "DocumentChunk",
]

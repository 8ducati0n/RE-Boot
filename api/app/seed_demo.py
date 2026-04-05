"""Seed demo scenario data (LLM-independent).

Run from inside the api container:
    docker compose exec -T api python -m app.seed_demo

Idempotent: deletes existing demo rows first, then re-inserts.
Covers everything the demo video needs EXCEPT the Agentic RAG tutor chat
(which requires a real OpenAI key).

Content:
- 20 Skills (Python / Django / React / DB / AI basics)
- 15 PlacementQuestions
- Demo student (student@demo.re) PlacementResult + 20 StudentSkill rows (gap map)
- 1 Curriculum + 10 CurriculumItems
- 4 SpacedRepetitionItems (using the dynamic scheduler service)
- 3 WeakZoneSignals
- 1 RiskSignal (MEDIUM)
- 8 PulseChecks (mix of UNDERSTAND/CONFUSED)
- 3 AIRecommendations (PENDING_APPROVAL — SUPPLEMENT / REVIEW_ROUTE / GROUP_STUDY)
  → instructor HITL 게이트 시연용
"""

from __future__ import annotations

import asyncio
from datetime import datetime, timedelta, timezone

from sqlalchemy import delete, select

from .database import AsyncSessionLocal
from .models.analytics import (
    PulseCheck,
    PulseType,
    RiskLevel,
    RiskSignal,
    WeakZoneSignal,
    WeakZoneStatus,
    WeakZoneTrigger,
)
from .models.curriculum import (
    Curriculum,
    CurriculumItem,
    CurriculumItemStatus,
    CurriculumItemType,
    CurriculumStatus,
)
from .models.placement import PlacementQuestion, PlacementResult
from .models.recommendation import (
    AIRecommendation,
    RecommendationStatus,
    RecommendationTier,
    RecommendationType,
)
from .models.skill import Skill, SkillStatus, StudentSkill
from .models.spaced_rep import SpacedRepetitionItem
from .models.user import User, UserRole
from .services.mastery.spaced_repetition import build_schedule


# ═══════════════════════════════════════════════════════════════════════════
# 1. Skills — 20개, 5개 카테고리 × 4개 레벨
# ═══════════════════════════════════════════════════════════════════════════

SKILLS: list[dict] = [
    # Python
    {"name": "Python 변수·자료형", "category": "Python", "difficulty_level": 1,
     "description": "int, str, list, dict, tuple 기본 타입 이해", "order": 1},
    {"name": "Python 함수·스코프", "category": "Python", "difficulty_level": 1,
     "description": "def, return, 인자, 스코프 규칙", "order": 2},
    {"name": "Python OOP", "category": "Python", "difficulty_level": 2,
     "description": "클래스, 상속, 다형성, 매직 메서드", "order": 3},
    {"name": "Python 비동기 (asyncio)", "category": "Python", "difficulty_level": 3,
     "description": "async/await, 코루틴, 이벤트 루프", "order": 4},

    # Django
    {"name": "Django 모델·ORM", "category": "Django", "difficulty_level": 2,
     "description": "Model 정의, QuerySet, 마이그레이션", "order": 5},
    {"name": "Django Views·URL", "category": "Django", "difficulty_level": 2,
     "description": "FBV, CBV, urlconf 라우팅", "order": 6},
    {"name": "Django Templates", "category": "Django", "difficulty_level": 1,
     "description": "템플릿 태그, 필터, 상속", "order": 7},
    {"name": "Django REST Framework", "category": "Django", "difficulty_level": 3,
     "description": "Serializer, ViewSet, Router, 인증", "order": 8},

    # Database
    {"name": "SQL 기본 (SELECT/WHERE)", "category": "Database", "difficulty_level": 1,
     "description": "기본 쿼리 작성, 조건절", "order": 9},
    {"name": "SQL JOIN", "category": "Database", "difficulty_level": 2,
     "description": "INNER/LEFT/RIGHT/FULL OUTER JOIN", "order": 10},
    {"name": "인덱스·쿼리 최적화", "category": "Database", "difficulty_level": 3,
     "description": "B-Tree, EXPLAIN, 커버링 인덱스", "order": 11},
    {"name": "트랜잭션·격리 수준", "category": "Database", "difficulty_level": 3,
     "description": "ACID, READ COMMITTED, SERIALIZABLE", "order": 12},

    # Frontend / React
    {"name": "JSX 문법", "category": "React", "difficulty_level": 1,
     "description": "표현식, 이벤트 바인딩, 조건 렌더링", "order": 13},
    {"name": "React Hooks", "category": "React", "difficulty_level": 2,
     "description": "useState, useEffect, 의존성 배열", "order": 14},
    {"name": "상태 관리 (Context/Zustand)", "category": "React", "difficulty_level": 2,
     "description": "전역 상태, provider 패턴", "order": 15},
    {"name": "성능 최적화 (memo/callback)", "category": "React", "difficulty_level": 3,
     "description": "리렌더링 제어, memoization", "order": 16},

    # AI/ML 기초
    {"name": "지도학습 vs 비지도학습", "category": "AI/ML", "difficulty_level": 1,
     "description": "지도/비지도/강화학습 분류", "order": 17},
    {"name": "과적합·정규화", "category": "AI/ML", "difficulty_level": 2,
     "description": "L1/L2, Dropout, Early Stopping", "order": 18},
    {"name": "경사하강법·학습률", "category": "AI/ML", "difficulty_level": 2,
     "description": "GD/SGD/Adam, 학습률 스케줄링", "order": 19},
    {"name": "Transformer 구조", "category": "AI/ML", "difficulty_level": 3,
     "description": "self-attention, multi-head, positional encoding", "order": 20},
]


# ═══════════════════════════════════════════════════════════════════════════
# 2. Placement Questions — 15개 (Lv1 5, Lv2 7, Lv3 3)
# ═══════════════════════════════════════════════════════════════════════════

PLACEMENT_QUESTIONS: list[dict] = [
    # Lv1 (5)
    {
        "question_text": "다음 중 Python의 가변(mutable) 자료형은 무엇인가요?",
        "options": ["1) tuple", "2) str", "3) list", "4) int"],
        "correct_answer": "3",
        "category": "Python", "difficulty": 1, "order": 1,
    },
    {
        "question_text": "다음 SQL 쿼리의 결과는? `SELECT * FROM users WHERE age > 30`",
        "options": ["1) age가 30 이상인 모든 사용자", "2) age가 30 초과인 모든 사용자",
                    "3) 30번째 사용자", "4) 에러"],
        "correct_answer": "2",
        "category": "Database", "difficulty": 1, "order": 2,
    },
    {
        "question_text": "JSX에서 JavaScript 표현식을 삽입하려면?",
        "options": ["1) {{ expr }}", "2) { expr }", "3) <%= expr %>", "4) [[ expr ]]"],
        "correct_answer": "2",
        "category": "React", "difficulty": 1, "order": 3,
    },
    {
        "question_text": "지도학습(Supervised Learning)의 특징은?",
        "options": ["1) 정답 레이블이 있는 데이터로 학습",
                    "2) 보상 신호만으로 학습",
                    "3) 정답 없이 패턴을 찾음",
                    "4) 사람이 직접 규칙 작성"],
        "correct_answer": "1",
        "category": "AI/ML", "difficulty": 1, "order": 4,
    },
    {
        "question_text": "Django Template에서 변수를 출력하려면?",
        "options": ["1) <%= var %>", "2) { var }", "3) {{ var }}", "4) ${var}"],
        "correct_answer": "3",
        "category": "Django", "difficulty": 1, "order": 5,
    },

    # Lv2 (7)
    {
        "question_text": "Python에서 `@property` 데코레이터의 주 목적은?",
        "options": ["1) 메서드를 속성처럼 접근 가능하게 함",
                    "2) 클래스 메서드 정의",
                    "3) 정적 메서드 정의",
                    "4) 추상 메서드 정의"],
        "correct_answer": "1",
        "category": "Python", "difficulty": 2, "order": 6,
    },
    {
        "question_text": "Django QuerySet에서 N+1 문제를 해결하는 주요 메서드는?",
        "options": ["1) filter() + exclude()",
                    "2) select_related() / prefetch_related()",
                    "3) order_by() + distinct()",
                    "4) values() + values_list()"],
        "correct_answer": "2",
        "category": "Django", "difficulty": 2, "order": 7,
    },
    {
        "question_text": "LEFT JOIN의 결과에 포함되는 행은?",
        "options": ["1) 양쪽에 모두 매칭되는 행만",
                    "2) 왼쪽 테이블의 모든 행 + 매칭되는 오른쪽 행",
                    "3) 오른쪽 테이블의 모든 행 + 매칭되는 왼쪽 행",
                    "4) 양쪽 테이블의 모든 행"],
        "correct_answer": "2",
        "category": "Database", "difficulty": 2, "order": 8,
    },
    {
        "question_text": "React의 useEffect에서 의존성 배열이 빈 배열 `[]` 이면?",
        "options": ["1) 매 렌더링마다 실행",
                    "2) 한 번도 실행되지 않음",
                    "3) 컴포넌트 마운트 시 한 번만 실행",
                    "4) 언마운트 시 한 번 실행"],
        "correct_answer": "3",
        "category": "React", "difficulty": 2, "order": 9,
    },
    {
        "question_text": "L2 정규화(Ridge)가 과적합을 완화하는 원리는?",
        "options": ["1) 가중치의 절댓값 합에 패널티를 부여",
                    "2) 가중치의 제곱 합에 패널티를 부여",
                    "3) 일부 뉴런을 무작위로 끔",
                    "4) 학습 데이터를 증강"],
        "correct_answer": "2",
        "category": "AI/ML", "difficulty": 2, "order": 10,
    },
    {
        "question_text": "Django Model 필드에서 `on_delete=models.CASCADE`의 의미는?",
        "options": ["1) 참조된 객체가 삭제되면 이 객체도 함께 삭제",
                    "2) 참조된 객체는 삭제 불가",
                    "3) 참조된 객체가 삭제되면 FK를 NULL로 설정",
                    "4) 참조된 객체의 기본값 사용"],
        "correct_answer": "1",
        "category": "Django", "difficulty": 2, "order": 11,
    },
    {
        "question_text": "Python의 GIL(Global Interpreter Lock) 때문에 제약되는 것은?",
        "options": ["1) 메모리 사용량",
                    "2) 단일 프로세스 내 CPU-bound 병렬 처리",
                    "3) I/O-bound 작업",
                    "4) 함수 호출 깊이"],
        "correct_answer": "2",
        "category": "Python", "difficulty": 2, "order": 12,
    },

    # Lv3 (3)
    {
        "question_text": "Transformer의 Self-Attention이 해결한 가장 핵심적인 RNN의 한계는?",
        "options": ["1) 파라미터 수 과다",
                    "2) 장거리 의존성 학습의 순차 의존",
                    "3) 학습률 스케줄링 부재",
                    "4) GPU 메모리 부족"],
        "correct_answer": "2",
        "category": "AI/ML", "difficulty": 3, "order": 13,
    },
    {
        "question_text": "PostgreSQL에서 `READ COMMITTED` 격리 수준에서 발생할 수 있는 현상은?",
        "options": ["1) Dirty Read",
                    "2) Non-repeatable Read / Phantom Read",
                    "3) 데드락만 발생",
                    "4) 아무 이상 현상도 없음"],
        "correct_answer": "2",
        "category": "Database", "difficulty": 3, "order": 14,
    },
    {
        "question_text": "Django REST Framework의 `ViewSet` + `Router`를 썼을 때의 이점은?",
        "options": ["1) URL 패턴 자동 생성 + CRUD 액션 표준화",
                    "2) 데이터베이스 쿼리 최적화",
                    "3) 인증 성능 향상",
                    "4) 템플릿 렌더링 가속"],
        "correct_answer": "1",
        "category": "Django", "difficulty": 3, "order": 15,
    },
]


# ═══════════════════════════════════════════════════════════════════════════
# 3. 데모 학생의 Placement 답안 + 결과
# ═══════════════════════════════════════════════════════════════════════════
# student@demo.re 가 15문제를 풀었다고 가정.
# 정답 8개 (8/15 = 53%) → level 2 (medium) 판정
# 카테고리별:
#  - Python: 3/3 맞음 (OWNED/LEARNING 쪽)
#  - Django: 2/4 (GAP 이 있음)
#  - Database: 2/3 (LEARNING)
#  - React: 1/2 (LEARNING)
#  - AI/ML: 0/3 (GAP 강함)

STUDENT_ANSWERS = [
    # (question_order, chosen, correct?)
    (1, "3", True),   # Python 가변형 ✅
    (2, "2", True),   # SQL WHERE ✅
    (3, "2", True),   # JSX ✅
    (4, "3", False),  # 지도학습 ❌ (정답 1, 선택 3)
    (5, "3", True),   # Django template ✅
    (6, "1", True),   # @property ✅
    (7, "1", False),  # N+1 문제 ❌ (정답 2)
    (8, "2", True),   # LEFT JOIN ✅
    (9, "3", True),   # useEffect [] ✅
    (10, "1", False), # L2 정규화 ❌
    (11, "1", True),  # CASCADE ✅
    (12, "3", False), # GIL ❌
    (13, "3", False), # Transformer ❌
    (14, "1", False), # READ COMMITTED ❌
    (15, "1", True),  # DRF ViewSet ✅
]

STUDENT_CATEGORY_SCORES = {
    "Python":   {"correct": 3, "total": 3, "ratio": 1.00},
    "Django":   {"correct": 3, "total": 4, "ratio": 0.75},
    "Database": {"correct": 2, "total": 3, "ratio": 0.67},
    "React":    {"correct": 2, "total": 2, "ratio": 1.00},
    "AI/ML":    {"correct": 0, "total": 3, "ratio": 0.00},
}


# ═══════════════════════════════════════════════════════════════════════════
# 4. StudentSkill 설정 — 갭맵
# ═══════════════════════════════════════════════════════════════════════════
# OWNED  : 완전 숙달 (progress ≥ 80)
# LEARNING: 학습 중 (40~79)
# GAP    : 아예 모름 (< 20)
# WEAK   : 약점 (20~39)

STUDENT_SKILL_STATES = [
    # (skill_name, status, progress)
    ("Python 변수·자료형",         "OWNED",    95),
    ("Python 함수·스코프",         "OWNED",    88),
    ("Python OOP",                 "LEARNING", 72),
    ("Python 비동기 (asyncio)",    "WEAK",     35),
    ("Django 모델·ORM",            "LEARNING", 60),
    ("Django Views·URL",           "LEARNING", 55),
    ("Django Templates",           "OWNED",    85),
    ("Django REST Framework",      "GAP",      10),
    ("SQL 기본 (SELECT/WHERE)",    "OWNED",    90),
    ("SQL JOIN",                   "LEARNING", 68),
    ("인덱스·쿼리 최적화",         "GAP",      5),
    ("트랜잭션·격리 수준",         "WEAK",     25),
    ("JSX 문법",                   "OWNED",    92),
    ("React Hooks",                "LEARNING", 58),
    ("상태 관리 (Context/Zustand)", "WEAK",    30),
    ("성능 최적화 (memo/callback)", "GAP",      0),
    ("지도학습 vs 비지도학습",     "WEAK",     20),
    ("과적합·정규화",              "GAP",      0),
    ("경사하강법·학습률",          "GAP",      0),
    ("Transformer 구조",           "GAP",      0),
]


# ═══════════════════════════════════════════════════════════════════════════
# 5. Curriculum + Items — 10개 (갭맵 기반)
# ═══════════════════════════════════════════════════════════════════════════

CURRICULUM_ITEMS = [
    # (order, title, type, linked_skill, status)
    (1, "ML 기초 — 지도/비지도학습 개요",         "LECTURE", "지도학습 vs 비지도학습", "COMPLETED"),
    (2, "과적합과 정규화 집중 강의",              "LECTURE", "과적합·정규화",         "IN_PROGRESS"),
    (3, "Python 비동기 심화 (asyncio)",            "SUPPLEMENT", "Python 비동기 (asyncio)", "LOCKED"),
    (4, "Django REST Framework 부트캠프",          "LECTURE", "Django REST Framework", "LOCKED"),
    (5, "React 상태 관리 — Context vs Zustand",   "LECTURE", "상태 관리 (Context/Zustand)", "LOCKED"),
    (6, "Transformer 구조 해부",                   "LECTURE", "Transformer 구조",     "LOCKED"),
    (7, "[복습] Python OOP 체크포인트",           "REVIEW",  "Python OOP",           "LOCKED"),
    (8, "[보충] 인덱스와 EXPLAIN 실습",           "SUPPLEMENT", "인덱스·쿼리 최적화", "LOCKED"),
    (9, "경사하강법 미니 프로젝트",                "PROJECT", "경사하강법·학습률",    "LOCKED"),
    (10, "최종 포트폴리오 프로젝트",                "PROJECT", None,                  "LOCKED"),
]


# ═══════════════════════════════════════════════════════════════════════════
# 6. Seeder 실행
# ═══════════════════════════════════════════════════════════════════════════

async def seed() -> None:
    async with AsyncSessionLocal() as db:
        print("[seed] 시작 — 데모 시나리오 데이터 로드")

        # ── 0) 데모 학생 확인
        res = await db.execute(select(User).where(User.email == "student@demo.re"))
        student = res.scalar_one_or_none()
        if student is None:
            print("[seed] ⚠️  student@demo.re 없음. app.initial_data 먼저 실행되었는지 확인하세요.")
            return
        print(f"[seed] 데모 학생: id={student.id}, email={student.email}")

        # 강사 조회 (AIRecommendation.reviewed_by 필드 참조용이 아니라 제안 대상 분리용)
        res = await db.execute(select(User).where(User.email == "instructor@demo.re"))
        instructor = res.scalar_one_or_none()

        # ── 1) 기존 데모 데이터 삭제 (idempotent)
        print("[seed] 기존 데모 데이터 삭제 …")
        await db.execute(delete(CurriculumItem))
        await db.execute(delete(Curriculum))
        await db.execute(delete(StudentSkill).where(StudentSkill.student_id == student.id))
        await db.execute(delete(PlacementResult).where(PlacementResult.student_id == student.id))
        await db.execute(delete(PlacementQuestion))
        await db.execute(delete(Skill))
        await db.execute(delete(SpacedRepetitionItem).where(SpacedRepetitionItem.student_id == student.id))
        await db.execute(delete(WeakZoneSignal).where(WeakZoneSignal.student_id == student.id))
        await db.execute(delete(RiskSignal).where(RiskSignal.student_id == student.id))
        await db.execute(delete(PulseCheck).where(PulseCheck.student_id == student.id))
        await db.execute(delete(AIRecommendation).where(AIRecommendation.target_student_id == student.id))
        await db.commit()

        # ── 2) Skills 20개
        print(f"[seed] Skills {len(SKILLS)}개 삽입")
        skill_map: dict[str, Skill] = {}
        for spec in SKILLS:
            s = Skill(**spec)
            db.add(s)
            skill_map[spec["name"]] = s
        await db.flush()

        # ── 3) Placement Questions 15개
        print(f"[seed] PlacementQuestion {len(PLACEMENT_QUESTIONS)}개 삽입")
        q_map: dict[int, PlacementQuestion] = {}
        for spec in PLACEMENT_QUESTIONS:
            q = PlacementQuestion(**spec)
            db.add(q)
            q_map[spec["order"]] = q
        await db.flush()

        # ── 4) 데모 학생의 PlacementResult
        print("[seed] PlacementResult (데모 학생)")
        answers_payload = [
            {
                "question_order": order,
                "question_id": q_map[order].id,
                "chosen": chosen,
                "is_correct": correct,
            }
            for (order, chosen, correct) in STUDENT_ANSWERS
        ]
        total_correct = sum(1 for (_, _, c) in STUDENT_ANSWERS if c)
        ratio = total_correct / len(STUDENT_ANSWERS)
        level = 3 if ratio >= 0.7 else (2 if ratio >= 0.4 else 1)
        pr = PlacementResult(
            student_id=student.id,
            level=level,
            score=total_correct,
            total_questions=len(STUDENT_ANSWERS),
            answers=answers_payload,
            category_scores=STUDENT_CATEGORY_SCORES,
        )
        db.add(pr)
        await db.flush()
        print(f"       → score={total_correct}/{len(STUDENT_ANSWERS)}, level={level}")

        # ── 5) StudentSkill 20개 (갭맵)
        print(f"[seed] StudentSkill {len(STUDENT_SKILL_STATES)}개 삽입")
        status_map = {
            "OWNED": SkillStatus.OWNED,
            "LEARNING": SkillStatus.LEARNING,
            "GAP": SkillStatus.GAP,
            "WEAK": SkillStatus.WEAK,
        }
        for (skill_name, st, prog) in STUDENT_SKILL_STATES:
            if skill_name not in skill_map:
                print(f"  ! skill '{skill_name}' 없음, skip")
                continue
            ss = StudentSkill(
                student_id=student.id,
                skill_id=skill_map[skill_name].id,
                status=status_map[st],
                progress=prog,
            )
            db.add(ss)

        # ── 6) Curriculum + CurriculumItem
        print(f"[seed] Curriculum + {len(CURRICULUM_ITEMS)} items")
        curriculum = Curriculum(
            student_id=student.id,
            title="[맞춤 커리큘럼] Python/Django 백엔드 + ML 기초",
            status=CurriculumStatus.ACTIVE,
        )
        db.add(curriculum)
        await db.flush()

        type_map = {
            "LECTURE": CurriculumItemType.LECTURE,
            "SUPPLEMENT": CurriculumItemType.SUPPLEMENT,
            "REVIEW": CurriculumItemType.REVIEW,
            "PROJECT": CurriculumItemType.PROJECT,
        }
        item_status_map = {
            "COMPLETED":   CurriculumItemStatus.COMPLETED,
            "IN_PROGRESS": CurriculumItemStatus.IN_PROGRESS,
            # 실제 enum: PENDING / IN_PROGRESS / COMPLETED / SKIPPED
            "LOCKED":    CurriculumItemStatus.PENDING,
            "AVAILABLE": CurriculumItemStatus.PENDING,
        }
        for (order, title, t, skill_name, st) in CURRICULUM_ITEMS:
            skill_id = skill_map[skill_name].id if skill_name and skill_name in skill_map else None
            ci = CurriculumItem(
                curriculum_id=curriculum.id,
                title=title,
                item_type=type_map[t],
                skill_id=skill_id,
                order=order,
                status=item_status_map[st],
            )
            db.add(ci)

        # ── 7) SpacedRepetitionItem 4개 (build_schedule 사용)
        print("[seed] SpacedRepetitionItem 4개 (동적 스케줄)")
        now = datetime.now(timezone.utc)
        sr_specs = [
            {
                "concept_name": "Python GIL 제약",
                "review_question": "Python GIL 때문에 어떤 작업에 병렬 처리 제약이 있나요?",
                "review_answer": "단일 프로세스 내 CPU-bound 병렬",
                "review_options": ["I/O-bound", "메모리 할당", "CPU-bound 병렬", "파일 I/O"],
                "difficulty": "medium",
                "ease": 1.0,
            },
            {
                "concept_name": "L2 정규화 (Ridge)",
                "review_question": "L2 정규화가 과적합을 완화하는 원리는?",
                "review_answer": "가중치의 제곱 합에 패널티",
                "review_options": ["절댓값 합에 패널티", "제곱 합에 패널티", "Dropout", "데이터 증강"],
                "difficulty": "hard",
                "ease": 0.85,
            },
            {
                "concept_name": "Transformer Self-Attention",
                "review_question": "Self-Attention이 해결한 RNN의 핵심 한계는?",
                "review_answer": "장거리 의존성 학습의 순차 의존",
                "review_options": ["파라미터 과다", "순차 의존", "학습률", "GPU 메모리"],
                "difficulty": "hard",
                "ease": 0.8,
            },
            {
                "concept_name": "Django N+1 문제",
                "review_question": "QuerySet에서 N+1 쿼리 문제를 해결하는 메서드는?",
                "review_answer": "select_related / prefetch_related",
                "review_options": ["filter/exclude", "select/prefetch_related", "order_by", "values"],
                "difficulty": "medium",
                "ease": 0.95,
            },
        ]
        for i, spec in enumerate(sr_specs):
            # 첫 두 개는 "오늘 복습 due", 나머지는 미래
            base_now = now - timedelta(minutes=15) if i < 2 else now
            schedule = build_schedule(base_now, difficulty=spec["difficulty"], ease=spec["ease"])
            sr = SpacedRepetitionItem(
                student_id=student.id,
                schedule=schedule,
                **spec,
            )
            db.add(sr)

        # ── 8) WeakZoneSignal 3개
        print("[seed] WeakZoneSignal 3개")
        weak_zones = [
            {
                "concept": "Django REST Framework",
                "trigger_type": WeakZoneTrigger.QUIZ_WRONG,
                "trigger_detail": {"quiz_ids": [7, 15], "consecutive_wrong": 2, "topic": "DRF ViewSet"},
                "status": WeakZoneStatus.DETECTED,
            },
            {
                "concept": "과적합·정규화",
                "trigger_type": WeakZoneTrigger.QUIZ_WRONG,
                "trigger_detail": {"quiz_ids": [10, 13], "consecutive_wrong": 2, "topic": "L2 정규화"},
                "status": WeakZoneStatus.DETECTED,
            },
            {
                "concept": "트랜잭션·격리 수준",
                "trigger_type": WeakZoneTrigger.PULSE_CONFUSED,
                "trigger_detail": {"confused_count": 3, "session_id": 1, "topic": "READ COMMITTED"},
                "status": WeakZoneStatus.DETECTED,
            },
        ]
        for wz in weak_zones:
            db.add(WeakZoneSignal(student_id=student.id, **wz))

        # ── 9) RiskSignal 1개 (MEDIUM)
        print("[seed] RiskSignal (MEDIUM)")
        db.add(RiskSignal(
            student_id=student.id,
            level=RiskLevel.MEDIUM,
            factors={
                "days_inactive": 0,
                "recent_quiz_avg": 53,
                "consecutive_failures": 2,
                "weak_zones_open": 3,
                "reasons": ["recent_quiz_avg<60", "multiple_weak_zones"],
            },
        ))

        # ── 10) PulseCheck 8개 (최근 강의 이해도)
        print("[seed] PulseCheck 8개 (UNDERSTAND 5 / CONFUSED 3)")
        pulses = [
            (PulseType.UNDERSTAND, 45),  # 45분 전
            (PulseType.UNDERSTAND, 40),
            (PulseType.CONFUSED,   35),
            (PulseType.CONFUSED,   32),
            (PulseType.UNDERSTAND, 25),
            (PulseType.CONFUSED,   20),
            (PulseType.UNDERSTAND, 10),
            (PulseType.UNDERSTAND, 5),
        ]
        for (ptype, minutes_ago) in pulses:
            p = PulseCheck(
                student_id=student.id,
                pulse_type=ptype,
            )
            db.add(p)
            await db.flush()
            # created_at 조작 (선택적)

        # ── 11) AIRecommendation 3개 (PENDING_APPROVAL)
        # 교수자 대시보드 HITL 게이트 시연용 — 실제 LLM 없이 사전 정의된 rationale
        print("[seed] AIRecommendation 3개 (PENDING_APPROVAL)")
        recs = [
            {
                "type": RecommendationType.SUPPLEMENT,
                "tier": RecommendationTier.MANUAL,
                "status": RecommendationStatus.PENDING_APPROVAL,
                "target_student_id": student.id,
                "payload": {
                    "title": "과적합·정규화 집중 보충 자료",
                    "source_materials": ["Goodfellow et al. 2016, Ch.7", "CS231n Lecture 7"],
                    "estimated_minutes": 45,
                },
                "reason": "최근 ML 기초 진단에서 AI/ML 카테고리 0/3 (0%). 특히 L2 정규화 관련 문항 오답. 현재 학생이 '과적합·정규화' 강의를 수강 중이므로 보조 자료 제안.",
                "evidence": {
                    "placement_wrong_quiz_ids": [10, 13],
                    "category_score": {"AI/ML": 0},
                    "weak_zone_id": 2,
                    "current_curriculum_item": 2,
                },
                "created_by_model": "gpt-4o-mini (demo seed)",
                "grounding_score": 0.82,
            },
            {
                "type": RecommendationType.REVIEW_ROUTE,
                "tier": RecommendationTier.MANUAL,
                "status": RecommendationStatus.PENDING_APPROVAL,
                "target_student_id": student.id,
                "payload": {
                    "title": "Python 비동기 심화 전, OOP 복습 체크포인트",
                    "route": ["Python OOP 복습", "데코레이터 개념", "async/await 기초"],
                    "estimated_minutes": 60,
                },
                "reason": "Python 비동기(asyncio) 스킬이 WEAK(35%)이고, 선수 지식인 OOP가 LEARNING(72%) 상태. asyncio 강의 진입 전 OOP 개념 복습이 ZPD 원칙에 부합.",
                "evidence": {
                    "prereq_skill_id": 3,
                    "target_skill_id": 4,
                    "zpd_gap": 37,
                    "current_curriculum_item": 3,
                },
                "created_by_model": "gpt-4o-mini (demo seed)",
                "grounding_score": 0.76,
            },
            {
                "type": RecommendationType.GROUP_STUDY,
                "tier": RecommendationTier.MANUAL,
                "status": RecommendationStatus.PENDING_APPROVAL,
                "target_student_id": student.id,
                "payload": {
                    "title": "DRF 그룹 스터디 편성 제안",
                    "group_size": 3,
                    "candidate_member_ids": [student.id, 4, 5],
                    "shared_weak_concept": "Django REST Framework",
                    "suggested_duration": "2주, 주 2회 1시간",
                },
                "reason": "'Django REST Framework' 스킬에서 3명의 학생이 공통 GAP(progress ≤ 15%). 박진아·김지은(2024)의 연구에서 동료 관계가 이탈 방지 1순위(17.65%)로 보고되어, 데이터 기반 전략적 그룹 편성 권장.",
                "evidence": {
                    "shared_concept": "Django REST Framework",
                    "members": [
                        {"student_id": student.id, "progress": 10},
                        {"student_id": 4, "progress": 5},
                        {"student_id": 5, "progress": 15},
                    ],
                    "clustering_method": "cosine_similarity_on_weak_zones",
                    "similarity_avg": 0.87,
                    "citation": "박진아·김지은 (2024). 컴퓨터교육학회 논문지, 27(1).",
                },
                "created_by_model": "gpt-4o-mini (demo seed)",
                "grounding_score": 0.91,
            },
        ]
        for rec in recs:
            db.add(AIRecommendation(**rec))

        await db.commit()
        print("[seed] ✅ 완료")

        # 요약
        print("\n══ 요약 ══")
        print(f"  Skills              : {len(SKILLS)}")
        print(f"  PlacementQuestions  : {len(PLACEMENT_QUESTIONS)}")
        print(f"  PlacementResults    : 1 (student {student.id})")
        print(f"  StudentSkills       : {len(STUDENT_SKILL_STATES)}")
        print(f"  Curriculum          : 1 + {len(CURRICULUM_ITEMS)} items")
        print(f"  SpacedRepetitionItem: {len(sr_specs)}")
        print(f"  WeakZoneSignal      : {len(weak_zones)}")
        print(f"  RiskSignal          : 1 (MEDIUM)")
        print(f"  PulseCheck          : {len(pulses)}")
        print(f"  AIRecommendation    : {len(recs)} (all PENDING_APPROVAL)")


if __name__ == "__main__":
    asyncio.run(seed())

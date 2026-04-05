# 02. 교육공학 이론 ↔ 기능 1:1 매핑

> RE:Boot의 학술적 가치는 고전 교육학 이론을 현대 AI 기술로 **정확히 1:1 매핑**하여 구현한 점에 있다.
> 심사위원이 "이 이론이 어디에 구현되어 있나요?"라고 물으면 **파일 경로와 라인 번호**로 답할 수 있어야 한다.

---

## 🏛️ 이론 통합 원칙

전통적 AI 교육 플랫폼은 **단일 이론**(예: 적응형 난이도, 베이지안 지식 추적)에 기반하거나 이론적 근거 없이 엔지니어링 중심으로 만들어진다.

RE:Boot는 다음 원칙을 따른다:

1. **하나의 이론 → 하나의 모듈** — 코드 디렉토리 이름이 이론적 역할을 반영
2. **진단 → 개입 → 보정 순환** — 이론들이 서로 고립되지 않고 데이터 루프로 연결
3. **이론의 메타데이터 보존** — 각 모델·함수 주석에 참조 논문 기재
4. **Explainability 내장** — 이론적 판단 근거를 DB 필드(`reason`, `evidence`)로 저장

---

## 📚 5+1 이론 매핑

### ① Vygotsky 근접발달영역 (Zone of Proximal Development, ZPD)

- **원저**: Vygotsky, L. S. (1978). *Mind in Society: The Development of Higher Psychological Processes*. Harvard University Press.
- **핵심 개념**: 학습자가 **독립적으로 해결할 수 있는 수준**과 **도움을 받아 도달 가능한 수준** 사이의 간격이 학습 잠재력의 영역이다.

| RE:Boot 구현 | 파일 |
|---|---|
| **Skill 모델**: 부트캠프 기술 스택을 `difficulty_level(1=기초, 2=중급, 3=심화)`로 정량화 | `api/app/models/skill.py` |
| **PlacementQuestion**: 각 문항이 난이도 레벨에 속함 | `api/app/models/placement.py` |
| **PlacementResult.level 판정**: 정답률 기반 `ratio≥0.7→Lv3, ≥0.4→Lv2, else→Lv1` | `api/app/routers/diagnose.py` |
| **StudentSkill.status**: 각 학습자의 각 스킬 상태를 `OWNED/LEARNING/GAP`으로 분류 → "현재 수준 vs 잠재 수준" 간극을 정량화 | `api/app/models/skill.py` |
| **GapMap 시각화**: SVG 도넛으로 카테고리별 보유/갭/학습중 비율 표시 | `web/src/routes/gap-map/+page.svelte` |
| **스캐폴딩 트리거**: 갭 영역에 대해 자동으로 보충 콘텐츠 추천 | `api/app/services/adapt/curriculum.py` |

**ZPD ↔ 기능 매핑의 정확도**: 학습자의 "현재 레벨"은 `PlacementResult.level`, "도달 가능 레벨"은 `StudentSkill.status=LEARNING`, 그 사이의 **간극**이 바로 GapMap. 코드가 이론 정의를 그대로 반영.

---

### ② Bloom 완전학습 모형 (Mastery Learning)

- **원저**: Bloom, B. S. (1968). Learning for Mastery. *Evaluation Comment*, 1(2), 1-12.
- **핵심 개념**: 모든 학습자는 충분한 시간과 적절한 피드백이 주어지면 **숙달**(80-90% 정답)에 도달할 수 있다. 숙달하지 못한 단위는 보충 학습으로 해결한다.

| RE:Boot 구현 | 파일 |
|---|---|
| **FormativeAssessment**: 각 단위 학습 후 형성평가 자동 생성 (GPT-4o-mini로 노트→문항 변환) | `api/app/models/formative.py` |
| **FormativeResponse.score**: 개별 응답의 숙달도 기록 | `api/app/models/formative.py` |
| **오답→보충 루프**: 오답 개념은 자동으로 `SpacedRepetitionItem`으로 등록 | `api/app/routers/mastery.py` |
| **GapMap 자동 업데이트**: 오답 시 `StudentSkill.status=GAP`으로 되돌려 다음 진단에 반영 | `api/app/services/mastery/feedback_loop.py` |

**Bloom ↔ 기능 매핑의 정확도**: "숙달해야 다음 단위로" 원칙은 `FormativeResponse → SpacedRepetitionItem` 루프로 구현. 숙달하지 못하면 다음 진도로 넘어가되, 간격 반복 큐에 계속 나타남.

---

### ③ Ebbinghaus 망각곡선 (Forgetting Curve)

- **원저**: Ebbinghaus, H. (1885). *Über das Gedächtnis: Untersuchungen zur experimentellen Psychologie*. Leipzig: Duncker & Humblot.
- **현대 응용**: SM-2 (Wozniak, 1990), Leitner system, Anki.
- **핵심 개념**: 학습 직후 기억은 기하급수적으로 감소한다. **기하 확장 간격**으로 복습하면 장기 기억이 안정화된다.

| RE:Boot 구현 | 파일 |
|---|---|
| **SpacedRepetitionItem.schedule**: JSONField에 `[{review_num, label, due_at, completed}]` 저장 | `api/app/models/spaced_rep.py` |
| **기본 간격 시퀀스**: `10분 / 1일 / 1주 / 1개월 / 6개월` (settings로 오버라이드 가능) | `api/app/services/mastery/spaced_repetition.py` |
| **난이도 배수**: easy×1.3, medium×1.0, hard×0.7 — 어려운 문항은 더 자주 복습 | `api/app/services/mastery/spaced_repetition.py:DIFFICULTY_MULTIPLIERS` |
| **정답률 적응 (SM-2 lite)**: 오답 시 첫 간격의 25%로 리셋 (lapse 처리), 정답 시 다음 주기 진행 | `api/app/services/mastery/spaced_repetition.py:advance()` |
| **개인화 ease factor**: 학습자별 과거 복습 성공률로 보정 (옵션) | `api/app/services/mastery/spaced_repetition.py:build_schedule(ease=)` |

**Ebbinghaus ↔ 기능 매핑의 정확도**: 고정 5단계 하드코딩이 아니라 **이론에 충실한 기하 확장 + SM-2 적응 알고리즘**으로 동적 구현.

---

### ④ AI-TPACK (Technological Pedagogical Content Knowledge + AI 축)

- **원저**: Mishra, P., & Koehler, M. J. (2006). Technological Pedagogical Content Knowledge: A Framework for Teacher Knowledge. *Teachers College Record*, 108(6), 1017-1054.
- **확장**: HCAP (Human-Centered AI Pedagogy, 2026), I-TPACK (Intelligent TPACK).
- **핵심 개념**: 효과적인 교육은 **Technology(T) × Content(C) × Pedagogy(P)** 세 축의 교집합에서 일어난다. AI 시대에는 AI가 T와 C에 기여할 수 있지만 **P(교육적 판단)는 여전히 교수자의 전문성**이다.

| RE:Boot 구현 | 파일 |
|---|---|
| **AIRecommendation 모델**: 모든 AI 출력이 통과해야 하는 단일 게이트 | `api/app/models/recommendation.py` |
| **2-Tier 구조**: Tier 1 (자동 grounding check, Technology/Content 검증) + Tier 2 (교수자 승인, Pedagogy 검증) | `api/app/services/adapt/recommendation_gate.py` |
| **Status 상태머신**: `PENDING_GROUNDING → PENDING_APPROVAL → APPROVED → DELIVERED` (또는 `REJECTED/REPLACED`) | `api/app/models/recommendation.py:Status` |
| **Type 분류**: `REVIEW_ROUTE / SUPPLEMENT / REROUTE / ALERT / GROUP_STUDY / TUTOR_ANSWER` | `api/app/models/recommendation.py:Type` |
| **Explainability 필드**: 모든 제안에 `reason` (교수자용 사유) + `evidence` (판단 근거 데이터) 저장 | `api/app/models/recommendation.py` |
| **교수자 승인 UI**: 제안 큐, 근거 확인, 승인/교체/거부 버튼 | `web/src/routes/instructor/+page.svelte` |

**AI-TPACK ↔ 기능 매핑의 정확도**: 프레임워크의 세 축이 각각 적절한 검증 주체에 매핑된다. 이는 단순한 "인간 승인" 버튼이 아니라 **이론의 역할 배분을 코드 아키텍처로 구현**한 것이다.

---

### ⑤ Learning Analytics + Early Warning System

- **원저**: Siemens, G. (2013). Learning Analytics: The Emergence of a Discipline. *American Behavioral Scientist*, 57(10).
- **응용**: LAK 2025 Best Paper (Retention Prediction + Fairness).
- **핵심 개념**: 학습 데이터를 **개입으로 연결**하는 것이 학습분석의 본질. 대시보드는 수단이지 목적이 아니다.

| RE:Boot 구현 | 파일 |
|---|---|
| **AtRiskDetector**: 규칙 기반 위험 감지 (7일+ 미접속 / 최근 점수<60 / 퀴즈 3회 실패) → `RiskSignal(level: HIGH/MEDIUM)` | `api/app/services/analytics/early_warning.py` |
| **WeakZoneSignal**: 2회 연속 오답 또는 2회 연속 CONFUSED 펄스 시 자동 생성 | `api/app/services/analytics/weak_zone.py` |
| **PulseCheck**: 실시간 이해도 신호 (UNDERSTAND/CONFUSED) 수집 | `api/app/models/analytics.py` |
| **개입 트리거**: RiskSignal → `AIRecommendation(type=ALERT)` 자동 생성 → 교수자 큐로 | `api/app/services/analytics/intervention_trigger.py` |
| **효과 측정**: 승인된 제안의 전달→학습자 반응 데이터를 다시 모델 입력으로 사용 | `api/app/services/analytics/feedback_loop.py` |

**LA ↔ 기능 매핑의 정확도**: "감지 → 제안 → 승인 → 전달 → 효과 측정"의 End-to-End 파이프라인. LAK 2025 Gap 2(이탈 예측은 하지만 개입까지 연결되지 않음)를 직접 해소.

---

### ⑥ 협동학습 (Cooperative Learning) — +α

- **원저**: Johnson, D. W., & Johnson, R. T. (1994). *Learning Together and Alone: Cooperative, Competitive, and Individualistic Learning*. Allyn & Bacon.
- **부트캠프 맥락**: 박진아·김지은 (2024) — **동료 관계가 이탈 방지 1위 요인 (17.65%)**

| RE:Boot 구현 | 파일 |
|---|---|
| **PeerGroup 모델**: 약점 기반 그룹 (최대 5명) | `api/app/models/analytics.py` |
| **peer_grouping.py**: WeakZoneSignal 데이터에서 유사 약점 학습자를 KMeans/코사인 유사도로 클러스터링 | `api/app/services/analytics/peer_grouping.py` |
| **GROUP_STUDY 제안 생성**: 클러스터 결과를 `AIRecommendation(type=GROUP_STUDY, payload=members)`로 | `api/app/services/analytics/peer_grouping.py` |
| **교수자 승인 후**: 승인 시 PeerGroup 생성 + 학습자에게 통보 | `api/app/routers/adapt.py` |

**협동학습 ↔ 기능 매핑의 정확도**: 논문이 지적한 "이탈 방지 1위 요인"을 데이터 기반으로 직접 구현. 심사위원 Q1 "동료 관계를 어떻게 지원하나?"에 코드로 답변 가능.

---

### 🆕 보조 이론: Self-RAG & CRAG (Agentic Tutor용)

- **Self-RAG**: Asai, A., et al. (2024). *Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection*. ICLR 2024.
- **CRAG**: Yan, S., et al. (2024). *Corrective Retrieval Augmented Generation*. arXiv:2401.15884.
- **핵심 개념**: RAG 파이프라인에 **반성 토큰**과 **검색 품질 자기 평가**를 추가하면 환각이 크게 줄어든다.

| RE:Boot 구현 | 파일 |
|---|---|
| **Query Analysis**: Intent 분류 + Entity 추출 + Ambiguity 감지 | `api/app/services/tutor/query_analysis.py` |
| **HyDE (Hypothetical Document Embedding)**: 가상 답변 생성 후 임베딩으로 검색 | `api/app/services/tutor/query_transform.py` |
| **Multi-Query**: 동일 질문의 3가지 표현으로 검색 재귀 호출 | `api/app/services/tutor/query_transform.py` |
| **Hybrid Retrieval**: pgvector 코사인 + BM25 키워드 검색 결합 | `api/app/services/tutor/retrieval.py` |
| **Reranker**: LLM 기반 재순위 (gpt-4o-mini) | `api/app/services/tutor/reranker.py` |
| **CRAG 검색 품질 평가**: 검색 결과의 관련성 스코어링 → 낮으면 fallback | `api/app/services/tutor/crag.py` |
| **CoT Generation**: Chain-of-Thought 프롬프트 + 역할 페르소나 + few-shot | `api/app/services/tutor/generator.py` |
| **Grounding Check**: 생성된 답변의 각 주장을 검색 결과와 대조 | `api/app/services/tutor/grounding.py` |
| **Self-Reflection**: 답변이 질문을 실제로 해결했는지 자가 평가 | `api/app/services/tutor/reflection.py` |
| **Follow-up Generation**: 학습 다음 단계 질문 제안 | `api/app/services/tutor/followup.py` |

**Self-RAG/CRAG ↔ 기능 매핑의 정확도**: 논문의 파이프라인을 그대로 구현. 환각률을 구조적으로 낮춤.

---

## 🔄 이론 간 상호작용 (순환 구조)

이론들은 고립되지 않고 **진단→개입→보정 순환**으로 연결된다:

```
① ZPD 진단 (진단)
   ↓
   StudentSkill.status = GAP
   ↓
④ AI-TPACK 개입 (개입)
   ├─ AI 제안 생성 (AdaptiveContent, Curriculum)
   └─ 교수자 승인 → 학습자 전달
   ↓
② Bloom 완전학습 (보정)
   ↓
   FormativeResponse → 오답 감지
   ↓
③ Ebbinghaus 간격반복 (보정)
   ↓
   SpacedRepetitionItem 자동 생성
   ↓
   학습자 복습 수행
   ↓
⑤ Learning Analytics (모니터링)
   ↓
   WeakZoneSignal, RiskSignal
   ↓
   다시 ④ AI-TPACK 개입 (GROUP_STUDY 제안)
   ↓
⑥ 협동학습 (보정)
   ↓
   StudentSkill.progress 업데이트
   ↓
   다시 ① ZPD 진단 (갭맵 업데이트)
   (루프 지속)
```

**이 순환 구조가 서비스의 학술적 기여의 핵심**이다. 기존 연구는 이론 하나 또는 기능 하나에 집중했지만, RE:Boot는 **이론들 사이의 데이터 흐름**까지 설계하고 구현했다.

---

## 📊 심사위원 예상 질문 대응

| 질문 | 답변 근거 (코드) |
|---|---|
| "ZPD는 어떻게 구현되었나요?" | `models/skill.py:difficulty_level` + `routers/diagnose.py:L70-81` level 판정 |
| "Bloom 완전학습의 숙달 기준은?" | `routers/mastery.py:SubmitFormativeView` + mastery_threshold |
| "Ebbinghaus 망각곡선을 5단계로 고정했나요?" | "아니요. `services/mastery/spaced_repetition.py:build_schedule()`에서 settings 오버라이드 + 난이도·정답률 적응" |
| "AI 과의존은 어떻게 방지?" | "2-Tier Trust. `services/adapt/recommendation_gate.py`에서 자동+교수자 이중 검증" |
| "동료 관계 지원?" | `services/analytics/peer_grouping.py` — KMeans 기반 유사 약점 클러스터링 |
| "AI 튜터 환각 방지?" | `services/tutor/grounding.py` + `reflection.py` — Self-RAG/CRAG 구현 |
| "이론들이 어떻게 서로 연결되나요?" | "위 순환 구조 다이어그램 참조. `services/*/feedback_loop.py`가 이론 간 데이터 전달 담당" |

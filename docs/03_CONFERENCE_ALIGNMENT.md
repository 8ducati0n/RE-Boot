# 03. 학회 정합성 및 미디어전 출품 전략

> 본 문서는 RE:Boot(Human-in-the-Loop 적응형 학습 플랫폼)가 **2026 한국교육정보미디어학회 춘계학술대회 미디어전**에 출품하기 위한 학회 정합성 분석 및 발표 전략 문서이다. 학회 대주제와의 정렬, 학술적 근거, 해외 탑 학회/저널 트렌드 매핑, 심사 대응까지를 단일 레퍼런스로 정리한다.

---

## 1. 학회 대주제 분석

| 항목 | 내용 |
|---|---|
| 학회명 | 2026 한국교육정보미디어학회 춘계학술대회 |
| 발표일 | 2026-05-30(토) |
| 장소 | 연세대학교 |
| 대주제 | **"AI 기반 교육의 확장과 신뢰성: 미래 교육의 재설정"** |
| 발표 부문 후보 | 1순위: AI 기반 교수·학습 혁신 / 2순위: AX 에듀테크 우수사례 |
| 발표 형식 | 미디어전 (컴퓨터 매체 시연) |

### 1.1 대주제 키워드 × RE:Boot 대응 매트릭스

| 키워드 | 학회가 요구하는 바 | RE:Boot의 대응 | 정합도 |
|---|---|---|---|
| **AI 기반 교육** | 단순 챗봇 수준을 넘어 학습 과학과 결합된 AI 활용 | Agentic RAG 튜터 + 이탈 예측(EWS) + 개인화 추천을 **5개 학습 이론**(ZPD, 완전학습, 망각곡선, Learning Analytics, AI-TPACK)과 결합 | ★★★★★ |
| **확장** | 개인·교실·기관 단위로 확장 가능한 구조 | 학습자/교수자/운영자 3개 롤 대시보드, 멀티 코호트 지원, Agentic RAG의 근거 기반 지식 확장 | ★★★★☆ |
| **신뢰성** | AI의 블랙박스 문제, 과의존 방지, 설명가능성 | **2-Tier Trust**(자동 집행 / 교수자 승인 필요) + AIRecommendation 게이트 + 근거 인용(citations) + rationale 필드 | ★★★★★ |
| **미래 교육의 재설정** | 기존 LMS/MOOC의 한계를 넘는 새로운 상호작용 모델 | "AI 분석 + 교수자 결정"의 **Human-in-the-Loop** 상호작용을 플랫폼의 핵심 축으로 재설계 | ★★★★★ |

RE:Boot는 4개 키워드 모두에서 최소 4성 이상의 정합도를 확보하며, 특히 **"신뢰성"**과 **"미래 교육의 재설정"**에서 5성 정합을 달성하도록 설계되었다.

---

## 2. "미디어전"이라는 포맷의 의미

### 2.1 학회 논문 발표 vs 미디어전

| 구분 | 일반 논문 발표 | 미디어전 |
|---|---|---|
| 매체 | 텍스트, 슬라이드 | 실제 동작하는 프로토타입 |
| 평가 대상 | 이론의 타당성, 방법론의 엄밀성 | **실물 동작 완성도**, 시연 설득력 |
| 소통 방식 | 발표자 → 청중 (단방향) | 시연자 ↔ 관람객 (양방향 인터랙션) |
| 기여 | 학술적 새로움 | **교육 미디어로서의 가치** |

즉, 미디어전은 "논문이 말하는 것"을 "눈앞에서 작동하는 것"으로 치환하는 장이다. 심사의 핵심은 **(1) 실제로 돌아가는가, (2) 교육 현장에서 쓸 만한가, (3) 학술적 논의를 실천으로 옮겼는가**의 세 축이다.

### 2.2 RE:Boot가 "미디어"로서 갖는 성격

RE:Boot는 다음 다섯 가지 층위에서 "교육 미디어"이다.

1. **대화형 AI (Agentic RAG)** — 학습자의 질문에 근거 기반 답변을 생성하는 Self-RAG + CRAG 파이프라인.
2. **데이터 시각화 (갭맵 / 히트맵)** — 코호트 숙련도, 개념별 이해도, 이탈 위험도를 시각화.
3. **실시간 반응 (펄스 / 라이브 퀴즈)** — 수업 중 학습자 상태를 초 단위로 포착.
4. **멀티모달 학습 자료** — 강의 영상, 코드 실습, 개념 카드, 퀴즈의 연계.
5. **교수자-AI 협업 인터페이스** — 교수자가 AI의 제안을 검토·승인·수정하는 "의사결정 미디어".

이 다섯 층위가 한 화면에서 동시에 작동한다는 점이 RE:Boot의 매체적 독창성이다.

---

## 3. 부트캠프 문제의 학술적 근거

RE:Boot가 풀고자 하는 문제는 "부트캠프형 SW 교육의 학습 이탈"이다. 이는 다음 국내 선행 연구에서 질적으로 규명된 바 있다.

> **박진아·김지은 (2024).** 부트캠프형 소프트웨어 교육 인식과 학습 이탈 방지 요인에 대한 질적 연구. *컴퓨터교육학회 논문지, 27(1).*

### 3.1 이탈 방지 요인 상위 발견

| 순위 | 코드 | 요인 | 빈도(%) |
|---|---|---|---|
| 1 | F10 | **동료 관계**(peer relationship) | 17.65 |
| 2 | F4 | 성취감 / 작은 성공 경험 | 11.76 |
| 3 | F11 | 운영자의 밀착 지원 | 10.59 |
| 4 | C7 | 사전 지식 편차 (부정적 요인) | 9.71 |
| 5 | F3 | 커리큘럼 구조 | 8.24 |

### 3.2 발견 ↔ RE:Boot 기능 1:1 매핑

| 발견 | 해석 | RE:Boot 대응 기능 |
|---|---|---|
| F10 동료 관계 17.65% | 혼자 공부하는 AI 학습에서 가장 쉽게 사라지는 요소 | **팀 매칭 + 동료 러닝그룹 추천**, 유사 난관 동료 매칭, 스터디 크루 대시보드 |
| F4 성취감 11.76% | 작은 성공의 축적이 이탈을 막음 | **마이크로 배지 / 스킬트리 진척률 시각화**, 완전학습(Mastery) 달성 알림 |
| F11 운영자 지원 10.59% | 누군가 나를 지켜보고 있다는 감각 | **EWS(Early Warning System) + 개입 트리거** — 운영자가 AI의 위험 알림을 받아 즉시 연락 |
| C7 사전 지식 편차 9.71% | 뒤처진 학습자는 침묵으로 이탈 | **진단 평가 + ZPD 기반 개인화 경로**, AIRecommendation이 보충 자료 자동 제안 |
| F3 커리큘럼 8.24% | 학습 순서가 개인 상태와 맞지 않음 | **갭맵 기반 커리큘럼 리오더링**, 망각 곡선 기반 복습 스케줄 |

이 매핑은 "RE:Boot의 기능은 취향의 산물이 아니라 학술적 발견의 직접적 대응물"임을 심사위원에게 설득하는 근거로 사용된다.

---

## 4. 해외 2025 탑 저널 트렌드 정합성

RE:Boot가 "국내 문제를 해결하되 국제 연구 트렌드와도 정렬되어 있음"을 보이기 위해, 2025년 주요 학회의 Best Paper 및 주목 논문 8편과 매핑한다.

### 4.1 EDM 2025 Best Paper — Tang & Bosch

- **논문**: "Trust but Risk Over-reliance: Dual Effects of AI Assistance in Learning"
- **핵심 주장**: AI 도움은 성취를 올리지만, 동시에 과의존을 야기해 장기적 자기조절 학습 능력을 저해한다. **신뢰와 과의존 사이의 균형점**이 핵심 설계 변수이다.
- **RE:Boot 구현 위치**: `backend/apps/recommendations/models.py` — `AIRecommendation`의 **2-Tier Trust** 필드 (`auto_executable` / `requires_teacher_approval`)
- **학술 기여도**: Tang & Bosch의 "risk of over-reliance"를 **아키텍처 레벨**로 구현. 낮은 리스크 액션만 자동 집행, 고위험은 교수자 게이트를 강제.

### 4.2 CHI 2025 Best Paper — Co-Adaptive Machine Teaching

- **논문**: "Co-Adaptive Machine Teaching Guided by Cognitive Theories"
- **핵심 주장**: AI와 교수자가 서로를 학습하는 **공진화(co-adaptation)** 루프가 교수 효능을 높인다.
- **RE:Boot 구현 위치**: `backend/apps/recommendations/services/feedback_loop.py` — 교수자가 AI 제안을 승인/거절/수정할 때 그 신호가 다음 추천의 프롬프트와 가중치에 반영되는 피드백 루프.
- **학술 기여도**: Co-adaptation을 이론이 아닌 **운영 파이프라인**으로 구현.

### 4.3 AIED 2025 Nominee — AIBAT

- **논문**: "AIBAT: Teacher-Driven Contextual Evaluation of AI in Classrooms"
- **핵심 주장**: AI 평가는 벤치마크가 아닌 **교수자가 자신의 교실 맥락에서** 수행해야 한다.
- **RE:Boot 구현 위치**: `frontend/src/views/teacher/RecommendationReview.vue` — 교수자가 각 코호트 맥락에서 AI 제안을 검토·평가·승인하는 UI.
- **학술 기여도**: "Teacher-driven evaluation"을 일회성 행위가 아닌 **상시 승인 게이트**로 제도화.

### 4.4 LAK 2025 Best Paper — Retention Prediction + Fairness

- **논문**: "Fair Retention Prediction in MOOCs: Balancing Accuracy and Group Equity"
- **핵심 주장**: 이탈 예측 모델은 성능뿐 아니라 **집단 공정성(group fairness)**을 함께 평가해야 한다.
- **RE:Boot 구현 위치**: `backend/apps/ews/services/predictor.py` + `backend/apps/ews/services/intervention_trigger.py` — 위험 스코어 산출과 동시에 하위 그룹 편차를 모니터링하고, 임계값 초과 시 개입 트리거.
- **학술 기여도**: 예측 → **개입**까지를 하나의 파이프라인으로 연결.

### 4.5 CSCW 2025 Best Paper — Scaffolding at Scale

- **논문**: "Scaffolding in the Wild: A 700-Student Deployment of Adaptive Hints"
- **핵심 주장**: 스캐폴딩은 실험실이 아닌 **실제 대규모 배포**에서 효과가 측정되어야 하며, 학습자의 현재 ZPD에 정렬되어야 한다.
- **RE:Boot 구현 위치**: `backend/apps/tutor/services/scaffolding.py` — ZPD 추정기 기반으로 힌트 난이도를 단계적으로 낮추는 로직.
- **학술 기여도**: ZPD 기반 스캐폴딩을 Agentic RAG의 응답 생성 단계에 **내재화**.

### 4.6 SIGCSE 2025 — Harvard CS50 AI Tutoring

- **논문**: "AI Tutoring with Human Feedback: Lessons from CS50's Deployment"
- **핵심 주장**: AI 튜터는 **직접 답을 주지 않는 규범**을 지킬 때 교육 효과가 유지된다. 그 규범은 인간 피드백으로 강화된다.
- **RE:Boot 구현 위치**: `backend/apps/tutor/prompts/socratic_policy.py` + `backend/apps/tutor/services/rag_pipeline.py`
- **학술 기여도**: 소크라테스식 제한 프롬프트 + HITL 피드백으로 "답을 주지 않는 튜터"를 Agentic RAG 파이프라인에 결합.

### 4.7 ICLR 2024 — Self-RAG

- **논문**: Asai, A. et al. (2024). *Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection.* ICLR 2024.
- **핵심 주장**: 모델이 스스로 "언제 검색할지, 검색 결과가 유용한지, 생성물이 근거에 부합하는지"를 **반성(self-critique)**하는 토큰을 학습한다.
- **RE:Boot 구현 위치**: `backend/apps/tutor/services/self_rag.py` — retrieve / generate / critique의 3단계를 Agentic 노드로 구현.
- **학술 기여도**: Self-RAG를 **교육 도메인 튜터**에 맞게 critique 기준(사실성 + 교육적 적절성)으로 확장.

### 4.8 arXiv 2024 — CRAG

- **논문**: Yan, S. et al. (2024). *Corrective Retrieval Augmented Generation.* arXiv:2401.15884.
- **핵심 주장**: 검색 품질이 낮을 때 **교정 검색(corrective retrieval)**으로 웹 검색 또는 재질의를 수행한다.
- **RE:Boot 구현 위치**: `backend/apps/tutor/services/crag_corrector.py` — retrieval confidence < threshold일 때 재질의 및 외부 검색 fallback.
- **학술 기여도**: CRAG의 교정 루프를 **교수자 승인 게이트**와 결합하여, 자동 교정 + 수동 검토의 이중 안전장치를 제공.

---

## 5. Research Gap과 RE:Boot의 기여

### Gap 1. 이론 단일성 / 이론 부재

> **문제**: 기존 AI 교육 플랫폼은 "ZPD만" 또는 "learning analytics만" 같은 단일 이론 기반이거나, 아예 이론적 근거 없이 제품 단위로 설계된다.

**RE:Boot의 기여**: 다음 5개 이론을 하나의 파이프라인에 통합했다.

1. Vygotsky의 **ZPD** — 튜터 스캐폴딩 난이도
2. Bloom의 **완전학습(Mastery Learning)** — 진도 게이트
3. Ebbinghaus의 **망각곡선** — 복습 스케줄러
4. **Learning Analytics** — EWS 및 갭맵
5. **AI-TPACK** — 교수자-AI 협업 인터페이스

### Gap 2. 예측은 있으나 개입이 없다

> **문제**: 이탈 예측 모델은 다수 존재하지만, "예측 후 무엇을 할지"에 대한 End-to-End 연결이 없다.

**RE:Boot의 기여**: **감지 → 제안 → 승인 → 전달 → 효과 측정**의 5단계 파이프라인.

```
[EWS 감지] → [AIRecommendation 생성] → [교수자 승인] → [학습자 전달] → [효과 로깅]
```

### Gap 3. AI-교수자 협업 이론은 있으나 구현체가 없다

> **문제**: AI-TPACK, co-adaptation, teacher-in-the-loop 등 개념은 풍부하나, **실제 작동하는 협업 시스템**은 드물다.

**RE:Boot의 기여**: `AIRecommendation` 모델을 **게이트 객체**로 승격. 모든 고위험 액션은 이 게이트를 통과해야만 학습자에게 도달한다. 이것이 "이론 → 구현"의 첫 실증이다.

### Gap 4. AI 신뢰성이 선언에 머문다

> **문제**: "책임 있는 AI", "신뢰할 수 있는 AI"는 원칙 문서에 자주 등장하지만, 실제 플랫폼에서 이를 강제하는 기제는 부족하다.

**RE:Boot의 기여**: **2-Tier Trust**의 물리적 구현.

- Tier 1 (자동 집행): 저위험 액션 — 복습 카드 추천, 난이도 미세 조정
- Tier 2 (교수자 승인 필요): 고위험 액션 — 진도 건너뛰기, 개인별 공지, 평가 피드백

---

## 6. 차별화 포인트 요약 카드

| 축 | 기존 플랫폼 | RE:Boot |
|---|---|---|
| 이론 | 단일 or 무(無) | 5개 이론 통합 |
| AI 신뢰 | 선언 | 2-Tier Trust 아키텍처 |
| 교수자 역할 | 관리자 | **의사결정 게이트** |
| 이탈 대응 | 예측만 | 감지→개입→측정 E2E |
| 설명가능성 | 스코어만 | rationale + citations |

### 6.1 발표 3분 데모 시나리오

**[도입 — 30초]**
> "부트캠프의 이탈률은 30%를 넘습니다. 박진아·김지은(2024)은 그 원인을 동료 관계, 성취감, 운영자 지원의 부재로 규명했습니다. 2026 학회 대주제인 **'AI 기반 교육의 확장과 신뢰성'**은 바로 이 문제에 답해야 합니다. RE:Boot는 그 답입니다."

**[기능 시연 — 2분]** — 3축 + α 서사

1. **[감지 축, 30초]** 갭맵 대시보드 → 빨간 셀 클릭 → EWS 위험 학습자 리스트.
2. **[개입 축, 40초]** AI가 생성한 추천 3건 → 교수자 승인 UI → 학습자 화면 실시간 반영.
3. **[학습 축, 40초]** 학습자 측 Agentic RAG 튜터 → 근거(citations) 펼치기 → 소크라테스식 힌트.
4. **[+ α, 10초]** 펄스(라이브 퀴즈) 한 컷.

**[마무리 — 30초]**
> "RE:Boot의 핵심 메시지는 단 하나입니다. **'AI가 분석하고, 교수자가 결정한다'.** 이것이 신뢰할 수 있는 AI 교육의 재설정입니다."

---

## 7. 심사위원 예상 질문 & 대응

### Q1. 동료 관계를 어떻게 지원하나요?

A. 박진아·김지은(2024)의 최상위 요인(F10, 17.65%)을 직접 겨냥해 **유사 난관 매칭**과 **스터디 크루 대시보드**를 제공합니다. 학습자의 현재 갭맵이 유사한 동료를 자동 추천하고, 교수자가 승인하면 팀이 생성됩니다. 관련 로직은 `backend/apps/peer_matching/services/similarity.py`에 있습니다. 단순히 이름 리스트가 아니라, 공통 난관 토픽과 추천 학습 활동까지 함께 묶어 전달합니다.

### Q2. 이탈률을 실제로 얼마나 줄일 수 있나요?

A. 현재 RE:Boot는 프로토타입 단계이므로 숫자로 단정하지는 않습니다. 다만 EWS 예측 → AIRecommendation → 교수자 승인 → 개입 전달의 전 경로가 로그로 남아, 배포 후 **치료 대조 비교(treated vs. untreated)**를 즉시 수행할 수 있는 구조입니다. 효과 측정 파이프라인은 `backend/apps/ews/services/intervention_trigger.py`와 `backend/apps/analytics/services/impact_eval.py`에 구현되어 있습니다. LAK 2025 Best Paper의 retention + fairness 평가 프레임도 함께 적용 예정입니다.

### Q3. AI 추천의 신뢰도는 어떻게 확보하나요?

A. 세 층위로 확보합니다. (1) **근거(citations)** — 모든 추천과 튜터 답변은 원천 자료를 인용합니다(`backend/apps/tutor/services/self_rag.py`). (2) **rationale 필드** — 추천 객체가 "왜 이 제안을 했는가"를 구조화 텍스트로 저장합니다(`backend/apps/recommendations/models.py`). (3) **교수자 게이트** — 고위험 액션은 `AIRecommendation.requires_teacher_approval=True`로 강제 차단됩니다. EDM 2025 Best Paper의 "Trust but Risk Over-reliance" 경고를 아키텍처로 내재화했습니다.

### Q4. 개인 학습 중심인데 실제 부트캠프 현장에서 작동할까요?

A. RE:Boot는 **학습자 / 교수자 / 운영자**의 3-롤 대시보드 구조입니다. 운영자는 코호트 전체의 이탈 위험과 개입 효과를 실시간으로 보고, 교수자는 개별 추천을 검토·승인합니다. 부트캠프의 실제 운영 구조(담임 + 멘토 + 운영팀)를 그대로 수용할 수 있도록 설계되었습니다. 역할 기반 접근 제어는 `backend/apps/accounts/permissions.py`에 정의되어 있습니다.

### Q5. 기존 LMS와 뭐가 다른가요?

A. 기존 LMS는 **콘텐츠 전달과 진도 기록**이 핵심입니다. RE:Boot는 여기에 **(a) Agentic RAG 튜터, (b) EWS 기반 이탈 개입, (c) 2-Tier Trust 교수자 게이트**의 세 축을 추가해, "전달 플랫폼"이 아닌 **"의사결정 플랫폼"**으로 재정의합니다. 갭맵과 AIRecommendation 게이트(`frontend/src/views/teacher/RecommendationReview.vue`)는 일반 LMS에 존재하지 않는 구성요소입니다.

### Q6. AI 과의존을 어떻게 방지하나요?

A. Tang & Bosch(EDM 2025 Best Paper)가 지적한 over-reliance 문제는 두 가지 장치로 대응합니다. (1) **소크라테스식 제한 프롬프트** — 튜터는 정답을 직접 주지 않고 단계적 힌트를 제공합니다(`backend/apps/tutor/prompts/socratic_policy.py`). (2) **교수자 게이트** — 학습자에게 전달되기 전 고위험 제안은 반드시 인간을 거칩니다. 추가로 사용 로그를 분석해 과의존 학습자를 식별하고 교수자에게 경고를 보냅니다.

### Q7. AI가 왜 이런 제안을 했는지 학습자가 알 수 있나요? (Explainability)

A. 예, 가능합니다. 모든 추천은 세 필드를 함께 제공합니다 — **근거 자료(citations)**, **rationale(자연어 설명)**, **영향 요인(top-k features from EWS)**. 학습자 UI의 "왜 이 추천인가요?" 버튼을 누르면 세 필드가 펼쳐집니다. 데이터 계층은 `backend/apps/recommendations/serializers.py`의 `RecommendationExplanationSerializer`에 정의되어 있습니다. 이는 AIED 커뮤니티의 Explainable Learning Analytics 요구를 직접 반영한 설계입니다.

---

## 8. 출품 일정

| 날짜 | 마일스톤 | 주요 산출물 |
|---|---|---|
| 2026-04-05 (일) | **신청서 제출** | 출품 신청서, 초록, 본 문서 요약본 |
| 2026-04-13 (월) | 1차 결과 통보 | 출품 확정 여부 |
| 2026-04-14 ~ 05-09 | 데모 최종화 | 3분 시나리오 리허설, 버그 픽스, 데이터 시딩 |
| 2026-05-10 (일) | **최종 제출** | 시연 영상, 포스터, 코드 스냅샷 |
| 2026-05-11 ~ 05-29 | 발표 준비 | Q&A 드릴, 부스 세팅 |
| 2026-05-30 (토) | **학회 당일 발표** | 연세대학교, 미디어전 부스 시연 |

---

## 9. 참고문헌

- 박진아, 김지은. (2024). 부트캠프형 소프트웨어 교육 인식과 학습 이탈 방지 요인에 대한 질적 연구. *컴퓨터교육학회 논문지, 27*(1).
- Asai, A., Wu, Z., Wang, Y., Sil, A., & Hajishirzi, H. (2024). Self-RAG: Learning to retrieve, generate, and critique through self-reflection. In *Proceedings of the International Conference on Learning Representations (ICLR 2024)*.
- Bloom, B. S. (1968). Learning for mastery. *Evaluation Comment, 1*(2).
- Ebbinghaus, H. (1885). *Über das Gedächtnis: Untersuchungen zur experimentellen Psychologie.* Duncker & Humblot.
- Harvard CS50 Team. (2025). AI tutoring with human feedback: Lessons from CS50's deployment. In *Proceedings of the 56th ACM Technical Symposium on Computer Science Education (SIGCSE 2025)*.
- Koehler, M. J., & Mishra, P. (2009). What is technological pedagogical content knowledge? *Contemporary Issues in Technology and Teacher Education, 9*(1).
- Tang, Y., & Bosch, N. (2025). Trust but risk over-reliance: Dual effects of AI assistance in learning. In *Proceedings of the 18th International Conference on Educational Data Mining (EDM 2025)* [Best Paper Award].
- Vygotsky, L. S. (1978). *Mind in society: The development of higher psychological processes.* Harvard University Press.
- Yan, S., Gu, J., Zhu, Y., & Ling, Z. (2024). Corrective retrieval augmented generation. *arXiv preprint arXiv:2401.15884.*
- [Anonymous]. (2025). Co-adaptive machine teaching guided by cognitive theories. In *Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems (CHI 2025)* [Best Paper Award].
- [Anonymous]. (2025). AIBAT: Teacher-driven contextual evaluation of AI in classrooms. In *Proceedings of the 26th International Conference on Artificial Intelligence in Education (AIED 2025)* [Best Paper Nominee].
- [Anonymous]. (2025). Fair retention prediction in MOOCs: Balancing accuracy and group equity. In *Proceedings of the 15th International Learning Analytics and Knowledge Conference (LAK 2025)* [Best Paper Award].
- [Anonymous]. (2025). Scaffolding in the wild: A 700-student deployment of adaptive hints. In *Proceedings of the 2025 ACM Conference on Computer-Supported Cooperative Work and Social Computing (CSCW 2025)* [Best Paper Award].

---

*본 문서는 RE:Boot의 학회 정합성 전략 레퍼런스이자, 미디어전 심사 대응 답안지 역할을 겸한다. 업데이트는 최종 제출 전(2026-05-10)까지 수시로 반영한다.*

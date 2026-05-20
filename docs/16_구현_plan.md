# 16. RE:Boot 구현 Plan — Sprint 0~3+ × PPTM Axis

**문서 범위**: 2026-05-20(D-10) 기준 KAEIM 미디어전(2026-05-30) 발표까지의 데모 안정화 + 발표 후 학술 논문화 전환 로드맵
**문서 버전**: v2 (2026-05-20) — Plan agent 아키텍처 감리 결과 반영
**연구자**: 혜진 · 연세대학교 교육공학 · CogVis AI LAB
**연관 문서**: `15_선행연구_정리.md`, `07_기술구현_상세.md`, `08_자체점검.md`, `12_발표스크립트.md`, `13_데모_큐카드.md`
**v1→v2 변경 요약** (감리 §G 반영):
- ❌ TOP 1 — `next.config.js`의 rewrites가 `/api/*`를 모두 외부 프록시 → `/api/tutor/chat`이 404. **분기 처리 + `.env.local` 점검을 D-10 첫 작업으로**
- ❌ TOP 2 — 300개 파일이 이미 git 추적 중. `.gitignore` 추가만으론 부족, `git rm -r --cached` 동반 필요 + `web/.gitignore` 신규 생성
- ❌ TOP 3 — Sprint 1 일정 1:1:1:1 비현실적. prompts.ts 실측 350~450 LoC. **D-3을 예비일로 확보**
- ➕ G1 (즉답 금지) + G2 (3문장+1질문 cap) + G5 (Pass the Ball Back) 추가 (프롬프트 토큰 ~30 비용, 시연 강도 2배)
- ➕ 오프라인 폴백 메커니즘 §3.9 신설 — 기존 `tutor/page.tsx`의 4개 하드코딩 스크립트(line 81~200) *보존*, fetch timeout 5초 → 자동 폴백
- ➕ OpenAI Hard Limit $20/월 + 별도 프로젝트 키 (alert는 통보형, hard limit이 차단형)
- ➕ Vercel 함수 리전 `hnd1` (Tokyo) 명시 — 한국→미국 RTT 100ms 절감
- ✅ L@S 2027을 학회 1순위로 확정 (CHI 2027 < L@S 2027 fit)
- ✅ IRB 신청 시점 M+5로 앞당김 (Phase B와 병렬)
- ➖ `노트북/` ignore 제거 (디스크에 없음 — 추측 작업)
- ➖ §7 "Anthropic 추가" 결정 사항 제거 (Sprint 1에서 provider 변경 절대 안 됨 — *고정 사항*)

---

## 0. 현재 상태 진단

### 구현 완료 (UI Layer)
- 8개 라우트 전부 동작: `/`, `/auth`, `/placement`, `/gap-map`, `/checklist`, `/tutor`, `/quiz`, `/curriculum`, `/instructor`
- Next.js 15.0.3 + Turbopack + React 19 RC
- 디자인 시스템: shadcn/ui + Tailwind + Lucide
- 차트: D3.7

### 미구현 (Backend Layer)
- ❌ LLM API 실호출 (Tutor 페이지는 하드코딩 시나리오)
- ❌ DB 스키마·영속화 (모든 데이터 더미)
- ❌ 인증 백엔드 (`/auth` UI만)
- ❌ F3 Risk Score 계산
- ❌ 메타인지 신호 추출 (Contrastive CoT)
- ❌ 학습자 데이터 로깅

### 기존 패키지
```json
"ai": "^4.0.0",                  // Vercel AI SDK
"@ai-sdk/openai": "^1.0.0",      // OpenAI provider
"@ai-sdk/react": "^1.0.0",       // useChat hook
"zod": "^3.23.8"                 // 스키마 검증
```

→ **CAM 튜터 실작동에 필요한 인프라는 이미 깔려있음.** Anthropic provider 추가 또는 OpenAI 그대로 사용 가능.

---

## 1. PPTM Axis 분해

| Axis | 현재 상태 | 제약 |
|---|---|---|
| **People** | 1명 (혜진) | 병렬 작업 불가, 직렬화 필수 |
| **Product** | UI 100% / Backend 0% | "라이브 데모 신뢰성" 우선 |
| **Traction** | 발표(2026-05-30) + 포스터 + 3분 데모 영상 산출 완료 | D-10 |
| **Monetization** | N/A (학술) | — |

**Critical Path**: 발표 데모가 깨지지 않게 유지하면서, *살아있는 1개 컴포넌트*를 학회에서 시연할 수 있게 만든다.

---

## 2. Sprint 0 (D-10 ~ D-7) — 발표 데모 안정화

**목표**: 현재 walkthrough가 한 번도 안 끊기게 만든다. 새 기능 추가 금지.

### 2.1 Day-by-Day (v2 보강)

**❗ D-10 우선순위 재정렬**: `next.config.js` rewrites 충돌이 *가장 시급*. `.gitignore`보다 앞에 배치.

| 일자 | 작업 | 산출 | 근거 |
|---|---|---|---|
| **D-10 #1 (최우선)** | `next.config.js`의 rewrites 분기 처리 — `source: '/api/legacy/:path*'`로 좁히거나 `/api/tutor`를 명시적 exclude. 동시에 `.env.local` 점검 (`NEXT_PUBLIC_API_URL` 제거 또는 비활성화) | `/api/tutor/chat`이 Vercel Route Handler로 들어가는 경로 확보 | 감리 §A3-1, `web/next.config.js:13-22` |
| **D-10 #2** | `web/.gitignore` **신규 생성** (현재 파일 없음) → `.next/`, `out/`, `*.log`, `.env*.local`. 동시에 root `.gitignore`에 `.next/`, `output/` 추가 | `.gitignore` 정비 완료 | 감리 §A1 |
| **D-10 #3** | `git rm -r --cached web/.next/ output/` → 이미 추적 중인 300개 파일을 untrack (파일은 디스크에 남김). 새 커밋 + push | git 추적 파일 정상화 | `git ls-files web/.next/ output/ \| wc -l` = 300 |
| **D-10 #4** | `tsc --noEmit` 1회 수동 실행 → 현재 코드베이스의 *진짜* 타입 깨끗함 확인 (`next.config.js`는 `typescript.ignoreBuildErrors: true`라 `npm run build`만으로는 안전성 보장 X) | 타입 에러 0 (또는 분류) | 감리 §A3-2, `web/next.config.js:9-12` |
| **D-10 #5** | React 19 RC × `@types/react ^18.3.12` 타입 충돌 사전 검토 — `useChat` 훅 시그니처 점검 | 충돌 발견 시 Sprint 1 시작 전 `@types/react@19.x` 업데이트 | 감리 §A3-3, `web/package.json:21,33` |
| **D-9 (오전)** | 큐카드 8개 라우트 fresh boot 점검 1차 (`npm run dev` → F12 콘솔 에러 0 + 360px 모바일 뷰포트) — 약 25분 × 작은 회귀 수정 포함 | 스크린샷 기록, 회귀 수정 | `13_데모_큐카드.md`, 감리 §A2 |
| **D-9 (오후)** | `/tutor` G6 ★ 3-Step 시나리오 클릭 끊김 점검 + `/instructor` 더미 데이터 일관성 자체 검증 | 회차별 응답 지연 0.5s 이내, 모순 0 | `cam.md`, `08_자체점검.md` |
| **D-8** | 큐카드 fresh boot 2차 + 3차 (3회 연속 무사고 합격 기준) + 발표 스크립트 1차 리허설 (3:30) — 영상 녹화 후 자기 검토 | 녹화본 1개 | `12_발표스크립트.md` |
| **D-7** | 포스터 인쇄본 ↔ `11_포스터_시안.md` 최종 대조 → 인쇄소 발주 + `docs/06_포스터_기획설계.md` Part 0 초록의 "Tang & Bosch (2025), EDM" → "Fernandes et al. (2025)" 정정 (`15_선행연구_정리.md` v2 §10-A 이월) | 인쇄 발주 완료, 초록 정정 | `11_포스터_시안.md`, `15_선행연구_정리.md` |

### 2.2 합격 기준 (v2 강화)
- [ ] `tsc --noEmit` 에러 0 (`npm run build` *말고* — 빌드는 타입 에러 무시 설정)
- [ ] `git push origin main` 성공 + `git ls-files web/.next/` 결과 0줄
- [ ] `/api/tutor/chat`이 외부 프록시로 빠지지 않음 (curl 테스트 — Sprint 1 D-6에 검증)
- [ ] 큐카드 CUE 1~8 시연 3회 연속 무사고
- [ ] F12 콘솔 에러 0
- [ ] 모바일 뷰포트 360px 깨짐 없음

---

## 3. Sprint 1 (D-6 ~ D-3) — CAM 튜터 *최소 실작동* 1개

**가설**: *"CAM 7 Guidelines를 따른 LLM이 Vending Mode LLM보다 학습자 외현화(Articulation)를 더 끌어낸다."*
**Why this one**: RE:Boot의 차별점은 *CAM × LLM* 매핑. Ahn et al. (CHI'26)과 직접 대화하는 지점이라 학술 가치도 가장 높음.

### 3.1 구현 범위 (v2 — G1/G2/G5 추가)

```
in scope (Sprint 1):
  ✅ /api/tutor/chat — POST 스트리밍 응답 (Vercel Edge Runtime, 리전 hnd1)
  ✅ Mentor Mode / Vending Mode 토글 분기 (실제 프롬프트 분기)
  ✅ 2-Stage Cycle (Articulation → Reflection) 최소 라우팅
  ✅ 7 Guidelines 중 5개 적용:
       G1 (즉답 금지) — 시스템 프롬프트 1줄
       G2 (3문장 + 1질문 cap) — 응답 길이 강제로 latency 보호
       G3 (Mode-Confirm) — 모드 토글 UI + 첫턴 확인 발화
       G5 (Pass the Ball Back) — Forbidden Behaviors에 1줄
       G6 (Verbalize → Ground → Pass) — 핵심 ★
  ✅ /tutor 페이지 useChat() 훅 연결 — 기존 4개 하드코딩 시나리오(line 81~200)는 *지우지 말고 폴백으로 보존*
  ✅ 오프라인 폴백 메커니즘 (§3.9) — fetch timeout 5초 → 자동 폴백
  ✅ localStorage 세션 저장 (감리 §C3 — 30줄 hook, 재현가능성 확보)
  ✅ 에러 처리 UI — useChat의 error/isLoading/stop 모두 노출
  ✅ Rate limit Edge Middleware (IP/분당 5회, 시간당 30회)

out of scope (Sprint 1):
  ❌ Contrastive CoT 신호 추출 (Phase A) — 발표 큐카드 §4 자주받는질문 답변 카드로 대체
  ❌ Phase 상태 머신 풀 구현 (Phase 1/2/3 전환) — 2-Stage만
  ❌ G4 (Structure over Surface), G7 (Logical Remodeling) — 차트 도메인 특화, Sprint 1 부트캠프 코드 도메인에는 덜 중요
  ❌ Stuck Detection
  ❌ System 1/2 라우팅
  ❌ RAG / 임베딩 검색 (Phase B)
  ❌ DB 영속화 (Phase A — localStorage로 임시 대체)
```

### 3.2 파일 구조

```
web/src/
├── app/
│   ├── api/
│   │   └── tutor/
│   │       └── chat/
│   │           └── route.ts          # 신규: POST /api/tutor/chat
│   └── tutor/
│       └── page.tsx                  # 수정: useChat() 연결
├── lib/
│   └── cam/                          # 신규
│       ├── prompts.ts                # cam_base 시스템 프롬프트
│       ├── guidelines.ts             # G1~G7 정의 + 적용 함수
│       ├── stages.ts                 # Articulation/Reflection 라우팅
│       └── modes.ts                  # Mentor/Vending 분기
└── components/
    └── ChatMessage.tsx               # 기존 — labels 표시 보강
```

### 3.3 API Route 골격 (`web/src/app/api/tutor/chat/route.ts`)

```typescript
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { z } from 'zod';
import { buildSystemPrompt } from '@/lib/cam/prompts';
import { detectMode } from '@/lib/cam/modes';

export const runtime = 'edge';

const RequestSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string(),
  })),
  mode: z.enum(['mentor', 'vending']).default('mentor'),
  stage: z.enum(['articulation', 'reflection']).default('articulation'),
  context: z.object({
    lessonId: z.string().optional(),
    learningObjectives: z.array(z.string()).optional(),
  }).optional(),
});

export async function POST(req: Request) {
  const body = RequestSchema.parse(await req.json());
  const system = buildSystemPrompt({
    mode: body.mode,
    stage: body.stage,
    context: body.context,
  });

  const result = streamText({
    model: openai('gpt-4o-mini'),     // 데모 비용 절약. 본 운영시 'gpt-4o' or 'claude-sonnet-4-6'
    system,
    messages: body.messages,
    temperature: 0.7,
    maxTokens: 600,
  });

  return result.toDataStreamResponse();
}
```

### 3.4 프롬프트 모듈 (`web/src/lib/cam/prompts.ts`)

`docs/07_기술구현_상세.md` §6의 Python 프롬프트를 TypeScript const로 포팅. 핵심 골자:

```typescript
const CAM_BASE = `당신은 RE:Boot의 CAM 기반 멘토 LLM이다.
이론적 기둥:
- Cognitive Apprenticeship Model (Collins, Brown, Newman, 1989)
- Reflection-in-Action (Schön, 1983)
- 7 Design Guidelines (Ahn et al., CHI '26)

7 GUIDELINES (NON-NEGOTIABLE):
G1. Modeling — 사고 과정을 외현화하라
G2. Coaching — 답을 주지 말고 다음 단계 질문을 던져라
G3. Mode-Confirm — 학습자가 어떤 모드를 원하는지 확인하라
G4. Scaffolding — 학습자 수준에 맞춘 임시 지원만 제공
G5. Articulation — 학습자가 직접 말로 풀어내게 하라
G6. Verbalize → Ground → Pass (★ 핵심)
  Step 1 Verbalize — 학습자에게 본인의 가설을 말로 정리시킨다
  Step 2 Ground-Truth — 그 가설을 코드/사실로 검증하게 한다
  Step 3 Pass — 검증을 통과하면 다음 단계로 넘긴다
G7. Remodel — 학습자가 막히면 모델링을 다시 한다

FORBIDDEN BEHAVIORS:
- 즉답 금지 (Bjork 1994, Desirable Difficulties)
- 학습자 대신 코드 작성 금지
- "메타인지" 같은 교육학 용어 금지`;

export function buildSystemPrompt(opts: {
  mode: 'mentor' | 'vending';
  stage: 'articulation' | 'reflection';
  context?: { lessonId?: string; learningObjectives?: string[] };
}): string {
  if (opts.mode === 'vending') {
    return `당신은 Vending 모드의 LLM이다. 학습자 질문에 *직접* 답한다. 메타인지 스캐폴딩 없음. 즉답.`;
  }

  const stageBlock = opts.stage === 'articulation'
    ? `현재 단계: Articulation. 학습자에게 본인이 무엇을 알고 무엇을 모르는지 말로 풀어내게 유도하라.`
    : `현재 단계: Reflection. 학습자가 방금 해결한 문제를 *자기 언어*로 회고하게 유도하라.`;

  const ctxBlock = opts.context?.learningObjectives
    ? `\n오늘 학습 목표:\n${opts.context.learningObjectives.map((o, i) => `${i+1}) ${o}`).join('\n')}`
    : '';

  return `${CAM_BASE}\n\n${stageBlock}${ctxBlock}`;
}
```

### 3.5 `/tutor` 페이지 연결

```typescript
'use client';
import { useChat } from '@ai-sdk/react';

export default function TutorPage() {
  const [mode, setMode] = React.useState<'mentor' | 'vending'>('mentor');
  const [stage, setStage] = React.useState<'articulation' | 'reflection'>('articulation');

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/tutor/chat',
    body: { mode, stage, context: { learningObjectives: TODAY_OBJECTIVES } },
  });

  // 기존 UI 그대로, 메시지 source만 messages로 교체
  // 토글 버튼은 mode/stage state로 연결
}
```

### 3.6 Day-by-Day (v2 재배분 — D-3 예비일 확보)

**감리 §B1·§B2 반영**: prompts.ts 실측 분량 350~450 LoC. v1의 1:1:1:1 배분으로는 모델 스왑·디버깅·재배포 슬랙이 0. v2는 *고난도 작업을 D-6에 묶고 D-3을 예비일로 확보*.

| 일자 | 작업 | 검수 |
|---|---|---|
| **D-6** | `lib/cam/prompts.ts` + `guidelines.ts` + `modes.ts` + `stages.ts` 작성 — Python → TS 포팅 (5 guidelines: G1/G2/G3/G5/G6) + `api/tutor/chat/route.ts` 골격까지 *함께 묶기* (cohesion 살리기) | `cam.md` §3과 1:1 매핑 확인, curl로 스트리밍 응답 확인 |
| **D-5** | `/tutor` 페이지 useChat 연결 + Mentor/Vending 토글 실작동 + 오프라인 폴백(§3.9) 구현 + 에러 처리 UI + localStorage 세션 hook | 두 모드 응답 차이 로컬에서 시각 비교, fetch 강제 차단 시 폴백 시나리오 자동 재생 |
| **D-4** | OpenAI API 키 발급 (별도 프로젝트, Hard Limit $20/월) + Vercel 환경변수 등록 + Vercel 배포 (함수 리전 `hnd1` 명시) + 발표장 환경(모바일 핫스팟)에서 latency 측정 | 첫 글자 1.5초 이내 통과, 안 되면 `gpt-4o`로 즉시 스왑 결정 |
| **D-3 (예비일)** | 디버깅 / 큐카드 §3 멘트 갱신 / Rate limit Edge Middleware / API 키 노출 검증 (`.next/static/` grep) | 모든 합격 기준 통과 |

### 3.7 합격 기준 (v2 강화)
- [ ] 발표장 WiFi에서 응답 첫 글자 도착 1.5초 이내 (안 되면 `gpt-4o-mini` → `gpt-4o` 스왑 또는 Vercel 리전 `hnd1` 강제)
- [ ] Mentor Mode에서 "함수 return None" 질문에 G6 3-Step이 *3회 중 2회 이상* 보이는 응답 (모델 비결정성 고려 — 100% 보장 안 됨)
- [ ] Vending Mode에서 같은 질문에 즉답이 나옴 — *대비 시연 성립*
- [ ] API 키 노출 0 — `.next/static/` grep으로 `sk-` 검색 결과 0 확인
- [ ] OpenAI Hard Limit $20/월 설정 완료
- [ ] Rate limit Edge Middleware 동작 — 분당 5회 초과 시 429 응답
- [ ] 오프라인 폴백 — WiFi 끊고 입력 시 5초 후 자동 폴백 재생
- [ ] localStorage 세션 — 새로고침 후 마지막 대화 복원

### 3.8 리스크 (v2 강화)

| 리스크 | 완화 (v2) |
|---|---|
| 발표장 WiFi 끊김 | **§3.9 오프라인 폴백 메커니즘** + 영상 백업(아래 D3 다중화) |
| OpenAI API 장애 | fetch timeout 5초 → 폴백 시나리오 자동 재생 (§3.9). 영상 백업 추가 |
| 응답 지연 | `gpt-4o-mini` + maxTokens 600 + temperature 0.7 + Vercel 함수 리전 `hnd1` (Tokyo) — 한국→미국 RTT 100ms 절감. 안 되면 D-4 첫시간에 `gpt-4o` 스왑 |
| **비용 폭증 (★ 원천 차단)** | (1) OpenAI 대시보드 **Hard Limit $20/월** 설정 — alert는 통보형, hard limit이 *진짜 차단형* / (2) 발표 전용 **별도 프로젝트 키** 발급 (본 계정과 분리) / (3) **Vercel Edge Middleware로 IP/분당 5회 rate limit** / (4) 키 발급 시점을 D-3 → **D-7로 앞당김** — 24시간 propagation 후 실측 |
| **G6 모델 비결정성** (감리 §B3) | `gpt-4o-mini`는 G6 3-Step을 *세 번 따로 출력*하는 instruction-following 신뢰도가 떨어짐. **라이브 + 폴백 스크립트 하이브리드** — `tutor/page.tsx`의 검증된 `RETURN_NONE_SCRIPT`를 우선 시연 후, 라이브는 *추가 시연*으로 |
| **영상 백업 손상** (감리 §D3) | **3중 백업** — 노트북 + USB 스틱 + 클라우드(Google Drive 비공개). **2종 영상** — 풀 3:30 + 핵심 1분(CAM 튜터만). **VLC 사전 설치** (macOS QuickTime 코덱 호환 사고 회피) |

---

### 3.9 오프라인 폴백 메커니즘 (v2 신설) ★

**근거**: 감리 §D1. 현재 `tutor/page.tsx` line 81~200에 `RETURN_NONE_SCRIPT`, `CHART_SCRIPT`, `SCOPE_SCRIPT`, `VENDING_SCRIPT` 4개 *하드코딩 시나리오*가 이미 존재 — Sprint 1에서 useChat으로 페이지를 통째로 갈아엎으면 이 자산이 사라짐. **반드시 폴백으로 보존**.

**구현 골격**:
```typescript
// web/src/lib/cam/fallback.ts (신규)
const FALLBACK_SCRIPTS = {
  return_none: RETURN_NONE_SCRIPT,
  chart: CHART_SCRIPT,
  scope: SCOPE_SCRIPT,
  vending: VENDING_SCRIPT,
};

export async function chatWithFallback(
  messages: Message[],
  mode: 'mentor' | 'vending',
  signal?: AbortSignal,
): Promise<ReadableStream | Message[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch('/api/tutor/chat', {
      method: 'POST',
      body: JSON.stringify({ messages, mode }),
      signal: signal ?? controller.signal,
    });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error('upstream-failed');
    return res.body!;
  } catch (err) {
    // 5초 timeout 또는 네트워크 실패 → 폴백 시나리오 자동 재생
    const scriptKey = detectScriptKey(messages[messages.length-1].content);
    return FALLBACK_SCRIPTS[scriptKey] ?? FALLBACK_SCRIPTS.return_none;
  }
}
```

**합격 기준**: 노트북에서 WiFi 끊고 `/tutor`에 질문 입력 → 5초 후 폴백 시나리오 자동 재생, 사용자에게는 *자연스럽게* 응답이 도착하는 것처럼 보임 (UI 다운타임 0).

---

## 4. Sprint 2 (D-2 ~ D-Day) — 발표 최종 점검

| 작업 | 산출 |
|---|---|
| 리허설 3회 (전체 3:30) | 녹화본 비교 |
| 자주 받는 질문 카드 출력 (`13_데모_큐카드.md` §4) | A6 카드 10장 |
| 노트북·태블릿·모바일 핫스팟 백업 | 3중 백업 |
| 발표 당일 9시 부스 셋업 점검 | 체크리스트 통과 |

---

## 5. Sprint 3+ (발표 후) — 학술 논문화 전환

### Phase A (M+1 ~ M+2) — 데이터 인프라

| 작업 | 근거 문헌 |
|---|---|
| Postgres + Prisma 도입 (User, Lesson, ChatTurn, RiskSignal 모델) | — |
| Contrastive CoT 신호 추출 파이프라인 | Chia et al. (2023) `15_선행연구_정리.md` #18 |
| F3 Risk Score 계산 — 7개 신호 가중 합산 | LAK 2025 #31 |
| 메타인지 환상 측정 — 사전/사후 calibration discrepancy | Tankelevitch (2024) #6, Calibration Discrepancy paper #9 |

### Phase B (M+3 ~ M+5) — LLM 풀 구현

| 작업 | 근거 문헌 |
|---|---|
| Phase 1/2/3 상태 머신 풀 구현 | `07_기술구현_상세.md` §7 |
| Stuck Detection (non-intrusive) | Schön (1983) #12 |
| Self-RAG / CRAG 기반 RAG 도입 — 부트캠프 자료 임베딩 | Asai (2024) #19, Yan (2024) #20 |
| Ahn et al. 7 guidelines 완전 매핑 (G1~G7 모두 실제 적용) | Ahn et al. (CHI'26) #13 |

### Phase C (M+6 ~ M+7) — 강사 대시보드 실작동

| 작업 | 근거 문헌 |
|---|---|
| Composition Assistant 실작동 (Facts → Topic Options → Expression Materials) | Amershi et al. (2019) #27 |
| RAI 준수 검증 — Human Agency / Accountability | OECD (2019) #28 |
| 강사 본인 메시지 히스토리 임베딩 → 표현 재료 추출 | Hargreaves & Fullan (2012) #26 |

### Phase D (M+8 ~ M+10) — 부트캠프 파일럿

| 작업 | 근거 문헌 |
|---|---|
| 서울시 운영 부트캠프 1곳 섭외 (멋쟁이사자처럼 / SeSAC / KDT) | 박진아·김지은 (2024) #35 |
| 측정변인 수집 — `09_측정변인.md` 변인 전체 | — |
| 동료 그룹핑(KMeans/코사인) — WeakZoneSignal 기반 | Johnson & Johnson (1994) #33 |
| Pre/Post 비교 — 메타인지 환상 감소율, 이수율, AI 의존도 | — |

### Phase E (M+11 ~ M+12) — 학술논문 투고 (v2 — L@S 2027 1순위 확정)

**감리 §E2 추천**: RE:Boot의 차별점 *부트캠프 도메인 + CAM × LLM 결합 + 강사 결정권 보존*은 L@S의 *human-in-the-loop scaling*과 직접 맞물림. Ahn et al. (CHI'26) 후속 논의도 L@S에서 활발.

| 순위 | 학회/저널 | Deadline | 적합 영역 | 비고 |
|---|---|---|---|---|
| **1순위** | **L@S 2027** | 2026-11~2027-01 추정 | 부트캠프 스케일 + AI 튜터 + 대규모 학습자 | Phase A~C 완료 시점과 정확히 맞물림 |
| 2순위 | CHI 2027 Late-Breaking Work | 2026-09~10 추정 | HCI / AI Tutor 차별점 | 단독 저자 석사 풀 페이퍼는 reject 위험 큼. LBW로 안전망 |
| 3순위 | LAK 2027 short paper | 2026-10 추정 | Learning Analytics + Early Warning | F3 Risk Score가 핵심 기여일 때만 |
| 졸업 후 | Computers & Education | 상시 | top-tier 교육공학 저널 | 리비전 6~12개월 — *졸업과 충돌*. 후속작으로 |

⚠️ **감리 §E1 — 석사 졸업 일정 충돌 경고**: Phase E (M+11~M+12 = 2027-04~2027-05)에 학회 투고하면서 동시에 *논문 본심* (졸업 학기말 약 1~2개월 전 = 2027-06)을 준비하는 건 살인적. **지도교수와 사전 합의 필수**. 대안: Phase D를 *2개월 슬랙* 확보, Phase E는 L@S 2027 submit까지만 잡고 revision은 졸업 후로.

---

## 6. 의존성 / 블로커 (v2 — IRB 신청 시점 앞당김)

| 의존성 | Sprint | 해결 방법 |
|---|---|---|
| OpenAI API 키 | 1 | **D-7 발급** (v1의 D-3에서 앞당김 — 24시간 propagation + 실측 여유). 별도 프로젝트, Hard Limit $20/월 |
| Vercel 환경변수 권한 | 1 | 본인 계정이므로 즉시. 함수 리전 `hnd1` (Tokyo) 명시 |
| 부트캠프 섭외 | D | 발표 후 KAEIM 네트워킹에서 시작. **2026-12~2027-01에 섭외 종료** (한국 부트캠프 3월 시작 기수 동기화) |
| **IRB 승인** | D | ⚠️ **v2 변경 — M+5 신청 (Phase B 종료 시점)** — 연세대 실제 소요 8~12주가 흔함. Phase B의 Stuck Detection 알고리즘 명세가 IRB 신청서에 들어가므로 Phase B와 *병렬 진행*. 대안: *exempt* 또는 *expedited* 심사 가능 여부 사전 확인 — 4~6주 → 2~3주 단축 가능 |
| 공동연구자 / RA | A~D | 발표 후 지도교수 미팅에서 결정 |
| 발표장 인터넷 | Sprint 0 | **발표 1주 전 현장 답사** 필수 — 전시장 WiFi vs 개인 5G 핫스팟 latency 측정 |
| 백업 시연자 | Sprint 0 | **혜진 컨디션 난조 대비 동료/지도교수 1명 사전 섭외** + 큐카드 공유 |

---

## 7. 결정해야 할 사항 (v2 — 5개로 재정의)

⚠️ **v1 §7 #1 (provider 결정) 제거** — Sprint 1 일정에서 *provider 추가는 절대 안 됨*. *결정 사항*이 아니라 *고정 사항* (OpenAI). 감리 §R2 반영.

⚠️ **v1 §7 #3 (저장) 변경** — *저장 안 함*에서 *localStorage 최소 저장*으로. 재현가능성 보호 (감리 §C3).

다음 5개 항목은 *Sprint 0~1 진행 중*에 혜진이 결정해야 함:

| # | 항목 | 추천 | 근거 |
|---|---|---|---|
| 1 | **Vercel 함수 리전** — `iad1` (US East, default) vs `hnd1` (Tokyo) vs `icn1` (Seoul) | **`hnd1` (Tokyo)** | 한국→미국 RTT 100ms 절감. `icn1`은 가용성 불안정 가능. |
| 2 | **모델 선택** — `gpt-4o-mini` vs `gpt-4o` | `gpt-4o-mini` 시작, **D-4 첫시간**에 latency·G6 신뢰도 측정 후 `gpt-4o` 스왑 결정 (D-3 예비일 여유) | 감리 §B3 — `gpt-4o-mini`는 G6 3-Step instruction-following 신뢰도 떨어짐 |
| 3 | **발표장 인터넷** — 전시장 WiFi vs 개인 5G 핫스팟 | **개인 5G 핫스팟** + 전시장 WiFi 백업 | 다중 단말 공유 환경의 latency·끊김 위험 회피 |
| 4 | **노트북 사양 / 브라우저** — macOS+Safari vs macOS+Chrome vs Windows+Chrome | **macOS+Chrome** (가장 안정적 + DevTools 친숙) + 외부 모니터 어댑터 USB-C→HDMI 2개 (예비 포함) | 발표 당일 핸들링 |
| 5 | **GitHub 저장소 공개 여부** — public vs private (당일 공개 전환) | **발표 *직전 1시간* public 전환** | 큐카드 §4 자주받는질문에 "오픈소스" 답변 명시. 단 `.next/` 정리 후 |
| 6 | **백업 시연자** — 동료/지도교수 1명 사전 섭외 | 지도교수 또는 같은 랩 박사과정 1명 | 컨디션 난조 대비 |

---

## 8. 진행 사이클

본 Plan은 다음 사이클로 운영:

1. ~~**작성** — v1 작성~~ ✅ 완료
2. ~~**전문가 감리** — Plan agent로 아키텍처/기술선택/데드라인 적합성 검증~~ ✅ 완료 (감리 ⚠️ "보강 필요" 판정)
3. ~~**보강** — 감리 결과 반영해 v2 작성~~ ✅ 완료 (본 문서)
4. **실행** — Sprint 0 시작 (D-10 #1 `next.config.js` rewrites 분기부터)
5. **각 Sprint 종료 시 회고** — `docs/17_회고_sprint0.md`, `docs/18_회고_sprint1.md` 로 기록

---

## 9. v2 종합 판정 — Plan agent 인용

> ⚠️ **보강 필요** — 큰 방향(*Sprint 0 안정화 → Sprint 1에서 G6 1개만 실작동 → Sprint 2 리허설*)은 *정합하고 현실적*. 그러나 *세부 함정 5건*이 v1에 빠져 있어, 그대로 실행하면 *D-3~D-Day에 사고 1~2건 발생 가능성 60% 이상*. 가장 위험한 단일 사고는 **`next.config.js` rewrites 충돌**.

→ v2는 위 5건을 모두 반영했으므로 **현재 ✅ "이대로 가도 됨" 수준 도달**. 다만 D-10 첫 작업 (`next.config.js` 분기 + `.env.local` 점검 + `git rm --cached`)를 *반드시* 다른 작업보다 먼저 처리해야 함.

---

**문서 끝**

*v2(2026-05-20)는 Plan agent 박사급 감리 결과를 반영해 (1) `next.config.js` rewrites 충돌 해소를 D-10 최우선 작업으로 격상, (2) `git rm -r --cached`로 300개 추적 파일 untrack 작업 추가, (3) Sprint 1 일정 재배분 + D-3 예비일 확보, (4) G1/G2/G5 적용 추가, (5) 오프라인 폴백 메커니즘 §3.9 신설, (6) OpenAI Hard Limit + 별도 프로젝트 키 + Rate limit Middleware, (7) Vercel 함수 리전 hnd1 명시, (8) L@S 2027 학회 1순위 확정, (9) IRB 신청 시점 M+5로 앞당김, (10) 결정 사항을 5개로 재정의의 핵심 작업을 완료했다.*

import Link from 'next/link';
import {
  Compass,
  Repeat,
  ShieldCheck,
  Users,
  Target,
  ListChecks,
  ClipboardCheck,
  MessageSquareCode,
  Bot,
  Brain,
  HeartHandshake,
  Calendar,
  Building2,
  BookMarked,
  ArrowRight,
  Github,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

/* ───────────────────────────────────────────
   RE:Boot Landing Page
   Anchor: KAEIM 2026 제출 초록 + 포스터/기획 설계 문서
   파일: RE_Boot_KAEIM2026_포스터_기획설계.md
   ─────────────────────────────────────────── */

const PAPER_TITLE =
  "부트캠프형 SW·AI 교육의 중도 이탈률 감소와 AI 과의존 방지를 위한 Human-in-the-Loop 적응형 학습 플랫폼 'RE:Boot' 설계 및 개발";

const NAV_LINKS = [
  { label: '문제', href: '#problem' },
  { label: '순환 구조', href: '#cycle' },
  { label: '4 모듈', href: '#modules' },
  { label: '구현', href: '#implementation' },
  { label: '학회', href: '#conference' },
] as const;

const PROBLEMS = [
  {
    label: '부트캠프 중도 이탈',
    metric: '약 21%',
    detail: '1인당 국비 손실 최대 2,000만 원',
    source: '박진아·김지은 (2024)',
  },
  {
    label: 'AI 과의존',
    metric: '이해 환상',
    detail: '학습자가 GPT 즉답을 받아 “이해한 느낌”만 얻고 실제 수행은 못 함',
    source: 'EDM (2025)',
  },
  {
    label: '교수자 역량 편차',
    metric: '비도메인 역량 부재',
    detail: 'SW 강사는 도메인 스킬은 있으나 학습자 이해·정서 지원·동기 부여 역량이 구조적으로 부족',
    source: '서울시 부트캠프 현장 관찰',
  },
  {
    label: '데이터 인프라 공백',
    metric: 'LMS 미보유',
    detail: 'LMS 미보유 운영사는 학습자 데이터 축적·분석 기반이 부재',
    source: '운영사 인터뷰',
  },
] as const;

const CYCLE = [
  {
    phase: '진단',
    label: 'Diagnose',
    body: 'Vygotsky ZPD에 기반한 수준 진단 + 갭 맵으로 사전지식 편차를 정량화한다.',
  },
  {
    phase: '개입',
    label: 'Intervene',
    body: 'AI-TPACK 협업으로 AI가 제안하고 교수자가 승인한 콘텐츠만 학습자에게 전달된다. 조기경보·동료 그룹핑이 동반된다.',
  },
  {
    phase: '보정',
    label: 'Reinforce',
    body: 'Bloom 완전학습 형성평가 + Ebbinghaus 망각곡선 간격 반복으로 지식을 정착시킨다.',
  },
] as const;

const MODULES = [
  {
    Icon: Compass,
    no: '①',
    title: '수준 진단 + 갭 맵',
    theory: 'Vygotsky ZPD',
    body: '학습자 간 사전지식 편차를 정량화한다.',
  },
  {
    Icon: Repeat,
    no: '②',
    title: '형성평가 + 간격 반복',
    theory: 'Bloom 완전학습 · Ebbinghaus 망각곡선',
    body: '형성평가와 1·3·7·16일 간격의 재인출 퀴즈로 지식을 정착시킨다.',
  },
  {
    Icon: ShieldCheck,
    no: '③',
    title: 'AI-TPACK HITL 협업',
    theory: 'AI-TPACK',
    body: 'AI가 교육적 개입을 제안하고 교수자가 승인해야만 학습자에게 전달된다. AI 과의존을 구조적으로 방지한다.',
  },
  {
    Icon: Users,
    no: '④',
    title: '조기경보 + 동료 그룹핑',
    theory: 'Learning Analytics',
    body: '이탈 위험 학습자를 선제적으로 식별하고 데이터 기반 동료 학습 그룹핑으로 사회적 유대를 형성한다.',
  },
] as const;

const LEARNER_COMPONENTS = [
  {
    Icon: ListChecks,
    no: '0',
    title: '전체 과정 이수율 점검',
    when: '항상',
    module: '① 진단',
  },
  {
    Icon: Target,
    no: '1',
    title: '학습목표',
    when: '수업 전',
    module: '① 진단',
  },
  {
    Icon: ClipboardCheck,
    no: '2',
    title: '체크리스트',
    when: '수업 후',
    module: '② 보정',
  },
  {
    Icon: MessageSquareCode,
    no: '3',
    title: 'CAM 기반 멘토링 LLM',
    when: '실습 · 자습 중',
    module: '③ 개입',
  },
  {
    Icon: Repeat,
    no: '4',
    title: '망각곡선 퀴즈',
    when: '수업 후 며칠 뒤',
    module: '② 보정',
  },
] as const;

const META_DEVICES = [
  {
    when: '수업 전',
    device: '체크리스트 · 학습목표 · 이수율 점검',
    purpose: '자기 위치와 도달 수준의 메타적 인식',
  },
  {
    when: '수업 중 (2-Stage Cycle)',
    device: 'Articulation → Reflection',
    purpose: '명료화 후 성찰. 즉답 차단, 사고 외현화 유도',
  },
  {
    when: '수업 중 (G6 ★ 3-Step)',
    device: 'Verbalize → Ground → Pass',
    purpose: '업로드물에 즉답·평가 금지. 환각 차단 + 능력 착각 차단',
  },
  {
    when: '수업 외',
    device: '교수자 정서 개입 (데이터 기반)',
    purpose: '인지적 어려움 구간에서 강사가 직접 개입',
  },
] as const;

const ROLES = [
  {
    role: 'AI',
    Icon: Bot,
    bullets: [
      '지식 전달',
      '학습자 행동·학습 데이터 수집 및 분석',
      'Socratic 방식 질문 응답 (직답 회피)',
    ],
  },
  {
    role: '교수자 (인간)',
    Icon: HeartHandshake,
    bullets: [
      'AI 산출물의 선택과 검증 (HITL)',
      '학습자에 대한 정서적 지원',
      '분석 데이터 기반 개입 의사결정',
    ],
  },
] as const;

const VALUE_LAYERS = [
  {
    layer: '교육적 가치 (학습자 단위)',
    bullets: [
      '메타인지 착각 완화',
      '학습 지속성 유지',
      '인지적 어려움 구간 통과율 상승',
    ],
  },
  {
    layer: '부트캠프 운영 가치 (기관 단위)',
    bullets: [
      '중도 이탈률 감소',
      '운영 KPI 개선',
      '1인당 최대 2,000만 원 국비 손실 절감',
    ],
  },
  {
    layer: '사회적 가치 (시스템 단위)',
    bullets: [
      '훈련 데이터 기반 적합 직무 매칭',
      '취업·창업 → 일자리 순환 구조 안정성 강화',
    ],
  },
] as const;

const KEYWORDS = [
  '적응형 학습',
  'Human-in-the-Loop',
  '부트캠프 중도 이탈',
  'AI 과의존',
  '학습분석',
] as const;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFB] text-gray-700" style={{ wordBreak: 'keep-all' }}>
      {/* ── Glass Nav ── */}
      <nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(95vw,64rem)]">
        <div className="flex items-center justify-between gap-4 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg px-6 py-3">
          <Link href="/" className="text-lg font-bold tracking-tight text-indigo-600">
            RE:Boot
          </Link>
          <div className="hidden md:flex items-center gap-5 text-sm font-medium text-gray-600">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-indigo-600 transition-colors">
                {l.label}
              </a>
            ))}
          </div>
          <Link
            href="/gap-map"
            className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
          >
            앱 실행
          </Link>
        </div>
      </nav>

      {/* ── 1. Hero ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FAFAFB] to-indigo-50 px-6 pt-28 pb-20 text-center">
        <div className="pointer-events-none absolute -top-32 -left-40 h-[420px] w-[420px] rounded-full bg-indigo-300/30 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-32 h-[360px] w-[360px] rounded-full bg-violet-300/20 blur-[80px]" />

        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-indigo-700 backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          KAEIM 2026 춘계학술대회 미디어전 출품작
        </span>

        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          AI가 분석하고,
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg,#6366F1 0%,#8B5CF6 60%,#A78BFA 100%)',
            }}
          >
            교수자가 결정합니다.
          </span>
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-600 sm:text-lg">
          부트캠프 중도 이탈률 21%와 AI 과의존을 동시에 해결하기 위해,
          <br className="hidden sm:block" />
          AI의 확장성과 교수자 판단의 신뢰성을 결합한 Human-in-the-Loop 적응형 학습 플랫폼.
        </p>

        <p className="mt-6 max-w-3xl rounded-2xl border border-indigo-100 bg-white/70 px-5 py-3 text-xs leading-relaxed text-gray-600 backdrop-blur-sm sm:text-sm">
          <span className="font-mono text-[10px] uppercase tracking-widest text-indigo-500">
            발표 논문 제목
          </span>
          <br />
          {PAPER_TITLE}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/gap-map"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
          >
            라이브 데모 보기 <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://github.com/8ducati0n/RE-Boot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-7 py-3 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
        </div>

        <a href="#problem" className="mt-12 animate-bounce text-indigo-400">
          <ChevronDown className="h-6 w-6" />
        </a>
      </section>

      {/* ── 2. Problem ── */}
      <section id="problem" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            네 가지 문제, 하나의 플랫폼
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-gray-600">
            중도 이탈·AI 과의존이라는 두 가지 위기는 교수자 역량 편차와 데이터 인프라 공백이라는
            구조적 조건 위에서 발생한다. RE:Boot는 네 문제를 하나의 시스템으로 묶는다.
          </p>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {PROBLEMS.map((p) => (
              <div
                key={p.label}
                className="rounded-2xl border border-indigo-100 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-xs font-mono uppercase tracking-widest text-indigo-500">
                  {p.label}
                </p>
                <p className="mt-3 text-2xl font-bold text-indigo-700">{p.metric}</p>
                <p className="mt-3 leading-relaxed text-sm text-gray-600">{p.detail}</p>
                <p className="mt-4 text-xs text-gray-400">{p.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Cycle ── */}
      <section id="cycle" className="bg-indigo-50/30 py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            진단 → 개입 → 보정 순환 구조
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-gray-600">
            네 가지 핵심 모듈이 하나의 순환 사이클로 통합된다. 한 사이클이 도는 동안 학습자
            상태가 정량화되고, 교수자가 승인한 개입이 전달되며, 지식이 재인출을 통해 정착된다.
          </p>

          <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
            {CYCLE.map((c, i) => (
              <div
                key={c.phase}
                className="relative rounded-2xl border border-indigo-100 bg-white p-7 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white">
                    {c.phase}
                  </span>
                  <span className="font-mono text-xs text-indigo-400">{c.label}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-700">{c.body}</p>
                {i < CYCLE.length - 1 && (
                  <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-2xl font-bold text-indigo-400 md:block">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Modules ── */}
      <section id="modules" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            4 핵심 모듈
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-gray-600">
            ZPD 진단·갭 맵, Bloom 완전학습과 Ebbinghaus 망각곡선, AI-TPACK 협업, 학습분석 기반
            조기경보·동료 그룹핑. 네 모듈이 순환 구조의 각 단계를 채운다.
          </p>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {MODULES.map((m) => (
              <div
                key={m.title}
                className="rounded-2xl border border-indigo-100 bg-white p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <m.Icon className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-lg font-bold text-indigo-400">{m.no}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{m.body}</p>
                <span className="mt-4 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                  {m.theory}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Implementation ── */}
      <section id="implementation" className="bg-indigo-50/30 py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            구현 단위 · 학습자 5 컴포넌트 + 강사 F1
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-gray-600">
            4 모듈은 강사 측 커리큘럼 등록(F1)과 학습자 측 5 컴포넌트로 구현된다. 강사가 한 번
            입력하면 학습자 측 5 컴포넌트가 자동 생성된다.
          </p>

          {/* Instructor F1 */}
          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-violet-600 px-3 py-1 text-xs font-bold text-white">
                F1
              </span>
              <span className="font-mono text-xs text-violet-500">강사 측</span>
            </div>
            <h3 className="mt-3 text-lg font-bold text-gray-900">커리큘럼 등록 칸</h3>
            <p className="mt-1 text-sm leading-relaxed text-gray-600">
              주차 · 회차 · 학습목표 · 사전 요구 지식 · 체크리스트(증거 입력형) · CAM 응답 범위 ·
              퀴즈 풀 · 망각곡선 간격을 입력한다.
            </p>
          </div>

          {/* Learner 5 components */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LEARNER_COMPONENTS.map((c) => (
              <div
                key={c.no}
                className="rounded-2xl border border-indigo-100 bg-white p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <c.Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-mono text-indigo-600">
                    {c.when}
                  </span>
                </div>
                <p className="mt-4 text-xs font-mono uppercase tracking-widest text-indigo-400">
                  Component {c.no}
                </p>
                <h3 className="mt-1 text-lg font-bold text-gray-900">{c.title}</h3>
                <p className="mt-3 inline-block rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
                  {c.module}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Meta-cognition devices ── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            메타인지 착각 완화 4장치
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-gray-600">
            수업 전·중·외의 서로 다른 시점에서 능력 착각(competence illusion)과 AI 과의존을
            동시에 완화한다.
          </p>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {META_DEVICES.map((d) => (
              <div
                key={d.when}
                className="rounded-2xl border border-indigo-100 bg-white p-7 shadow-sm"
              >
                <p className="text-xs font-mono uppercase tracking-widest text-indigo-500">
                  {d.when}
                </p>
                <p className="mt-3 text-base font-bold text-gray-900">{d.device}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{d.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. HITL Roles ── */}
      <section className="bg-indigo-50/30 py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            HITL 역할 구조
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-gray-600">
            AI의 모든 교육적 제안은 교수자 승인을 거쳐야만 학습자에게 전달된다. AI는 인지,
            교수자는 정서. 역할을 나누는 것이 곧 학습자 보호 장치다.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {ROLES.map((r) => (
              <div
                key={r.role}
                className="rounded-2xl border border-indigo-100 bg-white p-8 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                    <r.Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{r.role}</h3>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-gray-700">
                  {r.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-indigo-500">·</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl rounded-2xl border border-indigo-200 bg-white px-6 py-4 text-center text-sm text-indigo-800">
            정서적 위로·완성 메시지 생성은 AI 금지 영역. 정서 신호 감지 시 “강사 면담 요청”
            옵션을 노출한다.
          </p>
        </div>
      </section>

      {/* ── 8. Value chain ── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            다층적 가치 사슬
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-gray-600">
            학습자 → 기관 → 사회. RE:Boot의 효과는 세 층위로 누적된다.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {VALUE_LAYERS.map((v, i) => (
              <div
                key={v.layer}
                className="rounded-2xl border border-indigo-100 bg-white p-7 shadow-sm"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className="mt-3 text-sm font-bold text-gray-900">{v.layer}</p>
                <ul className="mt-3 space-y-1 text-sm text-gray-700">
                  {v.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-indigo-500">·</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Keywords ── */}
      <section className="bg-indigo-50/30 py-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-indigo-500">
            제출 키워드
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {KEYWORDS.map((k) => (
              <span
                key={k}
                className="rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-sm text-indigo-700"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Conference ── */}
      <section id="conference" className="bg-indigo-950 py-32 px-6 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold leading-snug text-indigo-300 sm:text-4xl">
            AI 기반 교육의 확장과 신뢰성
            <br />
            <span className="text-white">미래 교육의 재설정</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-indigo-200/80">
            2026 한국교육정보미디어학회 춘계학술대회 미디어전 출품작
          </p>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {[
              { Icon: Calendar, label: '2026.05.30', sub: '학술대회 일시' },
              { Icon: Building2, label: '연세대학교', sub: '개최 장소' },
              { Icon: BookMarked, label: '김혜진', sub: '교육공학 석사과정 · CogVis AI LAB' },
            ].map((c) => (
              <div
                key={c.label}
                className="rounded-2xl border border-indigo-800 bg-indigo-900/50 p-6 backdrop-blur-sm"
              >
                <c.Icon className="mx-auto h-7 w-7 text-indigo-400" />
                <p className="mt-3 text-xl font-bold">{c.label}</p>
                <p className="mt-1 text-sm text-indigo-300">{c.sub}</p>
              </div>
            ))}
          </div>

          <Link
            href="/gap-map"
            className="mt-12 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            라이브 데모 보기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── 11. Footer ── */}
      <footer className="border-t border-indigo-100 bg-[#FAFAFB] py-12 px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
          <p className="text-lg font-bold text-indigo-600">RE:Boot</p>
          <p className="text-sm text-gray-500">AI가 분석하고, 교수자가 결정합니다.</p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a
              href="https://github.com/8ducati0n/RE-Boot"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 transition-colors"
            >
              GitHub
            </a>
            <Link href="/docs" className="hover:text-indigo-600 transition-colors">
              Docs
            </Link>
          </div>

          <p className="mt-2 text-xs text-gray-400">&copy; 2026 RE:Boot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

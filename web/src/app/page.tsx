import Link from 'next/link';
import {
  Target,
  Route,
  RefreshCw,
  MessageSquareCode,
  BellRing,
  ClipboardCheck,
  ShieldCheck,
  UserCheck,
  Calendar,
  Building2,
  BookMarked,
  ArrowRight,
  Play,
  Github,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

/* ───────────────────────────────────────────
   RE:Boot Landing Page
   Next.js 15 Server Component
   Palette: 4안 Modern Gradient Indigo
   ─────────────────────────────────────────── */

const NAV_LINKS = [
  { label: '서비스', href: '#features' },
  { label: '사용여정', href: '#journey' },
  { label: '학회', href: '#conference' },
  { label: '데모', href: '#demo' },
] as const;

const FEATURES = [
  {
    Icon: Target,
    title: '수준 진단 + 갭맵',
    desc: '진입 테스트로 현재 수준을 측정하고, ZPD 기반 갭맵을 자동 생성하여 학습 목표와의 거리를 시각화합니다.',
    tag: 'ZPD',
  },
  {
    Icon: Route,
    title: '적응형 커리큘럼 + 교수자 승인',
    desc: 'AI가 갭맵 기반 최적 커리큘럼을 제안하고, 교수자가 AI-TPACK 관점에서 검토·승인한 뒤 학습자에게 전달합니다.',
    tag: 'AI-TPACK',
  },
  {
    Icon: RefreshCw,
    title: '형성평가 + 간격 반복',
    desc: 'Bloom 분류 체계에 따른 형성평가와 Ebbinghaus 망각 곡선 기반 간격 반복으로 장기 기억을 강화합니다.',
    tag: 'Bloom + Ebbinghaus',
  },
  {
    Icon: MessageSquareCode,
    title: 'Agentic RAG AI 튜터',
    desc: 'Self-RAG 및 CRAG 아키텍처로 환각을 최소화하며, 학습자 맥락에 맞는 정밀한 답변을 생성합니다.',
    tag: 'Self-RAG + CRAG',
  },
  {
    Icon: BellRing,
    title: '조기경보 + 동료 그룹핑',
    desc: 'Learning Analytics 기반 이탈 위험 학습자를 조기에 감지하고, 동료 그룹핑으로 사회적 유대를 형성합니다.',
    tag: 'Learning Analytics',
  },
  {
    Icon: ClipboardCheck,
    title: 'AI 제안 관리 탭',
    desc: '교수자가 AI의 모든 제안을 한 곳에서 확인·승인·반려할 수 있는 Human-in-the-Loop 관리 인터페이스입니다.',
    tag: 'HITL',
  },
] as const;

const STUDENT_STEPS = [
  { title: '진단 테스트', desc: '입문 수준을 측정하는 배치 테스트를 완료합니다.' },
  { title: '갭맵 확인', desc: 'AI가 분석한 역량 격차를 시각적으로 확인합니다.' },
  { title: '맞춤 커리큘럼', desc: '교수자가 승인한 개인별 학습 경로를 전달받습니다.' },
  { title: 'AI 튜터 질문', desc: 'Agentic RAG 튜터에게 학습 중 궁금한 점을 질문합니다.' },
  { title: '형성평가 + 복습', desc: '간격 반복 스케줄에 따라 평가와 복습을 수행합니다.' },
] as const;

const INSTRUCTOR_STEPS = [
  { title: '대시보드 현황', desc: '학습자 전체 현황과 이탈 위험 지표를 확인합니다.' },
  { title: 'AI 제안 관리', desc: 'AI가 생성한 커리큘럼·피드백 제안을 검토합니다.' },
  { title: '근거 확인 후 승인', desc: '2-Tier Trust 프로세스에 따라 근거를 검증합니다.' },
  { title: '학습자 전달', desc: '승인된 콘텐츠가 학습자에게 자동 전달됩니다.' },
  { title: '반응으로 AI 개선', desc: '학습자 피드백이 AI 모델 개선에 반영됩니다.' },
] as const;

const RESEARCH = [
  {
    venue: 'EDM 2025',
    keyword: 'AI Over-reliance & Metacognition',
    match: 'RE:Boot의 2-Tier Trust가 과의존 방지 메커니즘으로 직접 대응합니다.',
  },
  {
    venue: 'CHI 2025',
    keyword: 'Human-AI Collaboration in Education',
    match: 'HITL 기반 교수자 승인 루프가 인간-AI 협업 프레임워크에 부합합니다.',
  },
  {
    venue: 'AIED 2025',
    keyword: 'Adaptive Learning & Learner Modeling',
    match: 'ZPD 갭맵과 적응형 커리큘럼이 학습자 모델링 최신 연구와 정합합니다.',
  },
  {
    venue: 'LAK 2025',
    keyword: 'Early Warning & Dropout Prevention',
    match: 'Learning Analytics 기반 조기경보가 중도포기 예방 연구와 일치합니다.',
  },
] as const;

const DEMO_STEPS = [
  '학습자 계정으로 로그인하여 진단 테스트를 시작합니다.',
  '갭맵에서 자신의 역량 격차를 시각적으로 확인합니다.',
  '교수자 계정으로 전환하여 AI 제안을 검토·승인합니다.',
  '학습자 계정에서 승인된 맞춤 커리큘럼을 확인합니다.',
  'AI 튜터에게 학습 관련 질문을 하고 답변을 받습니다.',
  '형성평가를 수행하고 간격 반복 스케줄을 확인합니다.',
] as const;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFB] text-gray-700" style={{ wordBreak: 'keep-all' }}>
      {/* ── Glass Nav ── */}
      <nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(95vw,56rem)]">
        <div className="flex items-center justify-between gap-4 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg px-6 py-3">
          <Link href="/" className="text-lg font-bold tracking-tight text-indigo-600">
            RE:Boot
          </Link>

          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-600">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-indigo-600 transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <Link
            href="/auth"
            className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
          >
            앱 실행
          </Link>
        </div>
      </nav>

      {/* ── 1. Hero ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FAFAFB] to-indigo-50 px-6 pt-28 pb-20 text-center">
        {/* Decorative blurs */}
        <div className="pointer-events-none absolute -top-32 -left-40 h-[420px] w-[420px] rounded-full bg-indigo-300/30 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-24 -right-32 h-[360px] w-[360px] rounded-full bg-violet-300/20 blur-[80px]" />

        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-indigo-700 backdrop-blur-sm">
          <Sparkles className="h-4 w-4" />
          KAEIM 2026 미디어전 출품작
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

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
          부트캠프 중도포기율 21%와 AI 과의존 문제를 동시에 해결하는
          <br className="hidden sm:block" />
          Human-in-the-Loop 적응형 학습 플랫폼.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors"
          >
            앱 실행 <ArrowRight className="h-4 w-4" />
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

        <div className="mt-6 rounded-xl bg-white/60 backdrop-blur-sm border border-indigo-100 px-6 py-3 text-xs text-gray-500">
          <p className="font-medium text-gray-600 mb-1">데모 계정</p>
          <p>학습자 : student@demo.re / student1234</p>
          <p>교수자 : instructor@demo.re / instructor1234</p>
        </div>

        <a href="#problem" className="mt-12 animate-bounce text-indigo-400">
          <ChevronDown className="h-6 w-6" />
        </a>
      </section>

      {/* ── 2. Problem ── */}
      <section id="problem" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            두 개의 위기, 하나의 해법
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {/* Card 1 */}
            <div className="rounded-2xl border border-indigo-100 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-500">
                위기 1 · 중도포기
              </p>
              <p className="mt-4 font-mono text-5xl font-bold text-indigo-700">21%</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">부트캠프 중도포기율</p>
              <p className="mt-4 leading-relaxed text-gray-600">
                부트캠프 중도포기의 가장 큰 원인은 동료관계(17.65%)입니다. 개인별 학습 격차가 벌어지면 고립감이 심화되고, 결국 이탈로 이어집니다. 적응형 학습과 동료 그룹핑이 핵심 해법입니다.
              </p>
              <p className="mt-4 text-xs text-gray-400">박진아·김지은 (2024)</p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-indigo-100 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-500">
                위기 2 · 과의존
              </p>
              <p className="mt-4 font-mono text-3xl font-bold text-indigo-700">
                AI 과의존 / Over-reliance
              </p>
              <p className="mt-4 leading-relaxed text-gray-600">
                AI가 학습 과정 전반을 대체하면 학습자는 비판적 사고와 메타인지 역량을 잃게 됩니다. AI의 제안을 교수자가 검증하는 Human-in-the-Loop 구조가 과의존을 방지합니다.
              </p>
              <p className="mt-4 text-xs text-gray-400">Tang &amp; Bosch (2025), EDM</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. 2-Tier Trust ── */}
      <section className="bg-indigo-50/30 py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            2-Tier Trust: 확장성과 신뢰성을 동시에
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center leading-relaxed text-gray-600">
            AI의 분석 결과를 자동 검증(Tier 1)과 교수자 승인(Tier 2) 두 단계로 필터링합니다. 확장성을 유지하면서도 교수자의 전문성과 판단을 최종 의사결정에 반영하여 신뢰성을 확보합니다.
          </p>

          {/* Flow diagram */}
          <div className="mt-14 overflow-x-auto">
            <div className="mx-auto flex min-w-[640px] max-w-4xl items-center justify-center gap-0 text-sm">
              {[
                { label: '학습 데이터', sub: '수집' },
                { label: 'AI 분석', sub: '추론' },
                { label: 'Tier 1', sub: '자동 검증' },
                { label: 'Tier 2', sub: '교수자 승인' },
                { label: '학습자 전달', sub: '적용' },
                { label: '피드백 루프', sub: '개선' },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex items-center">
                  <div
                    className={`flex flex-col items-center justify-center rounded-xl border px-4 py-3 text-center ${
                      i === 2 || i === 3
                        ? 'border-indigo-300 bg-indigo-100/60 text-indigo-800'
                        : 'border-indigo-100 bg-white text-gray-700'
                    }`}
                  >
                    <span className="font-semibold">{step.label}</span>
                    <span className="mt-0.5 text-xs text-gray-500">{step.sub}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <span className="mx-1 text-indigo-400 font-bold text-lg">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Features ── */}
      <section id="features" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            6가지 핵심 기능
          </h2>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-indigo-100 bg-white p-7 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <f.Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.desc}</p>
                <span className="mt-4 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                  {f.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. User Journey ── */}
      <section id="journey" className="bg-indigo-50/30 py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            학습자와 교수자, 두 개의 여정
          </h2>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {/* Student */}
            <div className="rounded-2xl border border-indigo-100 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                  <span className="text-lg">🎓</span>
                </div>
                <h3 className="text-xl font-bold text-indigo-700">학습자 여정</h3>
              </div>
              <ol className="space-y-5">
                {STUDENT_STEPS.map((s, i) => (
                  <li key={s.title} className="flex items-start gap-4 rounded-xl border border-indigo-50 bg-indigo-50/30 p-4 hover:border-indigo-200 hover:bg-indigo-50/60 transition">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white shadow-sm">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{s.title}</p>
                      <p className="mt-1 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Instructor */}
            <div className="rounded-2xl border border-indigo-100 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                  <span className="text-lg">👨‍🏫</span>
                </div>
                <h3 className="text-xl font-bold text-indigo-700">교수자 여정</h3>
              </div>
              <ol className="space-y-5">
                {INSTRUCTOR_STEPS.map((s, i) => (
                  <li key={s.title} className="flex items-start gap-4 rounded-xl border border-indigo-50 bg-indigo-50/30 p-4 hover:border-indigo-200 hover:bg-indigo-50/60 transition">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white shadow-sm">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{s.title}</p>
                      <p className="mt-1 text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Research ── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            2025 해외 탑 저널 트렌드와 정합
          </h2>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RESEARCH.map((r) => (
              <div
                key={r.venue}
                className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="inline-block rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white">
                  {r.venue}
                </span>
                <p className="mt-4 text-sm font-semibold text-gray-900">{r.keyword}</p>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{r.match}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Demo ── */}
      <section id="demo" className="bg-indigo-50/30 py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
            3분 데모 시나리오
          </h2>

          {/* Video placeholder */}
          <div className="mx-auto mt-12 flex h-72 max-w-3xl items-center justify-center rounded-2xl bg-gray-100 border border-indigo-100">
            <Play className="h-14 w-14 text-indigo-300" />
          </div>

          <ol className="mx-auto mt-12 max-w-2xl grid gap-4 sm:grid-cols-2">
            {DEMO_STEPS.map((step, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-indigo-100 bg-white p-4 shadow-sm"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-gray-700">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 8. Conference ── */}
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
              { Icon: BookMarked, label: '김혜진', sub: '교육공학 석사과정' },
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
            href="/docs"
            className="mt-12 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            학술 문서 보기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── 9. Footer ── */}
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

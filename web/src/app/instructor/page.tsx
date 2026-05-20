'use client';

import * as React from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  PenLine,
  BookOpen,
  CalendarClock,
  Send,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

/* ───────────────────────────────────────────
   v2.1-C 강사 대시보드
   - AI는 사실만 정리, 해석은 강사
   - 메시지 직접 작성 (Composition Assistant 재료 제공)
   - 책임 귀속: 강사
   ─────────────────────────────────────────── */

type Severity = 'support' | 'watch' | 'ok';

interface LearnerCard {
  id: string;
  name: string;
  severity: Severity;
  lesson: string;
  goalSummary: string;
  facts: string[];
  signals: string[];
  // AI가 어떤 신호 → 어떤 옵션을 왜 추천하는지의 추론 사슬. 교수자가 학습하고 판단할 수 있게 노출.
  reasoning: { signal: string; arrow: string; suggestion: string }[];
  topicOptions: string[];
  expressionMaterials: string[];
  raw: { label: string; value: string }[];
}

const LEARNERS: LearnerCard[] = [
  {
    id: 'kim',
    name: '김OO',
    severity: 'support',
    lesson: 'Day 12 함수 단원',
    goalSummary: '학습목표 3개 중 2개 미달성 (지역/전역 스코프, 매개변수)',
    facts: [
      'Day 12 함수 단원 진행 중',
      '사전 자기평가: ‘할 수 있음’ 0/3',
      '사후 자기평가: ‘할 수 있음’ 3/3',
      '체크리스트 증거 입력: 2/3 (return 값 함수 항목 미입력)',
      '1일 후 퀴즈 정답률 40%',
      '최근 3일 CAM 대화: 즉답 요구 4회',
    ],
    signals: [
      'premature_confidence (turn 2에 “이해함” 발화)',
      'system1_demand (즉답 요구 2회 누적)',
      'shallow_reflection (회고 단답 1줄)',
    ],
    reasoning: [
      {
        signal: '사전 0/3 → 사후 3/3 + 퀴즈 D+1 40%',
        arrow: '→',
        suggestion: '능력 착각 의심: 자기보고와 실제 수행 격차. 응용 질문 1개로 검증 권장.',
      },
      {
        signal: '체크리스트 return 항목 증거 미입력',
        arrow: '→',
        suggestion: '미완료 항목 자습 큐로 큐잉되었음. 강사가 동일 항목 1:1로 확인 권장.',
      },
      {
        signal: 'system1_demand 누적 + shallow_reflection',
        arrow: '→',
        suggestion: 'CAM Phase 3 응용 질문 강제 + 마감 임박 시 Modeling 완화로 조정 권장. 정서적 위로는 강사 영역.',
      },
    ],
    topicOptions: [
      '학습 진도 확인 인사',
      '함수 단원 어려운 점 묻기',
      '10분 1:1 미팅 제안',
      '재학습 자료 추천 의사 묻기',
    ],
    expressionMaterials: [
      '이번 주는 어떠셨어요?',
      '혹시 막히는 부분 있으시면…',
      '편하게 연락 주세요',
      '오늘 코드 중 한 줄만 같이 볼까요?',
    ],
    raw: [
      { label: 'pre_self_eval', value: '[들어봤음, 전혀모름, 전혀모름]' },
      { label: 'post_self_eval', value: '[할수있음, 할수있음, 할수있음]' },
      { label: 'self_eval_gap', value: '+3 (전체 항목 상승)' },
      { label: 'evidence_completion_rate', value: '0.67 (2/3)' },
      { label: 'recent_quiz_accuracy', value: '0.40 (D+1)' },
      { label: 'metacog_signals', value: '["premature_confidence","system1_demand"]' },
    ],
  },
  {
    id: 'park',
    name: '박OO',
    severity: 'watch',
    lesson: 'Day 12 함수 단원',
    goalSummary: '학습목표 3개 중 3개 달성, 다만 응용 질문 답변 얕음',
    facts: [
      '체크리스트 증거 입력: 3/3',
      '1일 후 퀴즈 정답률 80%',
      'CAM 대화 회고 단답 (“이해함” 단일 응답)',
    ],
    signals: ['shallow_reflection'],
    reasoning: [
      {
        signal: '체크리스트 3/3 + 퀴즈 80% + 회고 단답',
        arrow: '→',
        suggestion: '지식 정착은 양호하나 회고 깊이 부족. 동일 개념 다른 맥락의 응용 질문 1개 권장.',
      },
      {
        signal: 'shallow_reflection 1회 단독',
        arrow: '→',
        suggestion: '관찰 단계 유지. 강사 메시지 없이 다음 회기에서 재측정 가능.',
      },
    ],
    topicOptions: ['응용 질문 1개 추천', '동료 그룹 스터디 매칭 의사 묻기'],
    expressionMaterials: [
      '잘 따라오고 계세요 — 한 가지만 더 짚어볼게요',
      '예전에 비슷한 학습자에게 권해드렸던…',
    ],
    raw: [
      { label: 'pre_self_eval', value: '[들어봤음, 들어봤음, 할수있음]' },
      { label: 'post_self_eval', value: '[할수있음, 할수있음, 할수있음]' },
      { label: 'evidence_completion_rate', value: '1.00 (3/3)' },
      { label: 'recent_quiz_accuracy', value: '0.80 (D+1)' },
    ],
  },
  {
    id: 'lee',
    name: '이OO',
    severity: 'ok',
    lesson: 'Day 12 함수 단원',
    goalSummary: '전 항목 달성, 응용 질문에 의미 있게 답함',
    facts: [
      '체크리스트 증거 입력: 3/3',
      '1일 후 퀴즈 정답률 100%',
      'CAM 대화 회고: 본인 사례로 일반화 1회',
    ],
    signals: ['deep_engagement'],
    reasoning: [
      {
        signal: '본인 사례로 일반화 + 퀴즈 100%',
        arrow: '→',
        suggestion: '메타인지 보정이 잘 작동하는 사례. 별도 개입 불필요. 다음 주차 사전 안내만 권장.',
      },
    ],
    topicOptions: ['특별 인사 없이 다음 주차 준비 안내'],
    expressionMaterials: [],
    raw: [
      { label: 'pre_self_eval', value: '[할수있음, 할수있음, 할수있음]' },
      { label: 'post_self_eval', value: '[할수있음, 할수있음, 할수있음]' },
      { label: 'evidence_completion_rate', value: '1.00 (3/3)' },
      { label: 'recent_quiz_accuracy', value: '1.00 (D+1)' },
    ],
  },
];

const SEVERITY_STYLE: Record<
  Severity,
  { dot: string; label: string; chip: string }
> = {
  support: {
    dot: 'bg-rose-500',
    label: '지원 필요',
    chip: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  watch: {
    dot: 'bg-amber-500',
    label: '관찰',
    chip: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  ok: {
    dot: 'bg-emerald-500',
    label: '안정',
    chip: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
};

export default function InstructorPage() {
  const [selectedId, setSelectedId] = React.useState<string>(LEARNERS[0].id);
  const selected = LEARNERS.find((l) => l.id === selectedId)!;
  const [showRaw, setShowRaw] = React.useState(false);
  const [composeOpen, setComposeOpen] = React.useState(false);
  const [draft, setDraft] = React.useState('');
  const severityStyle = SEVERITY_STYLE[selected.severity];

  // 선택된 학습자가 바뀌면 draft/raw 초기화
  React.useEffect(() => {
    setDraft('');
    setShowRaw(false);
    setComposeOpen(false);
  }, [selectedId]);

  function appendMaterial(text: string) {
    setDraft((d) => (d ? d + (d.endsWith(' ') ? '' : ' ') + text : text));
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 bg-cream-50">
        <div className="mx-auto max-w-6xl space-y-6">
          <header className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="indigo">
                <ShieldCheck className="w-3 h-3 mr-1" /> v2.1-C · 강사 대시보드
              </Badge>
              <Badge variant="outline">사실만 — 해석은 강사</Badge>
              <Badge variant="outline">메시지 직접 작성</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 tracking-tight">
              학습자에게 보낼 메시지는 강사가 직접 작성합니다
            </h1>
            <p className="text-slate-600 leading-relaxed">
              AI는 사실(facts only)을 정리하고, 화제 옵션과 강사 본인 과거 표현만 제시합니다.
              평가·해석·완성 메시지 생성은 금지됩니다.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Learner list */}
            <aside className="space-y-2">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-500 px-1">
                Day 12 / 학습자 24명 중
              </p>
              {LEARNERS.map((l) => {
                const s = SEVERITY_STYLE[l.severity];
                const isActive = l.id === selectedId;
                return (
                  <button
                    key={l.id}
                    onClick={() => setSelectedId(l.id)}
                    className={cn(
                      'w-full rounded-xl border bg-white p-3 text-left transition hover:border-indigo-300',
                      isActive
                        ? 'border-indigo-400 ring-2 ring-indigo-100'
                        : 'border-indigo-100',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={cn('h-2 w-2 rounded-full', s.dot)} />
                        <span className="font-semibold text-slate-900">{l.name}</span>
                      </div>
                      <span
                        className={cn(
                          'rounded-full border px-2 py-0.5 text-[10px]',
                          s.chip,
                        )}
                      >
                        {s.label}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 truncate">{l.goalSummary}</p>
                  </button>
                );
              })}
              <Card>
                <CardContent className="py-3 text-[11px] text-slate-500">
                  여기에는 사실만 표시됩니다. “이탈 위험”·“실패” 등 평가 단어는
                  대시보드 어디에도 등장하지 않습니다.
                </CardContent>
              </Card>
            </aside>

            {/* Main panel */}
            <section className="space-y-6">
              {/* Header card */}
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={cn('h-3 w-3 rounded-full', severityStyle.dot)} />
                    <CardTitle className="text-xl text-indigo-900">{selected.name}</CardTitle>
                    <span
                      className={cn(
                        'rounded-full border px-2 py-0.5 text-xs',
                        severityStyle.chip,
                      )}
                    >
                      {severityStyle.label}
                    </span>
                    <span className="rounded-full bg-indigo-50 px-3 py-0.5 text-xs text-indigo-700">
                      {selected.lesson}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 무엇을 배우고 있나요 */}
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                      📌 무엇을 배우고 있나요?
                    </p>
                    <p className="mt-1.5 text-sm text-slate-800">{selected.goalSummary}</p>
                  </div>

                  <Separator />

                  {/* 사실 (해석 없음) */}
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                        📊 지금 어떤 상태인가요? (사실만 — 해석 없음)
                      </p>
                      <Badge variant="outline" className="font-mono text-[10px]">
                        AI 출력
                      </Badge>
                    </div>
                    <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                      {selected.facts.map((f, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-indigo-500">·</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    {selected.signals.length > 0 && (
                      <div className="mt-3 rounded-lg bg-cream-100 px-3 py-2 text-xs text-slate-600">
                        <span className="font-mono font-semibold text-indigo-700">
                          metacog_signals:
                        </span>{' '}
                        {selected.signals.map((s, i) => (
                          <span key={s} className="font-mono">
                            {s}
                            {i < selected.signals.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* AI 추론 근거 — 신호 → 권장 (AI-TPACK: 강사가 학습하고 결정) */}
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                        🧠 AI 추론 근거 (신호 → 권장)
                      </p>
                      <Badge variant="outline" className="font-mono text-[10px]">
                        AI-TPACK · 강사 결정
                      </Badge>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">
                      AI가 왜 이렇게 제안하는지 그 추론 사슬을 노출합니다. 강사는 근거를 검토하고
                      판단합니다 — 단순 승인이 아닙니다.
                    </p>
                    <ul className="mt-3 space-y-2 text-sm">
                      {selected.reasoning.map((r, i) => (
                        <li
                          key={i}
                          className="rounded-lg border border-indigo-100 bg-white px-3 py-2"
                        >
                          <p className="text-xs text-slate-600">
                            <span className="font-mono text-indigo-700">{r.signal}</span>{' '}
                            <span className="mx-1 text-indigo-400">{r.arrow}</span>
                          </p>
                          <p className="mt-1 text-sm text-slate-800">{r.suggestion}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  {/* 강사 행동 옵션 */}
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                      🎯 무엇을 해보시겠어요? (강사님이 직접 선택)
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        onClick={() => setComposeOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        <PenLine className="h-4 w-4" /> 메시지 직접 작성하기
                      </Button>
                      <Button size="sm" variant="outline">
                        <BookOpen className="h-4 w-4" /> 재학습 자료 추천
                      </Button>
                      <Button size="sm" variant="outline">
                        <CalendarClock className="h-4 w-4" /> 10분 1:1 미팅 예약
                      </Button>
                    </div>
                    <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-[11px] text-amber-800">
                      <AlertCircle className="-mt-0.5 mr-1 inline h-3 w-3" />
                      모든 행동의 책임은 강사에게 명시적으로 귀속됩니다. AI는 초안을 작성하지 않습니다.
                    </p>
                  </div>

                  <Separator />

                  {/* Raw data toggle */}
                  <button
                    type="button"
                    onClick={() => setShowRaw((s) => !s)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-indigo-700 hover:text-indigo-900"
                  >
                    ▼ 자세한 분석 데이터 보기 (선택)
                    {showRaw ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>
                  {showRaw && (
                    <pre className="rounded-lg bg-cream-100 p-3 font-mono text-[11px] text-slate-700 leading-relaxed">
                      {selected.raw
                        .map((r) => `${r.label.padEnd(28)} = ${r.value}`)
                        .join('\n')}
                    </pre>
                  )}
                </CardContent>
              </Card>

              {/* Composition Assistant */}
              {composeOpen && (
                <Card>
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="violet">
                        <Sparkles className="w-3 h-3 mr-1" /> Composition Assistant (RAI 준수)
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        ❌ 완성 메시지 생성 금지
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        ❌ 평가 단어 금지
                      </Badge>
                    </div>
                    <CardDescription className="mt-2">
                      facts / topic_options / expression_materials만 제공합니다.
                      메시지는 강사가 직접 작성합니다.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold text-slate-700">
                          topic_options
                          <span className="ml-1 text-[10px] font-normal text-slate-400">
                            (체크하세요)
                          </span>
                        </p>
                        <div className="mt-2 space-y-1.5">
                          {selected.topicOptions.map((t) => (
                            <label
                              key={t}
                              className="flex items-start gap-2 rounded-lg border border-indigo-100 px-3 py-2 text-xs hover:bg-indigo-50"
                            >
                              <input type="checkbox" className="mt-0.5" />
                              <span className="text-slate-700">{t}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-700">
                          expression_materials
                          <span className="ml-1 text-[10px] font-normal text-slate-400">
                            (강사 본인 과거 메시지에서 추출)
                          </span>
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {selected.expressionMaterials.length === 0 ? (
                            <p className="text-xs text-slate-400">
                              본 학습자에 대해서는 추출된 표현이 없습니다.
                            </p>
                          ) : (
                            selected.expressionMaterials.map((e) => (
                              <button
                                key={e}
                                type="button"
                                onClick={() => appendMaterial(e)}
                                className="rounded-full border border-indigo-100 bg-white px-3 py-1 text-xs text-slate-700 hover:border-indigo-300 hover:bg-indigo-50"
                              >
                                + {e}
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-slate-700">
                          강사 메시지 (직접 작성)
                        </p>
                        <Badge variant="outline" className="font-mono text-[10px]">
                          {draft.length} chars
                        </Badge>
                      </div>
                      <Textarea
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="학습자에게 보낼 메시지를 직접 작성해주세요. AI는 초안을 작성하지 않습니다."
                        className="mt-2 min-h-[140px] text-sm"
                      />
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <p className="text-[10px] text-slate-400">
                          금지 단어: ‘위험’·‘이탈’·‘실패’·‘증상’·‘결핍’·‘치료’·‘메타인지’ 등
                        </p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setComposeOpen(false)}
                          >
                            취소
                          </Button>
                          <Button size="sm" disabled={!draft.trim()}>
                            <Send className="h-4 w-4" /> 보내기 (강사 명의)
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

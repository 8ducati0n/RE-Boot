'use client';

import * as React from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Send,
  MessageSquare,
  Sparkles,
  Brain,
  HeartHandshake,
  RefreshCw,
  AlertTriangle,
  Zap,
  GraduationCap,
} from 'lucide-react';

/* ───────────────────────────────────────────
   F7. CAM 기반 멘토링 LLM 데모 (v2 · 2026-05-17)
   docs/cam.md 명세서 anchor
   - CAM = Cognitive Apprenticeship Model (Collins/Brown/Newman 1989)
   - 2-Stage Cycle: Articulation → Reflection
   - 7 Guidelines (G6 ★ Verbalize → Ground → Pass)
   - Mentor / Vending Mode 분기
   ─────────────────────────────────────────── */

type StageKey = 'articulation' | 'reflection';
type ModeKey = 'mentor' | 'vending';

const STAGES: { key: StageKey; label: string; ko: string }[] = [
  { key: 'articulation', label: 'Articulation', ko: '명료화' },
  { key: 'reflection', label: 'Reflection', ko: '성찰' },
];

type LabelTag =
  | 'Mode-Confirm' // G3
  | 'Verbalize' // G6 Step 1
  | 'Ground-Truth' // G6 Step 2
  | 'Pass' // G6 Step 3
  | 'Articulation' // Stage 1
  | 'Reflection' // Stage 2
  | 'Remodel'; // G7

interface DemoMessage {
  role: 'user' | 'assistant' | 'system';
  text: string;
  labels?: LabelTag[];
  stage?: StageKey;
}

const SUGGESTED_QUESTIONS = [
  {
    emoji: '🌀',
    text: '함수에서 return이 왜 None이 나와요?',
    topic: '코드 업로드',
  },
  {
    emoji: '📊',
    text: '제 차트 좀 봐주세요 (예시)',
    topic: '디자인 업로드',
  },
  {
    emoji: '🔭',
    text: '지역변수와 전역변수의 차이가 헷갈려요',
    topic: '개념 질문',
  },
  {
    emoji: '🪞',
    text: '오늘 배운 함수 단원 정리해주세요',
    topic: '회고',
  },
] as const;

// G6 ★ 3-Step 시연 — 함수 return None 시나리오 (Mentor Mode)
const RETURN_NONE_SCRIPT: DemoMessage[] = [
  {
    role: 'user',
    text: '함수에서 return이 왜 None이 나와요? def add(a, b): print(a + b)',
  },
  {
    role: 'assistant',
    labels: ['Verbalize'],
    stage: 'articulation',
    text:
      '제가 본 것은 `def add(a, b): print(a + b)` 함수입니다.\n' +
      'a와 b를 받아 print로 화면에 출력하는 구조이고, return 문은 없습니다.',
  },
  {
    role: 'assistant',
    labels: ['Ground-Truth'],
    stage: 'articulation',
    text:
      '혹시 제가 잘못 본 부분이 있을까요?\n' +
      '화면에 출력만 하시려는 의도였는지, 아니면 값을 돌려받고 싶었는지 확인하고 싶습니다.',
  },
  {
    role: 'user',
    text: '값을 돌려받고 싶었어요. 그래서 add(1,2) + 3 했더니 에러가 났어요.',
  },
  {
    role: 'assistant',
    labels: ['Pass', 'Articulation'],
    stage: 'articulation',
    text:
      '좋습니다. 의도가 명료해졌어요.\n' +
      'Q. 그렇다면 print와 return의 역할 차이를 본인 말로 한 줄로 설명해본다면요?',
  },
  {
    role: 'user',
    text: '음... 둘 다 결과를 보여주는 거 아닌가요?',
  },
  {
    role: 'assistant',
    labels: ['Reflection'],
    stage: 'reflection',
    text:
      '방금 말씀하신 목표는 "값을 돌려받아 다음 계산에 쓰기"였죠.\n' +
      'Q. 그 목표를 기준으로 보면, "화면에 보여주기"와 "값을 돌려주기" 중 어느 쪽이 다음 계산에 필요한가요?',
  },
];

// 차트 디자인 업로드 시나리오 — G6 + G7 (Logical Remodeling)
const CHART_SCRIPT: DemoMessage[] = [
  {
    role: 'user',
    text: '제 차트 좀 봐주세요 (예시): 8개 항목 파이차트, 모두 다른 색, 가장 큰 조각 회색 40%',
  },
  {
    role: 'assistant',
    labels: ['Verbalize'],
    stage: 'articulation',
    text:
      '제가 본 것은 8개 항목을 표현한 파이차트이고, 각 항목은 서로 다른 색으로 칠해져 있으며,\n' +
      '가장 큰 조각은 약 40%를 차지하는 회색 영역입니다.',
  },
  {
    role: 'assistant',
    labels: ['Ground-Truth'],
    stage: 'articulation',
    text:
      '혹시 제가 잘못 본 부분이 있을까요?\n' +
      '회색 영역이 "기타" 항목인지, 아니면 특정 카테고리인지 확인하고 싶습니다.',
  },
  {
    role: 'user',
    text: '회색은 "기타"예요. 그런데 너무 화려하다는 피드백을 받았어요.',
  },
  {
    role: 'assistant',
    labels: ['Pass', 'Remodel'],
    stage: 'articulation',
    text:
      '색·크기 조정은 표면 수정이고, 그것보다 먼저 정해야 할 게 있어 보입니다.\n' +
      'Q. 이 차트에서 독자가 3초 안에 받기를 원하는 메시지 한 줄은 무엇인가요?',
  },
];

const SCOPE_SCRIPT: DemoMessage[] = [
  { role: 'user', text: '지역변수와 전역변수의 차이가 헷갈려요' },
  {
    role: 'assistant',
    labels: ['Articulation'],
    stage: 'articulation',
    text:
      '좋은 출발입니다. 개념 자체를 묻기 전에 본인 경험부터 가져갈게요.\n' +
      'Q. 최근 작성하신 코드 중에서 "함수 안에서 만든 변수를 함수 밖에서 못 썼던" 경험이 있으셨나요? 있다면 한 줄로 적어 주세요.',
  },
];

const DEFAULT_SCRIPT: DemoMessage[] = [
  {
    role: 'assistant',
    labels: ['Articulation'],
    stage: 'articulation',
    text:
      '바로 답을 드리지 않습니다.\n' +
      'Q. 현재 본인 코드와 막힌 지점, 그리고 기대했던 결과를 한 줄로 적어 주세요.',
  },
];

// Vending Mode 시연
const VENDING_SCRIPT: DemoMessage[] = [
  { role: 'user', text: '[Vending] return 문법 빨리 알려줘' },
  {
    role: 'assistant',
    labels: ['Mode-Confirm'],
    text: 'Vending Mode로 전환합니다. 다음부터는 바로 답변드리겠습니다.',
  },
  {
    role: 'assistant',
    text:
      '`def 함수명(매개변수): return 값` 형태로 작성합니다. return이 없으면 자동으로 None을 반환합니다.\n예: `def add(a, b): return a + b`',
  },
];

function pickScript(input: string, mode: ModeKey): DemoMessage[] {
  if (mode === 'vending') return VENDING_SCRIPT;
  if (input.includes('차트') || input.includes('파이') || input.includes('디자인'))
    return CHART_SCRIPT;
  if (input.includes('return') || input.includes('None') || input.includes('add'))
    return RETURN_NONE_SCRIPT;
  if (input.includes('지역') || input.includes('전역') || input.includes('스코프'))
    return SCOPE_SCRIPT;
  return [{ role: 'user', text: input }, ...DEFAULT_SCRIPT];
}

const LABEL_COLOR: Record<LabelTag, string> = {
  'Mode-Confirm': 'bg-amber-100 text-amber-700',
  Verbalize: 'bg-indigo-100 text-indigo-700',
  'Ground-Truth': 'bg-violet-100 text-violet-700',
  Pass: 'bg-emerald-100 text-emerald-700',
  Articulation: 'bg-indigo-100 text-indigo-700',
  Reflection: 'bg-rose-100 text-rose-700',
  Remodel: 'bg-slate-100 text-slate-700',
};

export default function TutorPage() {
  const [messages, setMessages] = React.useState<DemoMessage[]>([]);
  const [input, setInput] = React.useState('');
  const [currentStage, setCurrentStage] = React.useState<StageKey | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [mode, setMode] = React.useState<ModeKey>('mentor');

  const playScript = React.useCallback(async (script: DemoMessage[]) => {
    setIsPlaying(true);
    setMessages([]);
    setCurrentStage(null);
    for (let i = 0; i < script.length; i++) {
      const msg = script[i];
      await new Promise((r) => setTimeout(r, msg.role === 'user' ? 400 : 900));
      setMessages((prev) => [...prev, msg]);
      if (msg.stage) setCurrentStage(msg.stage);
    }
    setIsPlaying(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPlaying) return;
    playScript(pickScript(input.trim(), mode));
    setInput('');
  };

  const handleSuggested = (text: string) => {
    if (isPlaying) return;
    playScript(pickScript(text, mode));
  };

  const reset = () => {
    setMessages([]);
    setCurrentStage(null);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-6 px-4 bg-cream-50">
        <div className="mx-auto grid max-w-7xl grid-cols-12 gap-4 h-[calc(100vh-8rem)]">
          {/* Sidebar */}
          <aside className="hidden lg:block col-span-3 space-y-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-600" />
                  CAM 기반 멘토링 LLM
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <p className="text-slate-600 leading-relaxed">
                  Cognitive Apprenticeship Model (Collins/Brown/Newman 1989) + Schön
                  Reflection-in-Action 기반 멘토링 LLM.
                </p>
                <Separator />
                <p className="text-xs font-mono uppercase tracking-widest text-indigo-500">
                  2-Stage Cycle
                </p>
                <ul className="space-y-1.5 text-slate-700">
                  <li>
                    <span className="font-mono font-semibold text-indigo-700">Stage 1</span> ·
                    Articulation (명료화)
                  </li>
                  <li>
                    <span className="font-mono font-semibold text-rose-700">Stage 2</span> ·
                    Reflection (성찰)
                  </li>
                </ul>
                <Separator />
                <p className="text-xs font-mono uppercase tracking-widest text-indigo-500">
                  7 Guidelines
                </p>
                <ul className="space-y-1 text-slate-600 text-[11px]">
                  <li>G1 즉답 금지</li>
                  <li>G2 3문장 + 1질문 cap</li>
                  <li>G3 모드 자각</li>
                  <li>G4 구조 우선 (색·폰트 X)</li>
                  <li>G5 공 패스</li>
                  <li className="font-semibold text-indigo-700">
                    G6 ★ Verbalize → Ground → Pass
                  </li>
                  <li>G7 논리 리모델링</li>
                </ul>
              </CardContent>
            </Card>

            {/* Mode toggle */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600" />
                  Mode 분기
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => setMode('mentor')}
                    className={cn(
                      'rounded-lg border px-2 py-2 text-xs transition',
                      mode === 'mentor'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold'
                        : 'border-indigo-100 text-slate-600 hover:bg-indigo-50',
                    )}
                  >
                    <GraduationCap className="mx-auto h-3.5 w-3.5 mb-0.5" />
                    Mentor
                  </button>
                  <button
                    onClick={() => setMode('vending')}
                    className={cn(
                      'rounded-lg border px-2 py-2 text-xs transition',
                      mode === 'vending'
                        ? 'border-amber-500 bg-amber-50 text-amber-700 font-semibold'
                        : 'border-indigo-100 text-slate-600 hover:bg-amber-50',
                    )}
                  >
                    <Zap className="mx-auto h-3.5 w-3.5 mb-0.5" />
                    Vending
                  </button>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  {mode === 'mentor'
                    ? '7 Guidelines 전체 활성. 사고 확장 우선.'
                    : '즉답 허용. 강사 대시보드에 모드 전환 알림.'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-rose-600" />
                  역할 분리 (RAI)
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2">
                <p className="rounded-lg bg-emerald-50 p-2 text-emerald-800">
                  ✅ 인지: 사고 외현화·진단·점진적 지원
                </p>
                <p className="rounded-lg bg-rose-50 p-2 text-rose-800">
                  ❌ 정서 위로 ("힘들지", "잘하고 있어") 금지
                </p>
                <p className="text-slate-600 leading-relaxed">
                  정서 신호 감지 시 → "강사 면담 요청" 옵션 노출.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  데모 시나리오
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5 text-xs">
                <button
                  onClick={() => playScript(RETURN_NONE_SCRIPT)}
                  className="w-full text-left rounded-lg px-3 py-2 text-slate-700 hover:bg-indigo-50 disabled:opacity-50"
                  disabled={isPlaying}
                >
                  · G6 ★ 함수 return None (3-Step)
                </button>
                <button
                  onClick={() => playScript(CHART_SCRIPT)}
                  className="w-full text-left rounded-lg px-3 py-2 text-slate-700 hover:bg-indigo-50 disabled:opacity-50"
                  disabled={isPlaying}
                >
                  · G7 차트 디자인 (Remodel)
                </button>
                <button
                  onClick={() => playScript(SCOPE_SCRIPT)}
                  className="w-full text-left rounded-lg px-3 py-2 text-slate-700 hover:bg-indigo-50 disabled:opacity-50"
                  disabled={isPlaying}
                >
                  · 지역/전역 스코프 (Articulation)
                </button>
                <button
                  onClick={() => playScript(VENDING_SCRIPT)}
                  className="w-full text-left rounded-lg px-3 py-2 text-slate-700 hover:bg-amber-50 disabled:opacity-50"
                  disabled={isPlaying}
                >
                  · Vending 모드 시연
                </button>
              </CardContent>
            </Card>
          </aside>

          {/* Chat area */}
          <section className="col-span-12 lg:col-span-9 flex flex-col gap-3 h-full">
            {/* Stage bar */}
            <Card>
              <CardContent className="py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="violet">
                    <Sparkles className="w-3 h-3 mr-1" /> CAM 멘토링 LLM
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      'font-mono text-[10px]',
                      mode === 'vending' && 'bg-amber-50 text-amber-700 border-amber-200',
                    )}
                  >
                    {mode === 'mentor' ? 'Mentor Mode' : 'Vending Mode'}
                  </Badge>
                  <Separator orientation="vertical" className="h-5 mx-1" />
                  {STAGES.map((s, i) => {
                    const isActive = currentStage === s.key;
                    return (
                      <React.Fragment key={s.key}>
                        <div
                          className={cn(
                            'flex items-center gap-1.5 text-xs whitespace-nowrap',
                            isActive
                              ? 'text-indigo-700 font-semibold'
                              : 'text-slate-400',
                          )}
                        >
                          <span
                            className={cn(
                              'w-1.5 h-1.5 rounded-full',
                              isActive ? 'bg-indigo-700 animate-pulse' : 'bg-slate-300',
                            )}
                          />
                          {s.label} ({s.ko})
                        </div>
                        {i < STAGES.length - 1 && (
                          <span className="text-slate-300 text-xs">↔</span>
                        )}
                      </React.Fragment>
                    );
                  })}
                  <div className="ml-auto">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={reset}
                      disabled={isPlaying}
                    >
                      <RefreshCw className="w-3 h-3" /> 초기화
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card className="flex-1 flex flex-col overflow-hidden">
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {messages.length === 0 && (
                    <div className="py-8 space-y-6">
                      <div className="text-center">
                        <Sparkles className="w-10 h-10 mx-auto text-indigo-500 mb-3" />
                        <h3 className="text-lg font-bold text-indigo-900">
                          AI는 정답 자판기가 아닙니다. 사고의 거울입니다.
                        </h3>
                        <p className="text-sm text-slate-600 mt-1.5">
                          {mode === 'mentor'
                            ? '업로드물에 즉답·평가하지 않습니다. G6 ★ Verbalize → Ground → Pass 3-Step으로 응답합니다.'
                            : 'Vending Mode: 빠른 결과 산출. 강사 대시보드에 전환 알림.'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-mono uppercase tracking-widest text-indigo-500 text-center">
                          예시 입력
                        </p>
                        <div className="mx-auto grid max-w-2xl gap-2 sm:grid-cols-2">
                          {SUGGESTED_QUESTIONS.map((q) => (
                            <button
                              key={q.text}
                              type="button"
                              onClick={() => handleSuggested(q.text)}
                              disabled={isPlaying}
                              className="group rounded-xl border border-indigo-100 bg-white p-3 text-left transition hover:border-indigo-300 hover:bg-indigo-50/50 disabled:opacity-50"
                            >
                              <div className="flex items-start gap-2">
                                <span className="flex-shrink-0 text-lg">{q.emoji}</span>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-semibold text-indigo-900 group-hover:text-indigo-700">
                                    {q.text}
                                  </div>
                                  <div className="mt-0.5 font-mono text-[10px] text-slate-500">
                                    {q.topic}
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mx-auto max-w-xl rounded-xl border border-amber-100 bg-amber-50/60 p-3 text-xs text-amber-800">
                        <AlertTriangle className="mr-1 -mt-0.5 inline h-3.5 w-3.5" />
                        Pre-Output Self-Check (C1~C7 Hard + S1~S5 Soft)이 응답 직전 매번
                        실행됩니다. 위반 시 응답 재생성.
                      </div>
                    </div>
                  )}

                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={cn(
                        'flex',
                        m.role === 'user' ? 'justify-end' : 'justify-start',
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line shadow-sm',
                          m.role === 'user'
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white border border-indigo-100 text-slate-800',
                        )}
                      >
                        {m.role === 'assistant' && m.labels && m.labels.length > 0 && (
                          <div className="mb-2 flex flex-wrap gap-1">
                            {m.labels.map((l) => (
                              <span
                                key={l}
                                className={cn(
                                  'rounded-full px-2 py-0.5 text-[10px] font-mono font-semibold',
                                  LABEL_COLOR[l],
                                )}
                              >
                                [{l}]
                              </span>
                            ))}
                          </div>
                        )}
                        {m.text}
                      </div>
                    </div>
                  ))}

                  {isPlaying && (
                    <div className="flex justify-start">
                      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 px-4 py-3">
                        <div className="flex gap-1">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" />
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500 [animation-delay:120ms]" />
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500 [animation-delay:240ms]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t border-indigo-100 p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      mode === 'mentor'
                        ? '코드·디자인·자료를 업로드하거나 막힌 지점을 적어주세요…'
                        : '[Vending] 빠르게 답이 필요한 질문…'
                    }
                    className="flex-1"
                    disabled={isPlaying}
                  />
                  <Button type="submit" disabled={isPlaying || !input.trim()}>
                    <Send className="w-4 h-4" />
                    전송
                  </Button>
                </form>
                <p className="mt-2 text-[10px] text-slate-400">
                  키워드: 'return'·'None'·'add'·'차트'·'파이'·'디자인'·'스코프'·'지역/전역'
                  → 해당 시나리오 재생. 그 외 → 기본 Articulation 응답.
                </p>
              </div>
            </Card>
          </section>
        </div>
      </main>
    </>
  );
}

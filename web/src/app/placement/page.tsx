'use client';

import * as React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ArrowRight, BellRing, ListChecks, MessageSquareCode, Sparkles, Target } from 'lucide-react';

/* ───────────────────────────────────────────
   F3. 학습목표 자기평가 (v2.1-C · Component 1)
   - 수업 전 사전 평가 → 수업 후 사후 평가
   - 격차(gap) 시각화 → 능력 착각 검출
   - Risk Score 가중치 15
   ─────────────────────────────────────────── */

type EvalLevel = 0 | 1 | 2; // 전혀 모름 / 들어봤음 / 할 수 있음

const LEVELS: { v: EvalLevel; label: string; desc: string }[] = [
  { v: 0, label: '전혀 모름', desc: '처음 듣는 개념' },
  { v: 1, label: '들어봤음', desc: '용어는 안다, 직접 못 함' },
  { v: 2, label: '할 수 있음', desc: '직접 작성해본 적 있음' },
];

const OBJECTIVES = [
  '함수를 정의하고 호출할 수 있다',
  '지역변수와 전역변수의 차이를 설명할 수 있다',
  '매개변수와 인자를 구분하여 사용할 수 있다',
];

const LESSON = 'Day 12 · 파이썬 함수와 스코프';

type Phase = 'pre' | 'post';

export default function SelfEvalPage() {
  const [phase, setPhase] = React.useState<Phase>('pre');
  const [pre, setPre] = React.useState<(EvalLevel | null)[]>(
    OBJECTIVES.map(() => null),
  );
  const [post, setPost] = React.useState<(EvalLevel | null)[]>(
    OBJECTIVES.map(() => null),
  );

  const current = phase === 'pre' ? pre : post;
  const setCurrent = phase === 'pre' ? setPre : setPost;

  function pick(i: number, v: EvalLevel) {
    const next = [...current];
    next[i] = v;
    setCurrent(next);
  }

  const allFilled = current.every((c) => c !== null);
  const preDone = pre.every((c) => c !== null);
  const postDone = post.every((c) => c !== null);

  const showResult = preDone && postDone;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 bg-cream-50">
        <div className="mx-auto max-w-3xl space-y-6">
          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="indigo">
                <Target className="mr-1 h-3 w-3" /> 학습자 컴포넌트 1
              </Badge>
              <Badge variant="outline">학습목표 자기평가</Badge>
              <Badge variant="outline" className="font-mono text-[10px]">
                Risk 가중치 15
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 tracking-tight">
              오늘 학습목표를 본인 말로 평가해보세요
            </h1>
            <p className="text-slate-600">
              {LESSON} · 수업 전 사전 평가 → 수업 후 사후 평가 → 격차(gap) 시각화로
              능력 착각을 검출합니다.
            </p>
          </header>

          {/* Phase tabs */}
          <div className="inline-flex rounded-full border border-indigo-100 bg-white p-1">
            {(['pre', 'post'] as Phase[]).map((p) => (
              <button
                key={p}
                onClick={() => setPhase(p)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-xs font-semibold transition',
                  phase === p
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:bg-indigo-50',
                )}
              >
                {p === 'pre' ? '① 수업 전' : '② 수업 후'}
                {(p === 'pre' ? preDone : postDone) && ' ✓'}
              </button>
            ))}
          </div>

          {/* Eval cards */}
          {!showResult && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base text-indigo-900">
                  {phase === 'pre' ? '수업 시작 5분 전' : '수업 종료 직후'}
                </CardTitle>
                <CardDescription>
                  각 학습목표에 대해 본인의 현재 상태를 한 가지만 선택하세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {OBJECTIVES.map((obj, i) => (
                  <div key={i} className="rounded-xl border border-indigo-100 p-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="text-sm font-medium text-slate-800">{obj}</p>
                    </div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      {LEVELS.map((lv) => {
                        const selected = current[i] === lv.v;
                        return (
                          <button
                            key={lv.v}
                            onClick={() => pick(i, lv.v)}
                            className={cn(
                              'rounded-lg border px-3 py-2 text-left text-xs transition',
                              selected
                                ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-300'
                                : 'border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50/30',
                            )}
                          >
                            <p
                              className={cn(
                                'font-semibold',
                                selected ? 'text-indigo-700' : 'text-slate-700',
                              )}
                            >
                              {lv.label}
                            </p>
                            <p className="mt-0.5 text-[10px] text-slate-500">{lv.desc}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between gap-3 pt-2">
                  <p className="text-xs text-slate-500">
                    {phase === 'pre'
                      ? '제출 후 수업이 시작됩니다.'
                      : '제출 후 사전/사후 격차가 시각화됩니다.'}
                  </p>
                  <Button
                    size="sm"
                    disabled={!allFilled}
                    onClick={() => {
                      if (phase === 'pre') setPhase('post');
                    }}
                  >
                    {phase === 'pre' ? '제출하고 수업 시작' : '제출하고 결과 보기'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {showResult && (
            <>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-base text-indigo-900">
                      사전 · 사후 격차 시각화
                    </CardTitle>
                    <Badge variant="indigo" className="font-mono text-[10px]">
                      gap = post − pre
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {OBJECTIVES.map((obj, i) => {
                    const p1 = pre[i] ?? 0;
                    const p2 = post[i] ?? 0;
                    const gap = p2 - p1;
                    const flagSuspicious = p1 === 0 && p2 === 2; // 0 → 할 수 있음
                    return (
                      <div key={i} className="rounded-xl border border-indigo-100 p-4">
                        <p className="text-sm font-medium text-slate-800">
                          {i + 1}. {obj}
                        </p>
                        <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr] items-center">
                          <Bar label="사전" value={p1} />
                          <Bar label="사후" value={p2} highlight />
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                          <span className="font-mono text-slate-500">
                            {LEVELS[p1].label} → {LEVELS[p2].label}
                          </span>
                          <span
                            className={cn(
                              'rounded-full px-2 py-0.5 font-mono',
                              gap > 0
                                ? 'bg-emerald-50 text-emerald-700'
                                : gap === 0
                                ? 'bg-slate-100 text-slate-600'
                                : 'bg-rose-50 text-rose-700',
                            )}
                          >
                            gap {gap >= 0 ? '+' : ''}
                            {gap}
                          </span>
                          {flagSuspicious && (
                            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-amber-800">
                              ⚠ 능력 착각 의심 신호 (0 → 할 수 있음)
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <Separator />
                  <div className="rounded-lg bg-indigo-50/60 p-3 text-xs text-indigo-700">
                    이 격차 데이터는 강사 대시보드 Risk Score에 가중치 15로 합산되며,
                    체크리스트(증거 입력)와 CAM 대화 신호와 함께 비교됩니다.
                  </div>
                </CardContent>
              </Card>

              {/* Next actions */}
              <div className="grid gap-3 sm:grid-cols-3">
                <NextLink
                  href="/tutor"
                  Icon={MessageSquareCode}
                  title="CAM 멘토링"
                  desc="격차가 큰 항목은 CAM 자습 큐로"
                />
                <NextLink
                  href="/checklist"
                  Icon={ListChecks}
                  title="체크리스트"
                  desc="증거 입력으로 능력 착각 확인"
                />
                <NextLink
                  href="/gap-map"
                  Icon={BellRing}
                  title="이수율 보기"
                  desc="동기 평균 대비 본인 위치"
                />
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

function Bar({
  label,
  value,
  highlight,
}: {
  label: string;
  value: EvalLevel;
  highlight?: boolean;
}) {
  const width = ((value + 1) / 3) * 100;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[10px] text-slate-500">
        <span>{label}</span>
        <span className="font-mono">{LEVELS[value].label}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-indigo-50">
        <div
          className={cn(
            'h-full rounded-full',
            highlight ? 'bg-indigo-600' : 'bg-indigo-300',
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function NextLink({
  href,
  Icon,
  title,
  desc,
}: {
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-indigo-100 bg-white p-4 transition hover:border-indigo-300 hover:bg-indigo-50/50"
    >
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 text-indigo-600" />
        <Sparkles className="h-3 w-3 text-indigo-300 opacity-0 transition group-hover:opacity-100" />
      </div>
      <p className="mt-2 text-sm font-semibold text-indigo-900">{title}</p>
      <p className="mt-0.5 text-xs text-slate-600">{desc}</p>
    </Link>
  );
}

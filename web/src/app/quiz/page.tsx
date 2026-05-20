'use client';

import * as React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Repeat, ArrowRight, CheckCircle2, XCircle, Clock } from 'lucide-react';

/* ───────────────────────────────────────────
   F6. 망각곡선 퀴즈 Pop-up (v2.1-C · Component 4)
   - Day 13 09:00 — 1일차 복습 (D+1)
   - 정답률 80%+ → 간격 연장, 50%- → 간격 단축 + 강사 알림
   - Risk Score 가중치 20
   ─────────────────────────────────────────── */

type QuizQuestion =
  | {
      kind: 'mcq';
      id: string;
      text: string;
      options: string[];
      answer: number;
    }
  | {
      kind: 'short';
      id: string;
      text: string;
      lines?: string[];
      answer: string;
      hint?: string;
    };

const SCHEDULE = [
  { day: 1, label: 'D+1', status: 'today' },
  { day: 3, label: 'D+3', status: 'upcoming' },
  { day: 7, label: 'D+7', status: 'upcoming' },
  { day: 16, label: 'D+16', status: 'upcoming' },
] as const;

const QUIZ: QuizQuestion[] = [
  {
    kind: 'mcq',
    id: 'q1',
    text: '다음 중 return이 있는 함수는?',
    options: [
      'def hello(): print("hi")',
      'def hello(): return "hi"',
      'def hello(): "hi"',
    ],
    answer: 1,
  },
  {
    kind: 'short',
    id: 'q2',
    text: '아래 코드의 출력은?',
    lines: ['x = 10', 'def f():', '    x = 20', 'f()', 'print(x)'],
    answer: '10',
    hint: '함수 안 x는 지역 변수, 함수 밖 x는 별개입니다.',
  },
  {
    kind: 'mcq',
    id: 'q3',
    text: '함수가 return 문 없이 끝나면 반환되는 값은?',
    options: ['0', 'None', '빈 문자열 ""', '에러 발생'],
    answer: 1,
  },
];

const LESSON = 'Day 12 · 파이썬 함수와 스코프';

export default function QuizPage() {
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);

  const startTime = React.useRef(Date.now());
  const [elapsed, setElapsed] = React.useState(0);
  React.useEffect(() => {
    if (submitted) return;
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime.current) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [submitted]);

  function isCorrect(q: QuizQuestion): boolean {
    const a = answers[q.id];
    if (a == null) return false;
    if (q.kind === 'mcq') return Number(a) === q.answer;
    return a.trim() === q.answer;
  }

  const correctCount = QUIZ.filter(isCorrect).length;
  const accuracy = Math.round((correctCount / QUIZ.length) * 100);
  const allAnswered = QUIZ.every((q) => answers[q.id] != null && answers[q.id] !== '');

  // 적응형 조정 로직
  let adaptiveNote: { label: string; tone: 'good' | 'bad' | 'mid' } = {
    label: '다음 간격 유지 (D+3 예정)',
    tone: 'mid',
  };
  if (submitted) {
    if (accuracy >= 80) {
      adaptiveNote = { label: '정답률 80%+ → 다음 간격 연장 (16일 → 30일)', tone: 'good' };
    } else if (accuracy < 50) {
      adaptiveNote = {
        label: '정답률 50% 미만 → 간격 단축 + 강사 대시보드 알림 전송',
        tone: 'bad',
      };
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 bg-cream-50">
        <div className="mx-auto max-w-3xl space-y-6">
          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="indigo">
                <Repeat className="mr-1 h-3 w-3" /> 학습자 컴포넌트 4
              </Badge>
              <Badge variant="outline">망각곡선 Pop-up · D+1</Badge>
              <Badge variant="outline" className="font-mono text-[10px]">
                Risk 가중치 20
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 tracking-tight">
              {LESSON} · 1일차 복습
            </h1>
            <p className="text-slate-600 leading-relaxed">
              Day 13 09:00 자동 노출 — 3문항, 약 2분. 정답률에 따라 다음 간격이 자동
              조정됩니다.
            </p>
          </header>

          {/* Schedule strip */}
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center gap-2 overflow-x-auto">
                {SCHEDULE.map((s, i) => (
                  <React.Fragment key={s.day}>
                    <div
                      className={cn(
                        'flex flex-col items-center rounded-xl border px-4 py-2',
                        s.status === 'today'
                          ? 'border-indigo-400 bg-indigo-50 text-indigo-700'
                          : 'border-indigo-100 bg-white text-slate-600',
                      )}
                    >
                      <span className="text-sm font-bold">{s.label}</span>
                      <span className="text-[10px] font-mono">{s.day}일 후</span>
                    </div>
                    {i < SCHEDULE.length - 1 && (
                      <span className="text-indigo-300">→</span>
                    )}
                  </React.Fragment>
                ))}
                <div className="ml-auto inline-flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="h-3 w-3" />
                  <span className="font-mono">
                    {Math.floor(elapsed / 60).toString().padStart(2, '0')}:
                    {(elapsed % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          {!submitted &&
            QUIZ.map((q, idx) => (
              <Card key={q.id}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Q{idx + 1}</Badge>
                    <Badge variant="secondary" className="font-mono text-[10px]">
                      {q.kind === 'mcq' ? '객관식' : '단답형'}
                    </Badge>
                  </div>
                  <CardTitle className="mt-2 text-base text-indigo-900">
                    {q.text}
                  </CardTitle>
                  {q.kind === 'short' && q.lines && (
                    <pre className="mt-2 rounded-lg bg-cream-100 p-3 text-xs font-mono text-slate-800">
                      {q.lines.join('\n')}
                    </pre>
                  )}
                </CardHeader>
                <CardContent className="space-y-2">
                  {q.kind === 'mcq' &&
                    q.options.map((opt, i) => {
                      const selected = answers[q.id] === String(i);
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() =>
                            setAnswers((prev) => ({ ...prev, [q.id]: String(i) }))
                          }
                          className={cn(
                            'flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm transition',
                            selected
                              ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-300'
                              : 'border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50/30',
                          )}
                        >
                          <span
                            className={cn(
                              'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full font-mono text-xs',
                              selected
                                ? 'bg-indigo-600 text-white'
                                : 'bg-indigo-50 text-indigo-600',
                            )}
                          >
                            {i + 1}
                          </span>
                          <code className="pt-0.5 font-mono text-xs">{opt}</code>
                        </button>
                      );
                    })}
                  {q.kind === 'short' && (
                    <Input
                      value={answers[q.id] ?? ''}
                      onChange={(e) =>
                        setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))
                      }
                      placeholder="정답 입력"
                      className="font-mono"
                    />
                  )}
                </CardContent>
              </Card>
            ))}

          {/* Submit */}
          {!submitted && (
            <div className="sticky bottom-4 z-20">
              <Card className="border-indigo-200 shadow-lg">
                <CardContent className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div className="text-xs text-slate-600">
                    답안 완료:{' '}
                    <span className="font-mono font-semibold text-indigo-700">
                      {Object.keys(answers).length}/{QUIZ.length}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setSubmitted(true)}
                    disabled={!allAnswered}
                  >
                    제출 <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Result */}
          {submitted && (
            <>
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="indigo">
                      <CheckCircle2 className="mr-1 h-3 w-3" /> 결과
                    </Badge>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      소요 {Math.floor(elapsed / 60)}분 {elapsed % 60}초
                    </Badge>
                  </div>
                  <CardTitle className="mt-2 text-indigo-900">
                    정답률{' '}
                    <span className="font-mono text-3xl text-indigo-700">{accuracy}%</span>{' '}
                    ({correctCount}/{QUIZ.length})
                  </CardTitle>
                  <CardDescription
                    className={cn(
                      adaptiveNote.tone === 'good' && 'text-emerald-700',
                      adaptiveNote.tone === 'bad' && 'text-rose-700',
                    )}
                  >
                    {adaptiveNote.label}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {QUIZ.map((q, idx) => {
                    const correct = isCorrect(q);
                    const userAnswer =
                      q.kind === 'mcq' ? q.options[Number(answers[q.id])] : answers[q.id];
                    const correctAnswer =
                      q.kind === 'mcq' ? q.options[q.answer] : q.answer;
                    return (
                      <div
                        key={q.id}
                        className={cn(
                          'rounded-xl border p-3',
                          correct
                            ? 'border-emerald-200 bg-emerald-50/40'
                            : 'border-rose-200 bg-rose-50/40',
                        )}
                      >
                        <div className="flex items-start gap-2">
                          {correct ? (
                            <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                          ) : (
                            <XCircle className="mt-0.5 h-4 w-4 text-rose-600" />
                          )}
                          <div className="flex-1 text-sm">
                            <p className="font-semibold text-slate-800">
                              Q{idx + 1}. {q.text}
                            </p>
                            <p className="mt-1 text-xs">
                              <span className="font-mono text-slate-500">내 답:</span>{' '}
                              <code className="rounded bg-white px-1.5 py-0.5">
                                {userAnswer ?? '(미입력)'}
                              </code>
                            </p>
                            {!correct && (
                              <p className="mt-1 text-xs">
                                <span className="font-mono text-slate-500">정답:</span>{' '}
                                <code className="rounded bg-white px-1.5 py-0.5 text-emerald-700">
                                  {correctAnswer}
                                </code>
                              </p>
                            )}
                            {q.kind === 'short' && !correct && q.hint && (
                              <p className="mt-1 text-xs text-slate-600">힌트: {q.hint}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">다음 단계</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Link href="/tutor">
                    <Button size="sm" variant="outline">
                      약점 개념 CAM 자습 →
                    </Button>
                  </Link>
                  <Link href="/gap-map">
                    <Button size="sm" variant="outline">
                      이수율로 돌아가기
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </>
  );
}

'use client';

import * as React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

// 백엔드 schemas/placement.py 와 동일
interface PlacementQuestion {
  id: number;
  question_text: string;
  options: string[];        // 예: ["1) tuple", "2) str", "3) list", "4) int"]
  category?: string;
  difficulty: number;
  order: number;
}
interface PlacementResult {
  id: number;
  level: number;            // 1 | 2 | 3
  score: number;
  total: number;
  category_scores: Record<string, { correct: number; total: number; ratio: number }>;
  gap_map?: unknown[];
}

// 옵션 문자열 "1) tuple" → {id:"1", text:"tuple"}
function parseOption(raw: string): { id: string; text: string } {
  const m = raw.match(/^\s*(\d+)\s*[\)\.]\s*(.+)$/);
  if (m) return { id: m[1], text: m[2].trim() };
  return { id: raw, text: raw };
}

const LEVEL_LABELS: Record<number, { name: string; desc: string }> = {
  1: { name: 'Level 1 · 기초', desc: '핵심 개념을 다지는 단계입니다.' },
  2: { name: 'Level 2 · 중급', desc: '실무형 과제를 수행할 수 있는 단계입니다.' },
  3: { name: 'Level 3 · 심화', desc: '자율적으로 프로젝트를 이끌 수 있는 단계입니다.' },
};

export default function PlacementPage() {
  const [questions, setQuestions] = React.useState<PlacementQuestion[] | null>(null);
  // answers key는 question_id(number 문자열), value는 선택한 옵션의 id("1"/"2"/"3"/"4")
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [result, setResult] = React.useState<PlacementResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    api<PlacementQuestion[]>('/api/diagnose/questions')
      .then((d) => setQuestions(Array.isArray(d) ? d : []))
      .catch((e) => setError(e.message));
  }, []);

  async function onSubmit() {
    setSubmitting(true);
    setError(null);
    try {
      // 백엔드 PlacementSubmission 은 list[dict] 형식의 answers 를 기대
      // → [{question_id: number, answer: string}]
      const payload = {
        answers: Object.entries(answers).map(([qid, ans]) => ({
          question_id: Number(qid),
          answer: ans,
        })),
      };
      const res = await api<PlacementResult>('/api/diagnose/submit', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      setResult(res);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 bg-cream-50">
        <div className="max-w-3xl mx-auto space-y-6">
          <header>
            <Badge variant="indigo">수준 진단 · ZPD</Badge>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-indigo-900 tracking-tight">
              당신의 현재 수준을 확인합니다
            </h1>
            <p className="mt-2 text-slate-600">
              응답을 바탕으로 Lv1/Lv2/Lv3 판정과 카테고리별 갭맵을 생성합니다.
            </p>
          </header>

          {error && (
            <Card>
              <CardContent className="pt-6 text-red-600 text-sm">{error}</CardContent>
            </Card>
          )}

          {!questions && !error && (
            <div className="space-y-3">
              <Skeleton className="h-28" />
              <Skeleton className="h-28" />
              <Skeleton className="h-28" />
            </div>
          )}

          {result ? (
            <Card>
              <CardHeader>
                <Badge variant="indigo" className="w-fit">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> 진단 완료
                </Badge>
                <CardTitle className="mt-2 text-indigo-900">
                  {LEVEL_LABELS[result.level]?.name ?? `Level ${result.level}`}
                </CardTitle>
                <CardDescription>
                  {LEVEL_LABELS[result.level]?.desc} ·{' '}
                  <span className="font-mono text-indigo-700">
                    {result.score}/{result.total}
                  </span>{' '}
                  정답
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.category_scores && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {Object.entries(result.category_scores).map(([cat, s]) => (
                      <div
                        key={cat}
                        className="rounded-lg border border-indigo-100 bg-indigo-50/40 px-3 py-2"
                      >
                        <div className="font-semibold text-indigo-700">{cat}</div>
                        <div className="font-mono text-indigo-900 mt-0.5">
                          {s.correct}/{s.total}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Link href="/gap-map">
                  <Button size="lg">
                    갭맵 확인하러 가기 <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            questions && (
              <>
                {questions.map((q, idx) => {
                  const parsedOptions = q.options.map(parseOption);
                  return (
                    <Card key={q.id}>
                      <CardHeader>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline">Q{idx + 1}</Badge>
                          {q.category && <Badge variant="indigo">{q.category}</Badge>}
                          <Badge variant="secondary" className="font-mono">
                            Lv{q.difficulty}
                          </Badge>
                        </div>
                        <CardTitle className="mt-3 text-lg text-indigo-900 leading-relaxed">
                          {q.question_text}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {parsedOptions.map((opt) => {
                          const selected = answers[String(q.id)] === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() =>
                                setAnswers({ ...answers, [String(q.id)]: opt.id })
                              }
                              className={`w-full text-left rounded-xl border p-3 text-sm transition flex items-start gap-3 ${
                                selected
                                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-medium shadow-sm'
                                  : 'border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50/30'
                              }`}
                            >
                              <span
                                className={`flex-shrink-0 w-6 h-6 rounded-full font-mono text-xs flex items-center justify-center ${
                                  selected
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-indigo-50 text-indigo-500'
                                }`}
                              >
                                {opt.id}
                              </span>
                              <span className="pt-0.5">{opt.text}</span>
                            </button>
                          );
                        })}
                      </CardContent>
                    </Card>
                  );
                })}
                {questions.length > 0 && (
                  <Button
                    size="lg"
                    onClick={onSubmit}
                    disabled={submitting || Object.keys(answers).length === 0}
                    className="w-full"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> 제출 중
                      </>
                    ) : (
                      <>
                        진단 제출 ({Object.keys(answers).length}/{questions.length}){' '}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                )}
              </>
            )
          )}
        </div>
      </main>
    </>
  );
}

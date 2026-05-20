'use client';

import * as React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ClipboardCheck, ArrowRight, CheckCircle2, MessageSquareCode, AlertCircle } from 'lucide-react';

/* ───────────────────────────────────────────
   F4. 체크리스트 (v2.1-C · Component 2)
   - 수업 후, 증거 입력 필수
   - 미체크 항목 → CAM 자습 큐로 자동 큐잉
   - Risk Score 가중치 15 (증거 미입력 비율)
   ─────────────────────────────────────────── */

interface ChecklistItem {
  id: string;
  label: string;
  evidencePrompt: string;
  placeholder: string;
}

const ITEMS: ChecklistItem[] = [
  {
    id: 'def',
    label: 'def 키워드로 함수를 직접 작성해보았다',
    evidencePrompt: '작성한 코드 1줄을 입력해주세요',
    placeholder: 'def add(a, b): return a + b',
  },
  {
    id: 'return',
    label: 'return 값을 가진 함수를 만들어보았다',
    evidencePrompt: '어떤 값을 반환했나요?',
    placeholder: '두 수의 합을 반환',
  },
  {
    id: 'scope',
    label: '전역/지역 스코프 예제를 직접 실행해보았다',
    evidencePrompt: '실행 결과 한 줄',
    placeholder: '함수 밖에서는 x가 10으로 유지됨',
  },
];

const LESSON = 'Day 12 · 파이썬 함수와 스코프';

export default function ChecklistPage() {
  const [evidence, setEvidence] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);

  const completed = ITEMS.filter((i) => evidence[i.id]?.trim()).length;
  const total = ITEMS.length;
  const missing = ITEMS.filter((i) => !evidence[i.id]?.trim());

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 bg-cream-50">
        <div className="mx-auto max-w-3xl space-y-6">
          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="indigo">
                <ClipboardCheck className="mr-1 h-3 w-3" /> 학습자 컴포넌트 2
              </Badge>
              <Badge variant="outline">체크리스트 · 증거 입력 필수</Badge>
              <Badge variant="outline" className="font-mono text-[10px]">
                Risk 가중치 15
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 tracking-tight">
              {LESSON} · 수업 종료 직후
            </h1>
            <p className="text-slate-600 leading-relaxed">
              체크박스만 누르는 게 아니라, 작성한 코드·실행 결과를 한 줄로 직접
              입력해야 완료됩니다.{' '}
              <span className="font-semibold text-indigo-700">
                이론을 들은 것과 할 수 있는 것은 다릅니다.
              </span>
            </p>
          </header>

          {!submitted && (
            <>
              {ITEMS.map((it) => {
                const value = evidence[it.id] ?? '';
                const isFilled = value.trim().length > 0;
                return (
                  <Card key={it.id}>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            'mt-0.5 flex h-6 w-6 items-center justify-center rounded-md border-2',
                            isFilled
                              ? 'border-indigo-600 bg-indigo-600 text-white'
                              : 'border-indigo-200 bg-white',
                          )}
                        >
                          {isFilled && <CheckCircle2 className="h-4 w-4" />}
                        </div>
                        <CardTitle className="text-base leading-snug text-slate-900">
                          {it.label}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2 pl-12">
                      <Label htmlFor={it.id} className="text-xs text-slate-500">
                        → {it.evidencePrompt}
                      </Label>
                      <Input
                        id={it.id}
                        value={value}
                        onChange={(e) =>
                          setEvidence((prev) => ({ ...prev, [it.id]: e.target.value }))
                        }
                        placeholder={it.placeholder}
                        className="font-mono text-sm"
                      />
                    </CardContent>
                  </Card>
                );
              })}

              <div className="sticky bottom-4 z-20">
                <Card className="border-indigo-200 shadow-lg">
                  <CardContent className="flex flex-wrap items-center justify-between gap-3 py-4">
                    <div className="text-xs text-slate-600">
                      증거 입력 완료:{' '}
                      <span className="font-mono font-semibold text-indigo-700">
                        {completed}/{total}
                      </span>
                    </div>
                    <Button size="sm" onClick={() => setSubmitted(true)}>
                      제출하기 <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {submitted && (
            <>
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="indigo">
                      <CheckCircle2 className="mr-1 h-3 w-3" /> 제출 완료
                    </Badge>
                    <span className="text-xs text-slate-500">
                      {completed}/{total} 항목 증거 입력됨
                    </span>
                  </div>
                  <CardTitle className="mt-2 text-indigo-900">결과 요약</CardTitle>
                  <CardDescription>
                    미입력 항목은 CAM 자습 큐로 자동 큐잉됩니다.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {ITEMS.map((it) => {
                      const value = evidence[it.id]?.trim();
                      return (
                        <div
                          key={it.id}
                          className={cn(
                            'rounded-xl border p-3',
                            value
                              ? 'border-indigo-100 bg-white'
                              : 'border-amber-200 bg-amber-50/40',
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={cn(
                                'mt-0.5 inline-block h-2 w-2 rounded-full',
                                value ? 'bg-indigo-500' : 'bg-amber-500',
                              )}
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-slate-800">
                                {it.label}
                              </p>
                              {value ? (
                                <p className="mt-1 rounded bg-cream-100 px-2 py-1 font-mono text-xs text-slate-700">
                                  {value}
                                </p>
                              ) : (
                                <p className="mt-1 text-xs text-amber-700">
                                  <AlertCircle className="-mt-0.5 mr-1 inline h-3 w-3" />
                                  증거 미입력 → CAM 자습 큐로 이동
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {missing.length > 0 && (
                    <div className="rounded-lg bg-indigo-50 p-4">
                      <p className="text-xs font-semibold text-indigo-800">
                        다음 학습 추천
                      </p>
                      <p className="mt-1 text-xs text-indigo-700">
                        미입력 {missing.length}개 항목에 대해 CAM 멘토링으로 자기 점검을
                        진행해보세요.
                      </p>
                      <Link href="/tutor">
                        <Button size="sm" className="mt-3">
                          <MessageSquareCode className="h-4 w-4" /> CAM 자습 큐 열기
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </>
  );
}

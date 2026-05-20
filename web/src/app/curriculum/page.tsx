'use client';

import * as React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  CalendarDays,
  Hash,
  BookOpen,
  Target,
  Layers,
  ClipboardList,
  Bot,
  HelpCircle,
  Repeat,
  Save,
  Wand2,
} from 'lucide-react';

/* ───────────────────────────────────────────
   F1. 강사 측 커리큘럼 등록 칸 (v2.1-C)
   Python 부트캠프 Week 3 / Day 12 예시 프리필
   ─────────────────────────────────────────── */

const SAMPLE = {
  week: 'Week 3',
  day: 'Day 12 / 총 120일',
  topic: '파이썬 함수와 스코프',
  objectives: [
    '함수를 정의하고 호출할 수 있다',
    '지역변수와 전역변수의 차이를 설명할 수 있다',
    '매개변수와 인자를 구분하여 사용할 수 있다',
  ],
  prerequisites: ['변수 선언', '자료형', '조건문'],
  checklist: [
    {
      label: 'def 키워드로 함수를 직접 작성했는가',
      evidenceHint: '작성한 코드 1줄을 입력',
    },
    {
      label: 'return 값을 가진 함수를 만들었는가',
      evidenceHint: '어떤 값을 반환했는지 한 줄로',
    },
    {
      label: '전역/지역 스코프 예제를 직접 실행했는가',
      evidenceHint: '실행 결과 한 줄',
    },
  ],
  camScope: ['함수 정의', '스코프', '매개변수'],
  outOfScopeRule: '범위 외 질문은 즉답 대신 단계별 사고를 유도합니다.',
  quizPool: {
    multipleChoice: 5,
    shortAnswer: 2,
    codeFillBlank: 3,
  },
  forgettingIntervals: [1, 3, 7, 16],
} as const;

function SectionHeader({
  Icon,
  title,
  hint,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <h3 className="text-sm font-bold text-indigo-900">{title}</h3>
        {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
      </div>
    </div>
  );
}

export default function CurriculumPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 bg-cream-50">
        <div className="mx-auto max-w-5xl space-y-6">
          <header className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="indigo">F1 · 강사 커리큘럼 등록</Badge>
              <Badge variant="outline" className="font-mono">
                v2.1-C
              </Badge>
              <Badge variant="outline">학습자용 / 강사 등록 · 양면 뷰</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 tracking-tight">
              오늘 수업을 등록하면 5개 학습자 컴포넌트가 자동 생성됩니다
            </h1>
            <p className="text-slate-600 leading-relaxed">
              아래 입력은 그대로{' '}
              <Link href="/placement" className="text-indigo-700 underline underline-offset-2">
                학습목표 자기평가
              </Link>
              ,{' '}
              <Link href="/tutor" className="text-indigo-700 underline underline-offset-2">
                CAM 멘토링 LLM 응답 범위
              </Link>
              , 체크리스트, 망각곡선 퀴즈 스케줄에 흘러갑니다.
            </p>
          </header>

          {/* 메타 정보 */}
          <Card>
            <CardHeader>
              <SectionHeader Icon={CalendarDays} title="주차 · 회차 · 주제" />
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="week" className="text-xs text-slate-500">
                  주차
                </Label>
                <Input id="week" defaultValue={SAMPLE.week} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="day" className="text-xs text-slate-500">
                  회차
                </Label>
                <Input id="day" defaultValue={SAMPLE.day} />
              </div>
              <div className="space-y-1.5 sm:col-span-3 md:col-span-1">
                <Label htmlFor="topic" className="text-xs text-slate-500">
                  주제
                </Label>
                <Input id="topic" defaultValue={SAMPLE.topic} />
              </div>
            </CardContent>
          </Card>

          {/* 학습목표 */}
          <Card>
            <CardHeader>
              <SectionHeader
                Icon={Target}
                title="학습목표 (행동 동사 기반 · Mager ABCD)"
                hint="‘설명할 수 있다 / 구분할 수 있다 / 작성할 수 있다’ 등 관찰 가능한 동사로 작성합니다."
              />
            </CardHeader>
            <CardContent className="space-y-3">
              {SAMPLE.objectives.map((o, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-2 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <Input defaultValue={o} className="flex-1" />
                </div>
              ))}
              <Button variant="outline" size="sm" className="text-xs">
                + 학습목표 추가
              </Button>
            </CardContent>
          </Card>

          {/* 사전 요구 지식 */}
          <Card>
            <CardHeader>
              <SectionHeader
                Icon={Layers}
                title="사전 요구 지식"
                hint="갭맵 진단에서 미달 시 보강 큐로 큐잉됩니다."
              />
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {SAMPLE.prerequisites.map((p) => (
                  <Badge key={p} variant="secondary" className="px-3 py-1">
                    {p}
                  </Badge>
                ))}
                <button className="rounded-full border border-dashed border-indigo-300 px-3 py-1 text-xs text-indigo-600 hover:bg-indigo-50">
                  + 태그
                </button>
              </div>
            </CardContent>
          </Card>

          {/* 체크리스트 */}
          <Card>
            <CardHeader>
              <SectionHeader
                Icon={ClipboardList}
                title="수업 후 체크리스트 (증거 입력형)"
                hint="체크박스만으로 완료되지 않습니다. 학습자는 코드/결과 한 줄을 직접 입력해야 합니다."
              />
            </CardHeader>
            <CardContent className="space-y-4">
              {SAMPLE.checklist.map((c, i) => (
                <div key={i} className="rounded-xl border border-indigo-100 p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-2 inline-block h-2 w-2 rounded-full bg-indigo-500" />
                    <Input defaultValue={c.label} className="flex-1" />
                  </div>
                  <div className="ml-5 grid gap-2 sm:grid-cols-[140px_1fr] sm:items-center">
                    <Label className="text-xs text-slate-500">증거 입력 안내</Label>
                    <Input
                      defaultValue={c.evidenceHint}
                      className="text-xs text-slate-600"
                    />
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="text-xs">
                + 체크 항목 추가
              </Button>
            </CardContent>
          </Card>

          {/* CAM 응답 범위 */}
          <Card>
            <CardHeader>
              <SectionHeader
                Icon={Bot}
                title="CAM LLM 응답 범위 (G6 ★ Verbalize → Ground → Pass)"
                hint="범위 안 → Phase 2까지 지원, 범위 밖 → Phase 1으로 사고 유도."
              />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {SAMPLE.camScope.map((s) => (
                  <Badge key={s} variant="indigo" className="px-3 py-1">
                    {s}
                  </Badge>
                ))}
                <button className="rounded-full border border-dashed border-indigo-300 px-3 py-1 text-xs text-indigo-600 hover:bg-indigo-50">
                  + 허용 범위
                </button>
              </div>
              <Textarea
                defaultValue={SAMPLE.outOfScopeRule}
                className="text-sm"
                rows={2}
              />
            </CardContent>
          </Card>

          {/* 퀴즈 풀 */}
          <Card>
            <CardHeader>
              <SectionHeader
                Icon={HelpCircle}
                title="퀴즈 풀"
                hint="망각곡선 팝업과 자기평가 후 재인출에 사용됩니다."
              />
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label className="text-xs text-slate-500">객관식</Label>
                <Input type="number" defaultValue={SAMPLE.quizPool.multipleChoice} />
              </div>
              <div>
                <Label className="text-xs text-slate-500">단답형</Label>
                <Input type="number" defaultValue={SAMPLE.quizPool.shortAnswer} />
              </div>
              <div>
                <Label className="text-xs text-slate-500">코드 빈칸 채우기</Label>
                <Input type="number" defaultValue={SAMPLE.quizPool.codeFillBlank} />
              </div>
            </CardContent>
          </Card>

          {/* 망각곡선 */}
          <Card>
            <CardHeader>
              <SectionHeader
                Icon={Repeat}
                title="망각곡선 간격 (Ebbinghaus)"
                hint="정답률 80%↑ → 다음 간격 연장, 50%↓ → 단축 + 강사 대시보드 알림."
              />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 overflow-x-auto">
                {SAMPLE.forgettingIntervals.map((d, i) => (
                  <React.Fragment key={d}>
                    <div className="flex flex-col items-center rounded-xl border border-indigo-100 px-4 py-3">
                      <span className="text-lg font-bold text-indigo-700">D+{d}</span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {d}일 후 복습
                      </span>
                    </div>
                    {i < SAMPLE.forgettingIntervals.length - 1 && (
                      <span className="text-indigo-400 font-bold">→</span>
                    )}
                  </React.Fragment>
                ))}
                <button className="ml-2 rounded-xl border border-dashed border-indigo-300 px-4 py-3 text-xs text-indigo-600 hover:bg-indigo-50">
                  + 간격
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Save bar */}
          <div className="sticky bottom-4 z-20">
            <Card className="border-indigo-200 shadow-lg">
              <CardContent className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Wand2 className="h-4 w-4 text-indigo-500" />
                  저장 시 학습자 5개 컴포넌트 + 강사 대시보드 Risk Score 자동 연동
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    임시 저장
                  </Button>
                  <Button size="sm">
                    <Save className="h-4 w-4" /> 등록하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          {/* 매핑 안내 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base text-indigo-900">
                이 등록이 어디로 흐르는가
              </CardTitle>
              <CardDescription>
                F1 입력은 학습자 5개 컴포넌트와 강사 대시보드 Risk Score 가중치로 흘러갑니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-indigo-100 text-left text-xs uppercase text-slate-500">
                      <th className="py-2 pr-4">F1 입력</th>
                      <th className="py-2 pr-4">학습자 컴포넌트</th>
                      <th className="py-2 pr-4">강사 대시보드</th>
                      <th className="py-2">Risk 가중치</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    {[
                      ['학습목표', '1) 자기평가 (수업 전/후)', '사전·사후 격차', '15'],
                      ['체크리스트', '2) 증거 입력 체크리스트', '증거 미입력 비율', '15'],
                      ['CAM 응답 범위', '3) CAM 멘토링 LLM', '즉답 요구 + 얕은 회고', '10+10'],
                      ['퀴즈 풀 + 망각곡선', '4) 망각곡선 퀴즈', '정답률 50% 미만', '20'],
                      ['전체 회차', '0) 이수율', '동기 평균 대비 위치', '20'],
                    ].map((row, i) => (
                      <tr
                        key={i}
                        className="border-b border-indigo-50 last:border-0"
                      >
                        {row.map((cell, j) => (
                          <td key={j} className={j === 3 ? 'py-3 font-mono text-xs text-indigo-700' : 'py-3 pr-4'}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}

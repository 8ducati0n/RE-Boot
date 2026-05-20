'use client';

import * as React from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { GapMapDonut, type GapMapDatum } from '@/components/GapMapDonut';
import { GapMapRadar } from '@/components/GapMapRadar';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Compass, ShieldAlert, TrendingUp, Users } from 'lucide-react';

/* ───────────────────────────────────────────
   F0. 전체 과정 이수율 + 동기 비교 (v2.1-C · Component 0)
   - 상시 노출
   - 하위 25% 학습자 → 비교 정보 노출 약화 (자기효능감 보호)
   - Risk Score 가중치 20
   ─────────────────────────────────────────── */

const PROGRESS_METRICS = [
  { key: 'overall', label: '전체 진행', value: 42, max: 100, sub: 'Day 12/120' },
  { key: 'objectives', label: '학습목표 달성', value: 38, max: 100, sub: '45/120 목표' },
  { key: 'checklist', label: '체크리스트', value: 55, max: 100, sub: '66/120 항목' },
  { key: 'quiz', label: '퀴즈 정답률', value: 72, max: 100, sub: 'D+1·D+3 누적' },
] as const;

const COHORT_AVG = {
  overall: 51,
  objectives: 47,
  checklist: 58,
  quiz: 70,
};

// 하위 25% 가드: 본인 이수율이 cohort 평균 - 15% 미만이면 비교 정보를 흐리게 처리
const isBottomQuartile = PROGRESS_METRICS[0].value < COHORT_AVG.overall - 8;

export default function ProgressPage() {
  const [data, setData] = React.useState<GapMapDatum[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [showCompare, setShowCompare] = React.useState(!isBottomQuartile);

  React.useEffect(() => {
    api<{ categories: Record<string, any>; gaps?: any[] }>('/api/diagnose/gap-map')
      .then((d) => {
        const cats = d.categories ?? {};
        const arr: GapMapDatum[] = Object.entries(cats).map(
          ([name, stats]: [string, any]) => ({
            category: name,
            owned: stats.owned ?? 0,
            learning: stats.learning ?? 0,
            gap: (stats.weak ?? 0) + (stats.gap ?? 0),
          }),
        );
        setData(arr);
      })
      .catch((e) => setError(e.message));
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 bg-cream-50">
        <div className="mx-auto max-w-6xl space-y-8">
          <header className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="indigo">
                <TrendingUp className="mr-1 h-3 w-3" /> 학습자 컴포넌트 0
              </Badge>
              <Badge variant="outline">전체 과정 이수율 (상시)</Badge>
              <Badge variant="outline" className="font-mono text-[10px]">
                Risk 가중치 20
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 tracking-tight">
              Python 부트캠프 · 진행률
            </h1>
            <p className="text-slate-600 leading-relaxed">
              본인의 객관적 위치를 인식하고 메타인지를 보정합니다. 다만 하위 25%
              학습자에게는 비교 정보를 약화해 자기효능감을 보호합니다.
            </p>
          </header>

          {/* Progress bars */}
          <Card>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-base text-indigo-900">
                  나의 진행률
                </CardTitle>
                <div className="flex items-center gap-2">
                  {isBottomQuartile && (
                    <Badge variant="outline" className="font-mono text-[10px] text-amber-700 border-amber-200 bg-amber-50">
                      <ShieldAlert className="mr-1 h-3 w-3" /> 비교 노출 약화 활성
                    </Badge>
                  )}
                  <button
                    onClick={() => setShowCompare((s) => !s)}
                    className="rounded-full border border-indigo-100 px-3 py-1 text-xs text-indigo-700 hover:bg-indigo-50"
                  >
                    <Users className="-mt-0.5 mr-1 inline h-3 w-3" />
                    {showCompare ? '동기 평균 숨기기' : '동기 평균 보기'}
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {PROGRESS_METRICS.map((m) => {
                const cohort = (COHORT_AVG as Record<string, number>)[m.key];
                const youAhead = m.value >= cohort;
                return (
                  <div key={m.key} className="space-y-2">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-sm font-medium text-slate-800">{m.label}</p>
                      <p className="font-mono text-xs text-slate-500">{m.sub}</p>
                    </div>
                    <div className="relative h-3 w-full overflow-hidden rounded-full bg-indigo-50">
                      <div
                        className="h-full rounded-full bg-indigo-600 transition-all"
                        style={{ width: `${m.value}%` }}
                      />
                      {showCompare && (
                        <div
                          className={cn(
                            'absolute top-0 h-full w-0.5',
                            youAhead ? 'bg-emerald-500' : 'bg-rose-500',
                          )}
                          style={{ left: `${cohort}%` }}
                          aria-label={`동기 평균 ${cohort}%`}
                        />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-semibold text-indigo-700">
                        {m.value}%
                      </span>
                      {showCompare && (
                        <span
                          className={cn(
                            'font-mono',
                            isBottomQuartile ? 'text-slate-400' : 'text-slate-500',
                          )}
                        >
                          동기 평균 {cohort}%
                          {!isBottomQuartile && (
                            <span
                              className={cn(
                                'ml-2',
                                youAhead ? 'text-emerald-600' : 'text-rose-600',
                              )}
                            >
                              {youAhead ? '▲' : '▼'} {Math.abs(m.value - cohort)}p
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Scenario callout */}
          <Card>
            <CardContent className="py-5 text-sm leading-relaxed text-slate-700">
              {isBottomQuartile ? (
                <p>
                  <ShieldAlert className="-mt-0.5 mr-1 inline h-4 w-4 text-amber-600" />
                  현재 비교 정보 노출이 약화되어 있습니다. 본인의 진행률에만 집중해
                  체크리스트 증거 입력과 CAM 자습 큐를 우선 처리해보세요.
                </p>
              ) : (
                <p>
                  <Users className="-mt-0.5 mr-1 inline h-4 w-4 text-indigo-600" />
                  본인 이수율 {PROGRESS_METRICS[0].value}% vs 동기 평균{' '}
                  {COHORT_AVG.overall}% → 객관적 위치 인식 → 메타인지 보정 단계로
                  진입합니다.
                </p>
              )}
            </CardContent>
          </Card>

          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="indigo">
                <Compass className="mr-1 h-3 w-3" /> 카테고리별 갭맵 · ZPD
              </Badge>
              <p className="text-xs text-slate-500">보유 · 학습중 · 갭 비율</p>
            </div>

            {error && (
              <Card>
                <CardContent className="pt-6 text-xs text-slate-500">
                  카테고리 갭맵 데이터를 불러오지 못했습니다. ({error})
                </CardContent>
              </Card>
            )}

            {!data && !error && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-64" />
                ))}
              </div>
            )}

            {data && data.length > 0 && (
              <>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {data.map((d) => (
                    <Card key={d.category}>
                      <CardHeader>
                        <CardTitle className="text-base">{d.category}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex justify-center">
                        <GapMapDonut data={d} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">전체 역량 레이더</CardTitle>
                    <CardDescription>모든 카테고리를 한 화면에서</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <GapMapRadar data={data} />
                  </CardContent>
                </Card>
              </>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

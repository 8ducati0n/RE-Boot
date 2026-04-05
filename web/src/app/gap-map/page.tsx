'use client';

import * as React from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { GapMapDonut, type GapMapDatum } from '@/components/GapMapDonut';
import { GapMapSummary } from '@/components/GapMapSummary';
import { api } from '@/lib/api';
import { Compass } from 'lucide-react';

export default function GapMapPage() {
  const [data, setData] = React.useState<GapMapDatum[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // 백엔드 응답: {categories: {카테고리명: {total, owned, learning, weak, gap, gap_ratio}}, gaps: [...]}
    // weak 는 시각화 상 gap 과 함께 "갭" 세그먼트로 병합
    api<{ categories: Record<string, any>; gaps?: any[] }>('/api/diagnose/gap-map')
      .then((d) => {
        const cats = d.categories ?? {};
        const arr: GapMapDatum[] = Object.entries(cats).map(([name, stats]: [string, any]) => ({
          category: name,
          owned: stats.owned ?? 0,
          learning: stats.learning ?? 0,
          gap: (stats.weak ?? 0) + (stats.gap ?? 0),
        }));
        setData(arr);
      })
      .catch((e) => setError(e.message));
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 bg-cream-50">
        <div className="max-w-6xl mx-auto space-y-8">
          <header>
            <Badge variant="indigo">
              <Compass className="w-3 h-3 mr-1" /> 갭맵 · Zone of Proximal Development
            </Badge>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-indigo-900 tracking-tight">
              카테고리별 학습 지도
            </h1>
            <p className="mt-2 text-slate-600">
              보유 · 학습중 · 갭 비율을 한눈에 확인하고 다음 학습 경로를 결정하세요.
            </p>
          </header>

          {error && (
            <Card>
              <CardContent className="pt-6 text-sm text-red-600">{error}</CardContent>
            </Card>
          )}

          {!data && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          )}

          {data && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          )}

          {data && data.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-indigo-900 tracking-tight">
                전체 역량 현황
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <GapMapSummary data={data} />
                </CardContent>
              </Card>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

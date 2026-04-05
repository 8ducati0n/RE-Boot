'use client';

import * as React from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/lib/api';
import { BookOpen, CheckCircle2, Clock, Lock } from 'lucide-react';

interface CurriculumItem {
  id: number;
  title: string;
  item_type?: string;
  skill_id?: number | null;
  order?: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED';
}

interface CurriculumResponse {
  id: number;
  student_id: number;
  title: string;
  status: string;
  created_at: string;
  items: CurriculumItem[];
}

const statusConfig: Record<
  CurriculumItem['status'],
  { label: string; variant: 'outline' | 'indigo' | 'secondary'; icon: React.ReactNode }
> = {
  PENDING: { label: '대기', variant: 'outline', icon: <Lock className="w-3 h-3" /> },
  IN_PROGRESS: {
    label: '진행 중',
    variant: 'secondary',
    icon: <Clock className="w-3 h-3" />,
  },
  COMPLETED: {
    label: '완료',
    variant: 'indigo',
    icon: <CheckCircle2 className="w-3 h-3" />,
  },
  SKIPPED: { label: '건너뜀', variant: 'outline', icon: <BookOpen className="w-3 h-3" /> },
};

export default function CurriculumPage() {
  const [curriculum, setCurriculum] = React.useState<CurriculumResponse | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    api<CurriculumResponse>('/api/adapt/curriculum')
      .then((d) => setCurriculum(d))
      .catch((e) => setError(e.message));
  }, []);
  const items = curriculum?.items ?? null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 bg-cream-50">
        <div className="max-w-4xl mx-auto space-y-6">
          <header>
            <Badge variant="indigo">적응형 커리큘럼 · AI-TPACK</Badge>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-indigo-900 tracking-tight">
              나를 위한 학습 경로
            </h1>
            <p className="mt-2 text-slate-600">
              AI가 갭맵을 기반으로 생성하고, 교수자가 검토한 학습 경로입니다.
            </p>
          </header>

          {error && (
            <Card>
              <CardContent className="pt-6 text-sm text-red-600">{error}</CardContent>
            </Card>
          )}

          {!items && !error && (
            <div className="space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-28" />
              ))}
            </div>
          )}

          {items && (
            <div className="space-y-3">
              {items.map((it, idx) => {
                const conf = statusConfig[it.status];
                return (
                  <Card key={it.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs text-slate-400">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          {it.category && (
                            <Badge variant="outline">{it.category}</Badge>
                          )}
                          <Badge variant={conf.variant}>
                            <span className="inline-flex items-center gap-1">
                              {conf.icon} {conf.label}
                            </span>
                          </Badge>
                        </div>
                        {it.estimated_minutes && (
                          <span className="text-xs text-indigo-600 font-mono">
                            ~{it.estimated_minutes}분
                          </span>
                        )}
                      </div>
                      <CardTitle className="mt-2">{it.title}</CardTitle>
                      {it.description && (
                        <CardDescription>{it.description}</CardDescription>
                      )}
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

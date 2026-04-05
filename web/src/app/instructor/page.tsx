'use client';

import * as React from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { api } from '@/lib/api';
import { Check, ChevronDown, ChevronUp, Replace, X, ShieldCheck } from 'lucide-react';

interface Recommendation {
  id: number;
  type: string; // REVIEW_ROUTE | SUPPLEMENT | REROUTE | ALERT | GROUP_STUDY | TUTOR_ANSWER
  tier: string; // AUTO | MANUAL
  status: string;
  reason: string;
  evidence?: Record<string, unknown> | null;
  payload?: Record<string, unknown> | null;
  grounding_score?: number | null;
  created_at?: string;
  reviewed_by?: number | null;
}

const typeVariant: Record<
  string,
  'indigo' | 'secondary' | 'violet' | 'outline'
> = {
  REVIEW_ROUTE: 'indigo',
  SUPPLEMENT: 'secondary',
  REROUTE: 'indigo',
  ALERT: 'outline',
  GROUP_STUDY: 'violet',
  TUTOR_ANSWER: 'violet',
};

const typeLabel: Record<string, string> = {
  REVIEW_ROUTE: '복습 루트',
  SUPPLEMENT: '보충 자료',
  REROUTE: '경로 변경',
  ALERT: '이탈 경고',
  GROUP_STUDY: '그룹 스터디',
  TUTOR_ANSWER: '튜터 답변',
};

export default function InstructorPage() {
  const [items, setItems] = React.useState<Recommendation[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  const [busy, setBusy] = React.useState<Record<string, boolean>>({});

  const load = React.useCallback(() => {
    // 백엔드는 list 직접 반환
    api<Recommendation[]>(
      '/api/adapt/recommendations?status=PENDING_APPROVAL'
    )
      .then((d) => setItems(Array.isArray(d) ? d : []))
      .catch((e) => setError(e.message));
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  async function act(id: string, action: 'approve' | 'reject' | 'replace') {
    setBusy((b) => ({ ...b, [id]: true }));
    try {
      // 백엔드: POST /api/adapt/recommendations/{id}/action  body={action}
      await api(`/api/adapt/recommendations/${id}/action`, {
        method: 'POST',
        body: JSON.stringify({ action }),
      });
      setItems((prev) => prev?.filter((r) => String(r.id) !== id) ?? null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy((b) => ({ ...b, [id]: false }));
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 bg-cream-50">
        <div className="max-w-5xl mx-auto space-y-6">
          <header>
            <Badge variant="indigo">
              <ShieldCheck className="w-3 h-3 mr-1" /> Tier 2 · HITL 검증
            </Badge>
            <h1 className="mt-3 text-3xl md:text-4xl font-bold text-indigo-900 tracking-tight">
              AI 제안 관리
            </h1>
            <p className="mt-2 text-slate-600">
              AI가 생성한 개입 제안을 검토하고 승인 · 교체 · 거부하세요.
              승인된 제안만 학습자에게 전달됩니다.
            </p>
          </header>

          {error && (
            <Card>
              <CardContent className="pt-6 text-sm text-red-600">{error}</CardContent>
            </Card>
          )}

          {!items && !error && (
            <div className="space-y-3">
              <Skeleton className="h-40" />
              <Skeleton className="h-40" />
            </div>
          )}

          {items && items.length === 0 && (
            <Card>
              <CardContent className="pt-6 text-sm text-slate-500">
                현재 대기 중인 AI 제안이 없습니다.
              </CardContent>
            </Card>
          )}

          {items &&
            items.map((r) => {
              const isOpen = expanded[String(r.id)];
              const payloadTitle =
                (r.payload as any)?.title ?? typeLabel[r.type] ?? r.type;
              const scoreLabel =
                typeof r.grounding_score === 'number'
                  ? `grounding ${r.grounding_score.toFixed(2)}`
                  : null;
              return (
                <Card key={r.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={typeVariant[r.type] ?? 'indigo'}>
                            {typeLabel[r.type] ?? r.type}
                          </Badge>
                          {r.tier && (
                            <Badge variant="outline" className="font-mono text-[10px]">
                              Tier {r.tier === 'MANUAL' ? '2 · HITL' : '1 · Auto'}
                            </Badge>
                          )}
                          {scoreLabel && (
                            <span className="text-[10px] font-mono text-indigo-500">
                              {scoreLabel}
                            </span>
                          )}
                        </div>
                        <CardTitle className="mt-2 text-indigo-900">{payloadTitle}</CardTitle>
                      </div>
                      {r.created_at && (
                        <span className="text-xs text-indigo-400 font-mono whitespace-nowrap">
                          {new Date(r.created_at).toLocaleDateString('ko-KR')}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                        AI 추천 사유
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {r.reason}
                      </p>
                    </div>

                    <Separator />

                    <button
                      type="button"
                      onClick={() =>
                        setExpanded((e) => ({ ...e, [String(r.id)]: !e[String(r.id)] }))
                      }
                      className="text-xs font-medium text-indigo-700 hover:text-indigo-900 inline-flex items-center gap-1"
                    >
                      증거 보기
                      {isOpen ? (
                        <ChevronUp className="w-3 h-3" />
                      ) : (
                        <ChevronDown className="w-3 h-3" />
                      )}
                    </button>
                    {isOpen && r.evidence && (
                      <pre className="rounded-lg bg-cream-100 p-3 text-xs text-slate-700 overflow-auto font-mono">
                        {typeof r.evidence === 'string'
                          ? r.evidence
                          : JSON.stringify(r.evidence, null, 2)}
                      </pre>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button
                        size="sm"
                        onClick={() => act(String(r.id), 'approve')}
                        disabled={busy[String(r.id)]}
                      >
                        <Check className="w-4 h-4" /> 승인
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => act(String(r.id), 'replace')}
                        disabled={busy[String(r.id)]}
                      >
                        <Replace className="w-4 h-4" /> 교체
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => act(String(r.id), 'reject')}
                        disabled={busy[String(r.id)]}
                      >
                        <X className="w-4 h-4" /> 거부
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </main>
    </>
  );
}

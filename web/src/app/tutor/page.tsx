'use client';

import * as React from 'react';
import { useChat } from '@ai-sdk/react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ChatMessage, type Source } from '@/components/ChatMessage';
import { cn } from '@/lib/utils';
import { getToken } from '@/lib/auth';
import { Send, MessageSquare, Loader2, Sparkles, AlertTriangle } from 'lucide-react';

// 시연용 추천 질문 — 시드된 15개 ML/AI 기초 문서에서 답변 가능한 것들로 선별.
// 클릭 시 자동 제출되어 Agentic RAG 파이프라인 전 단계가 라이브 실행된다.
const SUGGESTED_QUESTIONS: { emoji: string; text: string; topic: string }[] = [
  {
    emoji: '🧠',
    text: 'L2 정규화가 과적합을 어떻게 막아주나요?',
    topic: '정규화 · L1/L2',
  },
  {
    emoji: '🎲',
    text: 'Dropout의 원리와 언제 쓰는지 알려주세요',
    topic: '신경망 · 정규화',
  },
  {
    emoji: '📈',
    text: '경사하강법에서 학습률이 왜 중요한가요?',
    topic: '최적화 · 학습률',
  },
  {
    emoji: '🔍',
    text: '편향-분산 트레이드오프를 쉽게 설명해주세요',
    topic: '일반화',
  },
  {
    emoji: '🎯',
    text: 'Transformer의 Self-Attention이 무엇인가요?',
    topic: 'Transformer 구조',
  },
  {
    emoji: '📊',
    text: 'Accuracy · Precision · Recall · F1 의 차이는?',
    topic: '평가 지표',
  },
];

// 백엔드 pipeline 이 emit 하는 stage 키와 동일해야 함.
// services/tutor/pipeline.py 의 StreamEvent.data['stage'] 값:
//   query_analysis, query_transform, retrieval, reranking, crag_check,
//   generation, grounding, reflection
const PIPELINE_STAGES = [
  { key: 'query_analysis', label: '질의 분석' },
  { key: 'query_transform', label: 'HyDE · 변환' },
  { key: 'retrieval', label: '검색' },
  { key: 'reranking', label: '재정렬' },
  { key: 'crag_check', label: 'CRAG' },
  { key: 'generation', label: '생성' },
  { key: 'grounding', label: '근거 확인' },
  { key: 'reflection', label: '자기성찰' },
] as const;

// 백엔드 vercel_stream.py 가 emit 하는 data part 형식:
// {type: 'step'|'warning'|'sources'|'followups'|'error', data: {...}}
interface StepEvent {
  type: 'step';
  data: { stage: string; status?: string; elapsed_ms?: number; [k: string]: any };
}
interface SourcesEvent {
  type: 'sources';
  data: { chunks: any[] };
}
interface FollowupsEvent {
  type: 'followups';
  data: { questions: string[] };
}
interface WarningEvent {
  type: 'warning';
  data: { stage: string; message: string; [k: string]: any };
}
type TutorDataPart = StepEvent | SourcesEvent | FollowupsEvent | WarningEvent;

export default function TutorPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? '';
  const [authError, setAuthError] = React.useState<string | null>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    data,
    setInput,
    append,
    error,
  } = useChat({
    api: `${apiBase}/api/tutor/chat`,
    // ★ @ai-sdk/react 의 headers 는 함수 지원 안 함 (정적 객체만).
    // 요청 시점에 최신 토큰을 붙이기 위해 fetch 래퍼를 사용한다.
    fetch: (url, init) => {
      const token = getToken();
      if (!token) {
        setAuthError('로그인이 필요합니다. /auth 에서 로그인 후 다시 시도해주세요.');
      } else {
        setAuthError(null);
      }
      const headers = new Headers(init?.headers);
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return fetch(url, { ...init, headers });
    },
    onError: (err) => {
      console.error('[tutor] chat error:', err);
    },
  });

  // 백엔드 데이터 파트를 파이프라인 상태 + 소스 + follow-up 으로 집계
  const { stageStatus, sources, followUps, warnings } = React.useMemo(() => {
    const stageStatus: Record<string, 'pending' | 'active' | 'done'> = {};
    PIPELINE_STAGES.forEach((s) => (stageStatus[s.key] = 'pending'));
    let sources: Source[] = [];
    let followUps: string[] = [];
    const warnings: string[] = [];

    (data as TutorDataPart[] | undefined)?.forEach((evt) => {
      if (!evt || typeof evt !== 'object') return;
      if (evt.type === 'step') {
        // start 이벤트는 `status: 'start'`, 완료 이벤트는 `elapsed_ms` 포함
        const s = evt.data.stage;
        if (s in stageStatus) {
          stageStatus[s] = evt.data.elapsed_ms != null ? 'done' : 'active';
        }
      } else if (evt.type === 'sources') {
        const chunks = evt.data?.chunks ?? [];
        sources = chunks.map((c: any) => ({
          title: c.document_title || c.section || `Chunk #${c.chunk_id}`,
          snippet: (c.content ?? '').slice(0, 180),
          url: '#',
        }));
      } else if (evt.type === 'followups') {
        followUps = evt.data?.questions ?? [];
      } else if (evt.type === 'warning') {
        warnings.push(evt.data?.message ?? '');
      }
    });
    return { stageStatus, sources, followUps, warnings };
  }, [data]);

  const mockSessions = [
    { id: '1', title: '파이썬 리스트 컴프리헨션' },
    { id: '2', title: 'SQL JOIN 이해하기' },
    { id: '3', title: '재귀 함수 디버깅' },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-6 px-4 bg-cream-50">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-4 h-[calc(100vh-8rem)]">
          {/* Sidebar */}
          <aside className="hidden lg:block col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> 이전 세션
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {mockSessions.map((s) => (
                  <button
                    key={s.id}
                    className="w-full text-left rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-cream-100"
                  >
                    {s.title}
                  </button>
                ))}
              </CardContent>
            </Card>
          </aside>

          {/* Chat area */}
          <section className="col-span-12 lg:col-span-9 flex flex-col gap-3 h-full">
            {/* Pipeline status bar */}
            <Card>
              <CardContent className="py-3">
                <div className="flex items-center gap-2 overflow-x-auto">
                  <Badge variant="violet">
                    <Sparkles className="w-3 h-3 mr-1" /> Agentic RAG
                  </Badge>
                  <Separator orientation="vertical" className="h-5 mx-1" />
                  {PIPELINE_STAGES.map((stage, i) => {
                    const status = stageStatus[stage.key];
                    return (
                      <React.Fragment key={stage.key}>
                        <div
                          className={cn(
                            'flex items-center gap-1.5 text-xs whitespace-nowrap',
                            status === 'done'
                              ? 'text-indigo-600'
                              : status === 'active'
                              ? 'text-indigo-700 font-semibold'
                              : 'text-slate-400'
                          )}
                        >
                          <span
                            className={cn(
                              'w-1.5 h-1.5 rounded-full',
                              status === 'done'
                                ? 'bg-indigo-500'
                                : status === 'active'
                                ? 'bg-indigo-700 animate-pulse'
                                : 'bg-slate-300'
                            )}
                          />
                          {stage.label}
                        </div>
                        {i < PIPELINE_STAGES.length - 1 && (
                          <span className="text-slate-300 text-xs">→</span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Messages */}
            <Card className="flex-1 flex flex-col overflow-hidden">
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6">
                  {messages.length === 0 && (
                    <div className="py-8 space-y-6">
                      <div className="text-center">
                        <Sparkles className="w-10 h-10 mx-auto text-indigo-500 mb-3" />
                        <h3 className="text-lg font-bold text-indigo-900">
                          무엇이든 물어보세요
                        </h3>
                        <p className="text-sm text-slate-600 mt-1.5">
                          15개의 ML/AI 기초 강의 자료에서 근거를 찾아 답변합니다
                        </p>
                      </div>

                      {/* 추천 질문 — 클릭 시 자동 제출 */}
                      <div className="space-y-2">
                        <p className="text-xs font-mono uppercase tracking-widest text-indigo-500 text-center">
                          추천 질문
                        </p>
                        <div className="grid sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
                          {SUGGESTED_QUESTIONS.map((q) => (
                            <button
                              key={q.text}
                              type="button"
                              onClick={() => {
                                // useChat 의 append() 는 user message + 자동 전송
                                append({ role: 'user', content: q.text });
                              }}
                              disabled={isLoading}
                              className="group text-left rounded-xl border border-indigo-100 bg-white hover:border-indigo-300 hover:bg-indigo-50/50 p-3 transition disabled:opacity-50"
                            >
                              <div className="flex items-start gap-2">
                                <span className="text-lg flex-shrink-0">{q.emoji}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-semibold text-indigo-900 group-hover:text-indigo-700">
                                    {q.text}
                                  </div>
                                  <div className="text-[10px] text-slate-500 mt-0.5 font-mono">
                                    {q.topic}
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {messages.map((m, i) => {
                    const isLast = i === messages.length - 1;
                    const isAssistant = m.role === 'assistant';
                    return (
                      <ChatMessage
                        key={m.id}
                        role={isAssistant ? 'assistant' : 'user'}
                        content={m.content}
                        sources={isAssistant && isLast ? sources : undefined}
                        followUps={isAssistant && isLast ? followUps : undefined}
                        onFollowUpClick={(q) => {
                          // 클릭 즉시 자동 제출 (append 가 user message 추가 + submit)
                          if (!isLoading) {
                            append({ role: 'user', content: q });
                          }
                        }}
                      />
                    );
                  })}
                  {/* 스트리밍 중 단계별 "진행 중" 스피너 */}
                  {isLoading && (
                    <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-indigo-700">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Agentic RAG 파이프라인 실행 중…
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {PIPELINE_STAGES.filter((s) => stageStatus[s.key] !== 'pending').map((s) => (
                          <span
                            key={s.key}
                            className={cn(
                              'px-2 py-0.5 rounded-full font-mono',
                              stageStatus[s.key] === 'done'
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'bg-indigo-600 text-white animate-pulse',
                            )}
                          >
                            {s.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* 경고 메시지 (grounding score 낮음 등) */}
                  {warnings.length > 0 && !isLoading && (
                    <div className="rounded-xl border border-amber-200/0 bg-indigo-50/70 p-3 text-xs text-indigo-700 space-y-1">
                      {warnings.map((w, i) => (
                        <div key={i} className="flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                          <span>{w}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* 에러 표시 */}
                  {(authError || error) && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                      <div className="font-semibold flex items-center gap-2 mb-1">
                        <AlertTriangle className="w-4 h-4" /> 오류
                      </div>
                      <div className="text-xs">{authError ?? error?.message}</div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="border-t border-indigo-100 p-4">
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="강의 내용이나 개념을 질문해보세요…"
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    <Send className="w-4 h-4" />
                    전송
                  </Button>
                </form>
              </div>
            </Card>
          </section>
        </div>
      </main>
    </>
  );
}

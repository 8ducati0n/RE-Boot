'use client';

import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';
import { BookOpen, User, Sparkles, ArrowRight } from 'lucide-react';

export interface Source {
  id?: string;
  title: string;
  url?: string;
  snippet?: string;
}

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
  sources?: Source[];
  followUps?: string[];
  onFollowUpClick?: (q: string) => void;
  className?: string;
}

/**
 * 마크다운 렌더러 컴포넌트 매핑 — 4안 인디고 팔레트.
 * Tailwind prose 대신 직접 스타일 지정 (shadcn + 커스텀 토큰 유지).
 */
const markdownComponents = {
  // 제목
  h1: (props: any) => (
    <h1 className="text-base font-bold text-indigo-900 mt-4 mb-2 first:mt-0" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-sm font-bold text-indigo-900 mt-3 mb-1.5 first:mt-0" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-sm font-semibold text-indigo-800 mt-3 mb-1.5 first:mt-0" {...props} />
  ),
  // 문단
  p: (props: any) => (
    <p className="text-sm text-slate-700 leading-[1.75] my-2 first:mt-0 last:mb-0" {...props} />
  ),
  // 볼드 — 인디고 강조
  strong: (props: any) => (
    <strong className="font-bold text-indigo-900" {...props} />
  ),
  em: (props: any) => <em className="italic text-slate-600" {...props} />,
  // 리스트
  ul: (props: any) => (
    <ul className="text-sm text-slate-700 list-disc ml-5 my-2 space-y-1" {...props} />
  ),
  ol: (props: any) => (
    <ol className="text-sm text-slate-700 list-decimal ml-5 my-2 space-y-1" {...props} />
  ),
  li: (props: any) => <li className="leading-relaxed" {...props} />,
  // 인라인 코드
  code: ({ inline, children, ...props }: any) =>
    inline ? (
      <code
        className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono text-[0.85em]"
        {...props}
      >
        {children}
      </code>
    ) : (
      <code className="block" {...props}>
        {children}
      </code>
    ),
  // 블록 코드
  pre: (props: any) => (
    <pre
      className="bg-indigo-950 text-indigo-100 rounded-lg p-3 my-2 text-xs overflow-x-auto font-mono leading-relaxed"
      {...props}
    />
  ),
  // 인용문
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-indigo-300 bg-indigo-50/50 pl-3 pr-2 py-1 my-2 text-slate-600 italic"
      {...props}
    />
  ),
  // 링크
  a: (props: any) => (
    <a
      className="text-indigo-600 underline decoration-indigo-200 decoration-2 underline-offset-2 hover:decoration-indigo-500"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  // 구분선
  hr: (props: any) => (
    <hr className="my-4 border-indigo-100" {...props} />
  ),
};

/**
 * 인용 토큰 `[1]`, `[2]` 를 작은 인디고 배지로 변환.
 * 마크다운 렌더링 전에 텍스트에 적용한다.
 */
function highlightCitations(text: string): string {
  // `[1]`, `[1, 2]` 형태를 유지하되 마크다운 파서가 리스트로 해석하지 않도록 그대로 둔다.
  // 대신 CSS 로 처리하는 편이 안전하므로 여기선 no-op.
  return text;
}

export function ChatMessage({
  role,
  content,
  sources,
  followUps,
  onFollowUpClick,
  className,
}: ChatMessageProps) {
  const isUser = role === 'user';
  const processedContent = React.useMemo(() => highlightCitations(content), [content]);

  return (
    <div
      className={cn(
        'flex gap-3',
        isUser ? 'justify-end' : 'justify-start',
        className,
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shadow-sm">
          <Sparkles className="w-4 h-4" />
        </div>
      )}
      <div className={cn('max-w-2xl flex-1 space-y-2', isUser && 'order-first max-w-xl')}>
        {/* 메시지 버블 */}
        <div
          className={cn(
            'rounded-2xl px-4 py-3',
            isUser
              ? 'bg-indigo-600 text-white text-sm leading-relaxed'
              : 'bg-white border border-indigo-100 shadow-sm',
          )}
        >
          {isUser ? (
            <div className="whitespace-pre-wrap">{content}</div>
          ) : (
            <div className="markdown-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {processedContent || '…'}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* 출처 */}
        {!isUser && sources && sources.length > 0 && (
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-indigo-500">
              📚 근거 출처
            </div>
            <div className="flex flex-wrap gap-1.5">
              {sources.map((s, i) => (
                <a
                  key={s.id ?? i}
                  href={s.url ?? '#'}
                  target={s.url && s.url !== '#' ? '_blank' : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 transition"
                  title={s.snippet}
                >
                  <BookOpen className="w-3 h-3" />
                  <span className="font-medium">
                    [{i + 1}] {s.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 후속 질문 추천 */}
        {!isUser && followUps && followUps.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-indigo-500">
              💬 이어서 물어보기
            </div>
            <div className="flex flex-col gap-1.5">
              {followUps.map((q, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onFollowUpClick?.(q)}
                  className="group inline-flex items-start gap-2 rounded-xl border border-indigo-100 bg-white hover:border-indigo-300 hover:bg-indigo-50/50 px-3 py-2 text-left text-xs text-slate-700 hover:text-indigo-800 transition"
                >
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-indigo-400 group-hover:text-indigo-600" />
                  <span className="leading-relaxed">{q}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shadow-sm">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}

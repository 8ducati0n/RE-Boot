import * as React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  value: string | number;
  label: string;
  sub?: string;
  tone?: 'indigo' | 'amber' | 'emerald' | 'rose' | 'violet';
  className?: string;
}

const toneText: Record<NonNullable<StatCardProps['tone']>, string> = {
  indigo: 'text-indigo-900',
  amber: 'text-amber-600',
  emerald: 'text-emerald-600',
  rose: 'text-rose-600',
  violet: 'text-violet-600',
};

export function StatCard({
  value,
  label,
  sub,
  tone = 'indigo',
  className,
}: StatCardProps) {
  return (
    <div className={cn('double-bezel bg-white p-6', className)}>
      <div
        className={cn(
          'font-mono font-bold tabular-nums text-5xl leading-none tracking-tight',
          toneText[tone]
        )}
      >
        {value}
      </div>
      <div className="mt-3 text-sm font-medium text-slate-700">{label}</div>
      {sub && <div className="mt-1 text-xs text-slate-500">{sub}</div>}
    </div>
  );
}

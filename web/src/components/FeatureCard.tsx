import * as React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  tone?: 'indigo' | 'amber' | 'emerald' | 'violet' | 'rose' | 'default';
}

const toneClass: Record<NonNullable<FeatureCardProps['tone']>, string> = {
  indigo: 'double-bezel-indigo',
  amber: 'double-bezel-amber',
  emerald: 'double-bezel border-emerald-100',
  violet: 'double-bezel border-violet-100',
  rose: 'double-bezel border-rose-100',
  default: 'double-bezel',
};

export function FeatureCard({
  icon,
  title,
  description,
  tone = 'default',
  className,
  children,
  ...props
}: FeatureCardProps) {
  return (
    <div
      className={cn('bg-white p-6 md:p-8 transition-all hover:-translate-y-0.5', toneClass[tone], className)}
      {...props}
    >
      {icon && (
        <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-cream-100 text-indigo-800">
          {icon}
        </div>
      )}
      <h3 className="text-lg md:text-xl font-semibold text-slate-900 tracking-tight">
        {title}
      </h3>
      {description && (
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">{description}</p>
      )}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

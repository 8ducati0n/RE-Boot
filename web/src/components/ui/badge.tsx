import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        // 4안 — 전부 indigo / violet 그라데이션 가족 내에서만
        default:     'border-transparent bg-indigo-600 text-white',
        secondary:   'border border-indigo-100 bg-indigo-50 text-indigo-700',
        destructive: 'border-transparent bg-red-500 text-white',
        outline:     'border-indigo-200 text-indigo-700 bg-white',
        // emerald/amber/rose 는 금지이므로 전부 indigo 계열로 재매핑
        emerald:     'border-transparent bg-indigo-50 text-indigo-700',
        amber:       'border-transparent bg-indigo-50 text-indigo-700',
        rose:        'border-transparent bg-indigo-50 text-indigo-700',
        violet:      'border-transparent bg-violet-50 text-violet-600',
        indigo:      'border-transparent bg-indigo-50 text-indigo-700',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

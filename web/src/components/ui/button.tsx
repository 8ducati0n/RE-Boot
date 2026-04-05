import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// MVP: uses native <button>; swap for @radix-ui/react-slot if asChild needed.
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // 4안 Modern Gradient Indigo 팔레트 적용
        default:
          'bg-indigo-600 text-white hover:bg-indigo-700 shadow-[0_8px_24px_-12px_rgba(79,70,229,0.5)] hover:shadow-[0_12px_32px_-12px_rgba(67,56,202,0.55)] active:scale-[0.98]',
        destructive:
          'bg-red-600 text-white hover:bg-red-700 shadow-sm',
        outline:
          'border border-indigo-200 bg-white hover:bg-indigo-50 text-indigo-700',
        secondary:
          'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100',
        ghost: 'hover:bg-indigo-50 text-slate-700 hover:text-indigo-700',
        link: 'text-indigo-500 underline-offset-4 decoration-indigo-200 decoration-2 hover:decoration-indigo-500 underline',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-9 rounded-lg px-3',
        lg: 'h-12 rounded-2xl px-7 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = 'Button';

export { Button, buttonVariants };

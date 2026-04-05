import * as React from 'react';
import { cn } from '@/lib/utils';

interface DiagramCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  caption?: string;
}

/**
 * Wrapper card for embedded SVG diagrams with consistent framing.
 */
export function DiagramCard({
  title,
  caption,
  className,
  children,
  ...props
}: DiagramCardProps) {
  return (
    <figure
      className={cn('double-bezel bg-white p-6 md:p-8', className)}
      {...(props as React.HTMLAttributes<HTMLElement>)}
    >
      {title && (
        <figcaption className="mb-4 text-sm font-semibold text-slate-700">
          {title}
        </figcaption>
      )}
      <div className="flex items-center justify-center">{children}</div>
      {caption && (
        <p className="mt-4 text-xs text-slate-500 text-center">{caption}</p>
      )}
    </figure>
  );
}

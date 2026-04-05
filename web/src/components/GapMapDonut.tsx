'use client';

import * as React from 'react';
import * as d3 from 'd3';
import { cn } from '@/lib/utils';

export interface GapMapDatum {
  category: string;
  owned: number;
  learning: number;
  gap: number;
}

interface GapMapDonutProps {
  data: GapMapDatum;
  size?: number;
  className?: string;
}

const COLORS = {
  owned: '#4F46E5',   // indigo-600
  learning: '#818CF8', // indigo-400
  gap: '#C7D2FE',     // indigo-200
} as const;

const LABELS: Record<string, string> = {
  owned: '보유',
  learning: '학습중',
  gap: '갭',
};

export function GapMapDonut({ data, size = 200, className }: GapMapDonutProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous render
    d3.select(container).selectAll('*').remove();

    const total = Math.max(data.owned + data.learning + data.gap, 1);
    const ownedPct = Math.round((data.owned / total) * 100);

    const width = size;
    const height = size;
    const outerRadius = Math.min(width, height) / 2 - 8;
    const innerRadius = outerRadius * 0.6;

    const segments = [
      { key: 'owned', value: data.owned },
      { key: 'learning', value: data.learning },
      { key: 'gap', value: data.gap },
    ];

    const pie = d3
      .pie<{ key: string; value: number }>()
      .value((d) => d.value)
      .sort(null)
      .padAngle(0.02);

    const arc = d3
      .arc<d3.PieArcDatum<{ key: string; value: number }>>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)
      .cornerRadius(3);

    const arcHover = d3
      .arc<d3.PieArcDatum<{ key: string; value: number }>>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius + 6)
      .cornerRadius(3);

    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .style('overflow', 'visible');

    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Tooltip
    const tooltip = d3
      .select(container)
      .append('div')
      .style('position', 'absolute')
      .style('pointer-events', 'none')
      .style('background', 'rgba(30, 27, 75, 0.92)')
      .style('color', '#fff')
      .style('padding', '6px 12px')
      .style('border-radius', '8px')
      .style('font-size', '13px')
      .style('line-height', '1.4')
      .style('white-space', 'nowrap')
      .style('box-shadow', '0 4px 12px rgba(0,0,0,0.15)')
      .style('opacity', '0')
      .style('transition', 'opacity 150ms ease')
      .style('z-index', '50');

    const arcs = pie(segments);

    // Track clicked segment
    let activeKey: string | null = null;

    const paths = g
      .selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('fill', (d) => COLORS[d.data.key as keyof typeof COLORS])
      .attr('cursor', 'pointer')
      .style('transition', 'filter 150ms ease');

    // Animated entrance: animate from 0 to final arc
    paths.each(function (d) {
      const element = d3.select(this);
      const interpolate = d3.interpolate(
        { startAngle: d.startAngle, endAngle: d.startAngle },
        { startAngle: d.startAngle, endAngle: d.endAngle }
      );
      element
        .transition()
        .duration(750)
        .ease(d3.easeCubicOut)
        .attrTween('d', () => (t: number) => arc(interpolate(t) as any) || '');
    });

    // Hover interactions
    paths
      .on('mouseenter', function (event, d) {
        const pct = Math.round((d.data.value / total) * 100);
        const label = LABELS[d.data.key] || d.data.key;
        tooltip
          .html(`<strong>${label}</strong>: ${d.data.value}개 (${pct}%)`)
          .style('opacity', '1');

        if (activeKey !== d.data.key) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('d', arcHover(d) || '');
        }
      })
      .on('mousemove', function (event) {
        const rect = container.getBoundingClientRect();
        tooltip
          .style('left', `${event.clientX - rect.left + 12}px`)
          .style('top', `${event.clientY - rect.top - 10}px`);
      })
      .on('mouseleave', function (_event, d) {
        tooltip.style('opacity', '0');
        if (activeKey !== d.data.key) {
          d3.select(this)
            .transition()
            .duration(200)
            .attr('d', arc(d) || '');
        }
      });

    // Click interaction: highlight segment
    paths.on('click', function (_event, d) {
      const clickedKey = d.data.key;
      if (activeKey === clickedKey) {
        // Deselect
        activeKey = null;
        paths
          .transition()
          .duration(200)
          .attr('d', (dd) => arc(dd) || '')
          .style('filter', 'none');
      } else {
        activeKey = clickedKey;
        paths
          .transition()
          .duration(200)
          .attr('d', (dd) =>
            dd.data.key === clickedKey ? arcHover(dd) || '' : arc(dd) || ''
          )
          .style('filter', (dd) =>
            dd.data.key === clickedKey ? 'none' : 'opacity(0.5)'
          );
      }
    });

    // Center text: percentage
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.1em')
      .style('font-size', `${size * 0.2}px`)
      .style('font-weight', '700')
      .style('font-family', 'ui-monospace, monospace')
      .style('fill', '#312E81') // indigo-900
      .text(`${ownedPct}%`);

    // Center text: category name
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.4em')
      .style('font-size', `${size * 0.075}px`)
      .style('fill', '#6366F1') // indigo-500
      .text(data.category);

    // Cleanup
    return () => {
      d3.select(container).selectAll('*').remove();
    };
  }, [data, size]);

  return (
    <figure className={cn('flex flex-col items-center gap-3', className)}>
      <div ref={containerRef} className="relative" />
      <div className="flex gap-3 text-xs text-slate-700">
        {(['owned', 'learning', 'gap'] as const).map((key) => (
          <span key={key} className="inline-flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: COLORS[key] }}
            />
            {LABELS[key]} {data[key]}
          </span>
        ))}
      </div>
    </figure>
  );
}

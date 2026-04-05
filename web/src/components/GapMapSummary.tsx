'use client';

import * as React from 'react';
import * as d3 from 'd3';
import type { GapMapDatum } from '@/components/GapMapDonut';

interface GapMapSummaryProps {
  data: GapMapDatum[];
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

const SEGMENT_KEYS = ['owned', 'learning', 'gap'] as const;

export function GapMapSummary({ data, className }: GapMapSummaryProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container || data.length === 0) return;

    d3.select(container).selectAll('*').remove();

    const margin = { top: 24, right: 24, bottom: 16, left: 120 };
    const barHeight = 32;
    const barGap = 14;
    const width = Math.min(container.clientWidth || 600, 800);
    const height = margin.top + data.length * (barHeight + barGap) + margin.bottom;

    const maxTotal = d3.max(data, (d) => d.owned + d.learning + d.gap) || 1;

    const xScale = d3
      .scaleLinear()
      .domain([0, maxTotal])
      .range([0, width - margin.left - margin.right]);

    const svg = d3
      .select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('overflow', 'visible');

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

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

    data.forEach((datum, i) => {
      const y = i * (barHeight + barGap);
      const total = datum.owned + datum.learning + datum.gap;

      // Truncate long category names
      const label = datum.category.length > 8
        ? datum.category.slice(0, 8) + '…'
        : datum.category;

      // Category label
      g.append('text')
        .attr('x', -8)
        .attr('y', y + barHeight / 2)
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'central')
        .style('font-size', '13px')
        .style('font-weight', '600')
        .style('fill', '#312E81') // indigo-900
        .text(label);

      // Background track
      g.append('rect')
        .attr('x', 0)
        .attr('y', y)
        .attr('width', xScale(maxTotal))
        .attr('height', barHeight)
        .attr('rx', 6)
        .attr('fill', '#EEF2FF'); // indigo-50

      // Stacked segments
      let xOffset = 0;
      SEGMENT_KEYS.forEach((key) => {
        const value = datum[key];
        if (value <= 0) return;

        const segWidth = xScale(value);
        const pct = Math.round((value / Math.max(total, 1)) * 100);

        const rect = g
          .append('rect')
          .attr('x', xOffset)
          .attr('y', y)
          .attr('height', barHeight)
          .attr('rx', key === 'owned' ? 6 : 0)
          .attr('fill', COLORS[key])
          .attr('cursor', 'pointer')
          .attr('width', 0);

        // Animate width
        rect
          .transition()
          .duration(750)
          .delay(i * 80)
          .ease(d3.easeCubicOut)
          .attr('width', segWidth);

        // Round right edge for last visible segment
        const isLast =
          (key === 'gap') ||
          (key === 'learning' && datum.gap <= 0) ||
          (key === 'owned' && datum.learning <= 0 && datum.gap <= 0);
        if (isLast) {
          rect.attr('rx', 6);
        }

        rect
          .on('mouseenter', function (event) {
            tooltip
              .html(
                `<strong>${datum.category}</strong><br/>${LABELS[key]}: ${value}개 (${pct}%)`
              )
              .style('opacity', '1');
            d3.select(this).style('filter', 'brightness(1.15)');
          })
          .on('mousemove', function (event) {
            const cRect = container.getBoundingClientRect();
            tooltip
              .style('left', `${event.clientX - cRect.left + 12}px`)
              .style('top', `${event.clientY - cRect.top - 10}px`);
          })
          .on('mouseleave', function () {
            tooltip.style('opacity', '0');
            d3.select(this).style('filter', 'none');
          });

        xOffset += segWidth;
      });

      // Total count at end
      g.append('text')
        .attr('x', xScale(maxTotal) + 8)
        .attr('y', y + barHeight / 2)
        .attr('dominant-baseline', 'central')
        .style('font-size', '12px')
        .style('fill', '#6366F1') // indigo-500
        .style('font-weight', '600')
        .style('opacity', '0')
        .text(`${total}`)
        .transition()
        .duration(750)
        .delay(i * 80)
        .style('opacity', '1');
    });

    // Legend at bottom
    const legendG = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height - 4})`);

    SEGMENT_KEYS.forEach((key, i) => {
      const xPos = i * 80;
      legendG
        .append('circle')
        .attr('cx', xPos)
        .attr('cy', 0)
        .attr('r', 4)
        .attr('fill', COLORS[key]);
      legendG
        .append('text')
        .attr('x', xPos + 10)
        .attr('y', 0)
        .attr('dominant-baseline', 'central')
        .style('font-size', '12px')
        .style('fill', '#475569')
        .text(LABELS[key]);
    });

    return () => {
      d3.select(container).selectAll('*').remove();
    };
  }, [data]);

  return (
    <div ref={containerRef} className={className} style={{ position: 'relative' }} />
  );
}

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import type { GapMapDatum } from './GapMapDonut';

interface GapMapRadarProps {
  data: GapMapDatum[];
  size?: number;
  className?: string;
}

/**
 * 5각형 레이더 차트 — 카테고리별 보유/학습중/갭 비율을 한눈에 비교.
 * D3 없이 순수 SVG로 구현 (번들 경량화).
 * 4안 인디고 팔레트.
 */
export function GapMapRadar({ data, size = 320, className }: GapMapRadarProps) {
  if (!data || data.length === 0) return null;

  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size / 2 - 40;
  const levels = 4; // 동심원 개수

  const n = data.length;
  const angleStep = (2 * Math.PI) / n;
  const startAngle = -Math.PI / 2; // 12시 방향 시작

  // 각 카테고리의 보유율 (0~1)
  const values = data.map((d) => {
    const total = d.owned + d.learning + d.gap;
    return total > 0 ? d.owned / total : 0;
  });

  // 학습중 포함 비율 (보유 + 학습중)
  const valuesWithLearning = data.map((d) => {
    const total = d.owned + d.learning + d.gap;
    return total > 0 ? (d.owned + d.learning) / total : 0;
  });

  // 점 좌표 계산
  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    const r = value * maxRadius;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  // 다각형 path
  const toPath = (vals: number[]) => {
    return vals
      .map((v, i) => {
        const p = getPoint(i, v);
        return `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`;
      })
      .join(' ') + ' Z';
  };

  // 동심원 (레벨 가이드)
  const gridCircles = Array.from({ length: levels }, (_, i) => {
    const r = ((i + 1) / levels) * maxRadius;
    const points = Array.from({ length: n }, (_, j) => {
      const angle = startAngle + j * angleStep;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    });
    return points.join(' ');
  });

  // 축 라인
  const axisLines = data.map((_, i) => {
    const angle = startAngle + i * angleStep;
    return {
      x2: cx + maxRadius * Math.cos(angle),
      y2: cy + maxRadius * Math.sin(angle),
    };
  });

  // 라벨 위치
  const labels = data.map((d, i) => {
    const angle = startAngle + i * angleStep;
    const labelR = maxRadius + 24;
    const total = d.owned + d.learning + d.gap;
    const pct = total > 0 ? Math.round((d.owned / total) * 100) : 0;
    return {
      x: cx + labelR * Math.cos(angle),
      y: cy + labelR * Math.sin(angle),
      category: d.category,
      pct,
    };
  });

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* 동심원 */}
        {gridCircles.map((points, i) => (
          <polygon
            key={`grid-${i}`}
            points={points}
            fill="none"
            stroke="#C7D2FE"
            strokeWidth={i === levels - 1 ? 1.5 : 0.5}
            strokeDasharray={i === levels - 1 ? 'none' : '3,3'}
            opacity={0.6}
          />
        ))}

        {/* 축 */}
        {axisLines.map((line, i) => (
          <line
            key={`axis-${i}`}
            x1={cx}
            y1={cy}
            x2={line.x2}
            y2={line.y2}
            stroke="#C7D2FE"
            strokeWidth={0.5}
            opacity={0.6}
          />
        ))}

        {/* 학습중 포함 영역 (연한 색) */}
        <path
          d={toPath(valuesWithLearning)}
          fill="#818CF8"
          fillOpacity={0.15}
          stroke="#818CF8"
          strokeWidth={1.5}
          strokeDasharray="4,4"
        />

        {/* 보유 영역 (진한 색) */}
        <path
          d={toPath(values)}
          fill="#4F46E5"
          fillOpacity={0.25}
          stroke="#4F46E5"
          strokeWidth={2}
        />

        {/* 보유 점 */}
        {values.map((v, i) => {
          const p = getPoint(i, v);
          return (
            <circle
              key={`dot-${i}`}
              cx={p.x}
              cy={p.y}
              r={4}
              fill="#4F46E5"
              stroke="white"
              strokeWidth={2}
            />
          );
        })}

        {/* 카테고리 라벨 */}
        {labels.map((l, i) => (
          <text
            key={`label-${i}`}
            x={l.x}
            y={l.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-[11px] font-semibold"
            fill="#1F2937"
          >
            <tspan x={l.x} dy="-0.4em">{l.category}</tspan>
            <tspan x={l.x} dy="1.3em" className="text-[10px] font-mono" fill="#4F46E5">
              {l.pct}%
            </tspan>
          </text>
        ))}

        {/* 레벨 숫자 (우측 축에) */}
        {Array.from({ length: levels }, (_, i) => {
          const pct = Math.round(((i + 1) / levels) * 100);
          const r = ((i + 1) / levels) * maxRadius;
          return (
            <text
              key={`lvl-${i}`}
              x={cx + 8}
              y={cy - r + 4}
              className="text-[9px] font-mono"
              fill="#6366F1"
              opacity={0.5}
            >
              {pct}%
            </text>
          );
        })}
      </svg>

      {/* 범례 */}
      <div className="flex items-center gap-6 mt-4 text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-indigo-600 opacity-60" />
          <span>보유</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm border-2 border-indigo-400 border-dashed opacity-60" />
          <span>보유 + 학습중</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-indigo-100" />
          <span>갭 영역</span>
        </div>
      </div>
    </div>
  );
}

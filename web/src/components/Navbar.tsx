'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

// v2.1-C — 학습자 5개 컴포넌트 + 강사 루프
const LEARNER_NAV = [
  { href: '/gap-map', label: '이수율' },
  { href: '/placement', label: '자기평가' },
  { href: '/tutor', label: 'CAM 튜터' },
  { href: '/checklist', label: '체크리스트' },
  { href: '/quiz', label: '망각곡선' },
];

const INSTRUCTOR_NAV = [
  { href: '/curriculum', label: '커리큘럼 등록' },
  { href: '/instructor', label: '강사 대시보드' },
];

export function Navbar() {
  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="glass flex w-full max-w-5xl items-center gap-1 rounded-full px-3 py-2 shadow-lg">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 font-black tracking-tight text-indigo-700"
        >
          <Sparkles className="h-4 w-4 text-indigo-500" />
          RE:Boot
        </Link>
        <ul className="ml-2 hidden items-center gap-1 md:flex">
          {LEARNER_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-full px-2.5 py-1.5 text-sm text-slate-700 transition hover:bg-white/60 hover:text-indigo-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="mx-1 h-4 w-px bg-indigo-100" aria-hidden />
          {INSTRUCTOR_NAV.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-full px-2.5 py-1.5 text-sm text-slate-700 transition hover:bg-white/60 hover:text-violet-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="ml-auto">
          <Link href="/auth">
            <Button size="sm" variant="secondary">
              로그인
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

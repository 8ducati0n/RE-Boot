'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const nav = [
  { href: '/placement', label: '수준 진단' },
  { href: '/gap-map', label: '갭맵' },
  { href: '/curriculum', label: '커리큘럼' },
  { href: '/tutor', label: 'AI 튜터' },
  { href: '/instructor', label: '교수자' },
];

export function Navbar() {
  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="glass rounded-full px-3 py-2 flex items-center gap-1 shadow-lg max-w-4xl w-full">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 font-black text-indigo-700 tracking-tight"
        >
          <Sparkles className="w-4 h-4 text-indigo-500" />
          RE:Boot
        </Link>
        <ul className="hidden md:flex items-center gap-1 ml-2">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="px-3 py-1.5 text-sm text-slate-700 hover:text-indigo-700 rounded-full hover:bg-white/60 transition"
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

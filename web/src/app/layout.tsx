import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'RE:Boot — Human-in-the-Loop 적응형 학습 플랫폼',
  description:
    'AI가 분석하고, 교수자가 결정한다. 부트캠프 중도 이탈과 AI 과의존을 동시에 해결하는 2-Tier Trust 학습 플랫폼.',
  openGraph: {
    title: 'RE:Boot — Human-in-the-Loop 적응형 학습 플랫폼',
    description: 'AI가 분석하고, 교수자가 결정한다.',
    images: ['/og.png'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning className="bg-cream-50">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@latest/dist/web/variable/pretendardvariable.css"
        />
      </head>
      <body className="font-sans antialiased word-keep-all bg-cream-50 text-slate-800 min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

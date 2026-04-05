import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4 bg-cream-50">
        <div className="text-center max-w-md">
          <div className="font-mono text-7xl font-bold text-indigo-700 tracking-tight">
            404
          </div>
          <h1 className="mt-4 text-2xl font-bold text-indigo-900">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="mt-2 text-slate-600">
            요청하신 경로가 존재하지 않거나 이동되었습니다.
          </p>
          <div className="mt-6">
            <Link href="/">
              <Button size="lg">홈으로 돌아가기</Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

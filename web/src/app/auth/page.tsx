'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { setToken } from '@/lib/auth';
import { LogIn, UserPlus, Loader2 } from 'lucide-react';

type Mode = 'login' | 'register';

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = React.useState<Mode>('login');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const path = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = mode === 'login' ? { email, password } : { email, password, full_name: name, role: 'student' };
      const res = await api<{ token?: string; access_token?: string }>(path, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      const token = res.token ?? res.access_token;
      if (token) {
        setToken(token);
        // Next.js router 를 사용해 SPA 네비게이션 유지 (bfcache 친화적)
        router.push('/placement');
        router.refresh();
      } else {
        setError('토큰을 받지 못했습니다.');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-16 px-4 bg-cream-50">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <Badge variant="indigo" className="w-fit">RE:Boot</Badge>
              <CardTitle className="mt-2">
                {mode === 'login' ? '다시 오신 것을 환영합니다' : '학습 여정 시작하기'}
              </CardTitle>
              <CardDescription>
                {mode === 'login'
                  ? '계정 정보를 입력해 학습을 이어가세요.'
                  : '부트캠프 학습자 또는 교수자 계정을 만들어보세요.'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="홍길동"
                      required
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@reboot.ac.kr"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">비밀번호</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="********"
                    required
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : mode === 'login' ? (
                    <LogIn className="w-4 h-4" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                  {mode === 'login' ? '로그인' : '가입하기'}
                </Button>
                <button
                  type="button"
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="w-full text-sm text-indigo-500 hover:text-indigo-700"
                >
                  {mode === 'login'
                    ? '계정이 없으신가요? 가입하기'
                    : '이미 계정이 있으신가요? 로그인'}
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}

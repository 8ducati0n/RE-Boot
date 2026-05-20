/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  eslint: {
    // MVP: ESLint 경고로 빌드 중단되지 않도록. 프로덕션 이전에 재활성화 권장.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // MVP: 타입 에러로 빌드 중단되지 않도록. 프로덕션 이전에 재활성화 권장.
    ignoreBuildErrors: true,
  },
  // 2026-05-20 (Sprint 0 D-10 #1): rewrites 비활성화.
  // Sprint 1에서 만들 `/api/tutor/*` (Vercel Route Handler)가 외부 프록시로 빠지지 않도록.
  // Phase A에서 백엔드 도입 시 source를 좁혀(`/api/legacy/:path*`) 복원할 것.
  // async rewrites() {
  //   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  //   if (!apiUrl) return [];
  //   return [
  //     { source: '/api/:path*', destination: `${apiUrl}/api/:path*` },
  //   ];
  // },
};

module.exports = nextConfig;

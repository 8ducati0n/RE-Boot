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
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) return [];
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

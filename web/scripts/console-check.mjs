// Sprint 0 D-9 자동 점검 — 8개 라우트의 콘솔 에러·페이지 에러·실패 요청 수집
//
// 사용법:
//   1. 별도 터미널에서 `npm run dev` (http://localhost:3000)
//   2. 본 스크립트: `node scripts/console-check.mjs`
//
// 합격 기준: 모든 라우트에서 errors[] 0건, pageErrors[] 0건.
// console.warn은 알림만, 합격 차단은 아님.

import { chromium } from 'playwright';

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
const ROUTES = [
  '/',
  '/auth',
  '/placement',
  '/gap-map',
  '/checklist',
  '/tutor',
  '/quiz',
  '/curriculum',
  '/instructor',
];
const VIEWPORTS = [
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'mobile-360', width: 360, height: 740 },
];

// 무시할 수 있는 잡음 — 보통 dev 모드의 React DevTools 권유, Fast Refresh 등
const IGNORED_PATTERNS = [
  /Download the React DevTools/i,
  /\[Fast Refresh\]/i,
  /\[HMR\]/i,
];

function isIgnored(text) {
  return IGNORED_PATTERNS.some((re) => re.test(text));
}

async function checkRoute(browser, viewport, route) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
  });
  const page = await context.newPage();

  const errors = [];
  const warnings = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on('console', (msg) => {
    const text = msg.text();
    if (isIgnored(text)) return;
    if (msg.type() === 'error') errors.push(text);
    if (msg.type() === 'warning') warnings.push(text);
  });
  page.on('pageerror', (err) => {
    pageErrors.push(err.message);
  });
  page.on('requestfailed', (req) => {
    // dev 환경에서 _next/webpack-hmr 등은 정상 변동이므로 제외
    const url = req.url();
    if (url.includes('_next/webpack-hmr') || url.includes('_next/static/development')) return;
    failedRequests.push(`${req.method()} ${url} — ${req.failure()?.errorText ?? 'unknown'}`);
  });

  const start = Date.now();
  let status = 'ok';
  try {
    // dev 모드에서는 networkidle이 불안정(HMR/prefetch). domcontentloaded + hydration 대기로 충분.
    const res = await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
    if (!res?.ok()) status = `http-${res?.status() ?? 'no-response'}`;
  } catch (err) {
    status = `nav-failed: ${err.message.split('\n')[0]}`;
  }
  // hydration + 후속 리소스 로딩 시간 확보 (dev SSR 컴파일 첫 진입 대비)
  await page.waitForTimeout(2500);
  const elapsed = Date.now() - start;

  await context.close();
  return { viewport: viewport.name, route, status, elapsed, errors, warnings, pageErrors, failedRequests };
}

async function main() {
  console.log(`[console-check] BASE_URL=${BASE_URL}`);
  console.log(`[console-check] viewports=${VIEWPORTS.map((v) => v.name).join(', ')}`);
  console.log(`[console-check] routes=${ROUTES.length}\n`);

  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const vp of VIEWPORTS) {
    for (const route of ROUTES) {
      process.stdout.write(`  [${vp.name}] ${route} ... `);
      const r = await checkRoute(browser, vp, route);
      results.push(r);
      const hasIssue = r.status !== 'ok' || r.errors.length > 0 || r.pageErrors.length > 0 || r.failedRequests.length > 0;
      console.log(
        hasIssue
          ? `❌ status=${r.status} errs=${r.errors.length} pageErrs=${r.pageErrors.length} failedReq=${r.failedRequests.length} (${r.elapsed}ms)`
          : `✅ ok ${r.warnings.length > 0 ? `(warns=${r.warnings.length})` : ''} (${r.elapsed}ms)`
      );
    }
  }

  await browser.close();

  // 종합 리포트
  const total = results.length;
  const failing = results.filter((r) => r.status !== 'ok' || r.errors.length > 0 || r.pageErrors.length > 0 || r.failedRequests.length > 0);
  const warningsOnly = results.filter((r) => r.warnings.length > 0 && r.errors.length === 0 && r.pageErrors.length === 0 && r.status === 'ok' && r.failedRequests.length === 0);

  console.log(`\n${'='.repeat(60)}`);
  console.log(`총 ${total}건 / ❌ 실패 ${failing.length}건 / ⚠️  경고만 ${warningsOnly.length}건`);
  console.log('='.repeat(60));

  if (failing.length > 0) {
    console.log('\n[FAILING DETAILS]');
    for (const f of failing) {
      console.log(`\n--- [${f.viewport}] ${f.route} ---`);
      if (f.status !== 'ok') console.log(`  status: ${f.status}`);
      f.pageErrors.forEach((e, i) => console.log(`  pageError[${i}]: ${e}`));
      f.errors.forEach((e, i) => console.log(`  console.error[${i}]: ${e}`));
      f.failedRequests.forEach((e, i) => console.log(`  failedRequest[${i}]: ${e}`));
    }
  }

  if (warningsOnly.length > 0) {
    console.log('\n[WARNINGS (참고)]');
    for (const w of warningsOnly) {
      console.log(`\n--- [${w.viewport}] ${w.route} ---`);
      w.warnings.forEach((m, i) => console.log(`  console.warn[${i}]: ${m}`));
    }
  }

  process.exit(failing.length > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('[console-check] fatal:', err);
  process.exit(2);
});

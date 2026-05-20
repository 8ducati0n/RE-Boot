// RE:Boot 3분 데모 영상 자동 녹화 스크립트
// Playwright로 화면을 180초간 캡처하여 webm으로 저장.
// SRT 자막은 별도 ffmpeg 단계에서 burn-in.
//
// 사용: node scripts/demo-video/record.mjs
// 전제: dev 서버가 http://localhost:3000 에서 작동 중
// 출력: output/raw.webm

import { chromium } from '/Users/kimhyejin/Documents/GitHub/RE-Boot/web/node_modules/playwright/index.mjs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = '/Users/kimhyejin/Documents/GitHub/RE-Boot/output';
const BASE = 'http://localhost:3000';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  console.log('🎬 RE:Boot 데모 영상 녹화 시작');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: OUTPUT_DIR,
      size: { width: 1920, height: 1080 },
    },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  const t0 = Date.now();
  const elapsed = () => ((Date.now() - t0) / 1000).toFixed(1);
  const log = (msg) => console.log(`[${elapsed()}s] ${msg}`);

  // 0:00 - 0:15 타이틀 (홈 노출)
  log('Scene 1: 홈 (타이틀)');
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => window.scrollTo({ top: 0 }));
  await sleep(8000);
  // 0:08 - 0:15 스크롤 다운 시작
  await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'smooth' }));
  await sleep(7000);

  // 0:15 - 0:35 문제 (스크롤로 두 환상 섹션)
  log('Scene 2: 문제 (두 환상)');
  await page.evaluate(() => {
    const el = document.querySelector('#problem');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  await sleep(20000);

  // 0:35 - 0:55 순환 구조
  log('Scene 3: 진단 → 개입 → 보정 순환');
  await page.evaluate(() => {
    const el = document.querySelector('#cycle');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  await sleep(20000);

  // 0:55 - 1:10 학습자 0 이수율
  log('Scene 4: 이수율 (/gap-map)');
  await page.goto(`${BASE}/gap-map`, { waitUntil: 'networkidle' });
  await sleep(7000);
  // 1:02 - 동기 평균 토글 클릭 시도
  try {
    await page
      .getByRole('button', { name: /동기 평균/ })
      .first()
      .click({ timeout: 2000 });
  } catch {
    /* 토글 못 찾으면 무시 */
  }
  await sleep(8000);

  // 1:10 - 1:25 학습자 1 자기평가
  log('Scene 5: 자기평가 (/placement)');
  await page.goto(`${BASE}/placement`, { waitUntil: 'networkidle' });
  await sleep(2000);
  // 1:13~1:18 사전 평가 옵션 클릭 (3개 목표 각각 “들어봤음” 선택)
  for (let i = 0; i < 3; i++) {
    try {
      const buttons = await page.getByRole('button', { name: /들어봤음/ }).all();
      if (buttons[i]) await buttons[i].click({ timeout: 1500 });
      await sleep(800);
    } catch {}
  }
  await sleep(3000);
  // 1:18~1:25 "수업 후" 탭 클릭 후 동일 절차
  try {
    await page.getByRole('button', { name: /수업 후/ }).click({ timeout: 2000 });
    await sleep(1000);
    for (let i = 0; i < 3; i++) {
      try {
        const buttons = await page.getByRole('button', { name: /할 수 있음/ }).all();
        if (buttons[i]) await buttons[i].click({ timeout: 1500 });
        await sleep(700);
      } catch {}
    }
  } catch {}
  await sleep(3500);

  // 1:25 - 2:05 학습자 3 CAM 튜터 ★ 핵심 (40초)
  log('Scene 6: CAM 튜터 (/tutor) ★ 핵심');
  await page.goto(`${BASE}/tutor`, { waitUntil: 'networkidle' });
  await sleep(3000);
  // 1:28 - 좌측 사이드바 "함수 return None" 시나리오 버튼 클릭
  try {
    await page
      .getByRole('button', { name: /함수 return None/ })
      .first()
      .click({ timeout: 2000 });
  } catch {
    // 추천 질문에서 클릭 시도
    try {
      await page
        .getByRole('button', { name: /함수에서 return.*None/ })
        .first()
        .click({ timeout: 2000 });
    } catch {}
  }
  // 시나리오 스크립트는 약 8-10초에 걸쳐 자동 재생 (메시지마다 350-700ms 딜레이)
  // 핵심 라벨 노출 동안 정지 유지
  await sleep(37000);

  // 2:05 - 2:20 학습자 2 체크리스트
  log('Scene 7: 체크리스트 (/checklist)');
  await page.goto(`${BASE}/checklist`, { waitUntil: 'networkidle' });
  await sleep(3000);
  // 증거 입력 시뮬레이션
  try {
    const inputs = await page.locator('input[type="text"], input:not([type])').all();
    const samples = [
      'def add(a, b): return a + b',
      '두 수의 합 반환',
      '함수 밖 x는 10 유지',
    ];
    for (let i = 0; i < Math.min(3, inputs.length); i++) {
      await inputs[i].fill(samples[i] ?? '');
      await sleep(1200);
    }
  } catch {}
  await sleep(6000);

  // 2:20 - 2:35 학습자 4 망각곡선
  log('Scene 8: 망각곡선 (/quiz)');
  await page.goto(`${BASE}/quiz`, { waitUntil: 'networkidle' });
  await sleep(8000);
  // 첫 객관식 정답 클릭
  try {
    const opt = await page
      .getByRole('button', { name: /def hello.*: return/ })
      .first();
    await opt.click({ timeout: 2000 });
  } catch {}
  await sleep(7000);

  // 2:35 - 2:50 강사 F1
  log('Scene 9: 강사 F1 (/curriculum)');
  await page.goto(`${BASE}/curriculum`, { waitUntil: 'networkidle' });
  await sleep(3000);
  // 폼 영역 스크롤
  await page.evaluate(() => window.scrollBy({ top: 600, behavior: 'smooth' }));
  await sleep(5000);
  await page.evaluate(() => window.scrollBy({ top: 600, behavior: 'smooth' }));
  await sleep(7000);

  // 2:50 - 3:00 강사 대시보드 + 클로징
  log('Scene 10: 강사 대시보드 (/instructor)');
  await page.goto(`${BASE}/instructor`, { waitUntil: 'networkidle' });
  await sleep(4000);
  // "메시지 직접 작성하기" 버튼 클릭
  try {
    await page
      .getByRole('button', { name: /메시지 직접 작성하기/ })
      .first()
      .click({ timeout: 2000 });
  } catch {}
  await sleep(6000);

  log('총 녹화 시간 도달 — 종료');

  // 영상 저장
  await context.close();
  await browser.close();

  log('✅ 녹화 완료. output/ 폴더에 webm 파일 저장됨.');
}

main().catch((e) => {
  console.error('❌ 오류:', e);
  process.exit(1);
});

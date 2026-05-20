// RE:Boot 3분 데모 영상 자동 녹화 (자막 burn-in 포함)
// 페이지마다 DOM 오버레이를 주입해 자막을 직접 렌더링한다.
// ffmpeg 의 libass 없이도 자막이 영상에 합성된다.
//
// 사용: node scripts/demo-video/record-with-subs.mjs
// 전제: dev 서버가 http://localhost:3000 에서 작동 중
// 출력: output/raw_subbed.webm

import { chromium } from '/Users/kimhyejin/Documents/GitHub/RE-Boot/web/node_modules/playwright/index.mjs';

const OUTPUT_DIR = '/Users/kimhyejin/Documents/GitHub/RE-Boot/output';
const BASE = 'http://localhost:3000';

// 14_데모영상_제작가이드.md / RE_Boot_demo_3min.srt 와 동일 타이밍
const SUBTITLES = [
  { start: 0, end: 5, text: 'RE:Boot' },
  { start: 5, end: 10, text: 'AI가 분석하고, 교수자가 결정합니다.' },
  { start: 10, end: 15, text: 'KAEIM 2026 미디어전 · 김혜진 (연세대 교육공학)' },
  { start: 15, end: 20, text: '부트캠프 중도 이탈률 21% · 1인당 국비 손실 최대 2,000만 원' },
  { start: 20, end: 26, text: '학습자는 GPT 답변에 "이해한 느낌"만 얻고 실제로는 못 한다' },
  { start: 26, end: 35, text: '두 문제는 같은 뿌리: 메타인지 실패' },
  { start: 35, end: 42, text: '4개 모듈을 한 사이클로 통합: 진단 → 개입 → 보정' },
  { start: 42, end: 48, text: '① ZPD 갭 맵 / ② Bloom + Ebbinghaus / ③ AI-TPACK HITL / ④ 학습분석' },
  { start: 48, end: 55, text: 'AI 제안은 교수자 승인을 거쳐야 학습자에게 전달된다' },
  { start: 55, end: 62, text: '학습자는 이수율과 동기 평균을 함께 본다' },
  { start: 62, end: 70, text: '하위 25%에는 비교 정보가 약화된다 — 자기효능감 보호 가드' },
  { start: 70, end: 77, text: '수업 전 학습목표를 자기평가: "전혀 모름 / 들어봤음 / 할 수 있음"' },
  { start: 77, end: 85, text: '사전·사후 격차가 능력 착각의 흔적이다' },
  { start: 85, end: 90, text: 'CAM 기반 멘토링 LLM\nCognitive Apprenticeship Model (Collins 1989)' },
  { start: 90, end: 100, text: '[Verbalize]\n"제가 본 것은 ~입니다" — AI가 본 것을 먼저 진술' },
  { start: 100, end: 110, text: '[Ground Truth]\n"제가 잘못 본 부분이 있을까요?" — 환각 차단' },
  { start: 110, end: 120, text: '[Pass]\n질문으로 사용자에게 공을 되돌린다' },
  { start: 120, end: 125, text: '2-Stage Cycle: Articulation → Reflection\nAI는 인지만 / 정서는 강사' },
  { start: 125, end: 133, text: '체크박스만으론 완료되지 않는다' },
  { start: 133, end: 140, text: '작성한 코드 한 줄을 직접 입력해야 한다 — "안다는 느낌" ≠ "할 수 있음"' },
  { start: 140, end: 148, text: '1·3·7·16일 간격 망각곡선 퀴즈' },
  { start: 148, end: 155, text: '정답률 80% ↑ → 다음 간격 연장 / 50% ↓ → 단축 + 강사 알림' },
  { start: 155, end: 163, text: '강사는 한 번 입력한다: 학습목표 · 체크리스트 · CAM 범위 · 퀴즈' },
  { start: 163, end: 170, text: '학습자 5 컴포넌트가 자동 생성된다' },
  { start: 170, end: 175, text: 'AI는 사실만 정리한다 (해석 없음)' },
  { start: 175, end: 178, text: '메시지는 강사가 직접 작성한다' },
  { start: 178, end: 183, text: 'AI가 분석하고, 교수자가 결정합니다.' },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function injectSubtitleOverlay(page, recordingStartMs) {
  await page.addInitScript(
    ({ subs, startMs }) => {
      // 페이지 로드 직후 자막 오버레이 DOM 주입
      const installOverlay = () => {
        if (document.getElementById('__reboot_subs__')) return;
        const wrap = document.createElement('div');
        wrap.id = '__reboot_subs__';
        wrap.style.cssText = `
          position: fixed;
          left: 0;
          right: 0;
          bottom: 60px;
          z-index: 2147483647;
          text-align: center;
          pointer-events: none;
          font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Pretendard", "Noto Sans KR", sans-serif;
          padding: 0 80px;
        `;
        const text = document.createElement('span');
        text.id = '__reboot_subs_text__';
        text.style.cssText = `
          display: inline-block;
          max-width: 90%;
          padding: 14px 28px;
          background: rgba(0, 0, 0, 0.78);
          color: #ffffff;
          font-size: 32px;
          font-weight: 700;
          line-height: 1.4;
          border-radius: 8px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.4);
          letter-spacing: -0.01em;
          white-space: pre-line;
        `;
        wrap.appendChild(text);
        document.body.appendChild(wrap);

        const update = () => {
          const elapsed = (Date.now() - startMs) / 1000;
          const current = subs.find((s) => elapsed >= s.start && elapsed < s.end);
          text.textContent = current ? current.text : '';
          text.style.opacity = current ? '1' : '0';
        };
        update();
        setInterval(update, 100);
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', installOverlay);
      } else {
        installOverlay();
      }
    },
    { subs: SUBTITLES, startMs: recordingStartMs },
  );
}

async function main() {
  console.log('🎬 RE:Boot 데모 영상 녹화 시작 (자막 burn-in)');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: { dir: OUTPUT_DIR, size: { width: 1920, height: 1080 } },
    deviceScaleFactor: 1,
  });

  // 녹화 시작 시각: 컨텍스트 페이지 생성 직전이 가장 정확
  const recordingStartMs = Date.now();
  await injectSubtitleOverlay(context, recordingStartMs);
  const page = await context.newPage();

  const t0 = recordingStartMs;
  const elapsed = () => ((Date.now() - t0) / 1000).toFixed(1);
  const log = (msg) => console.log(`[${elapsed()}s] ${msg}`);

  // 0:00 - 0:15 타이틀 (홈 노출)
  log('Scene 1: 홈 (타이틀)');
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => window.scrollTo({ top: 0 }));
  await sleep(8000);
  await page.evaluate(() => window.scrollBy({ top: 400, behavior: 'smooth' }));
  await sleep(7000);

  // 0:15 - 0:35 문제
  log('Scene 2: 문제');
  await page.evaluate(() => {
    const el = document.querySelector('#problem');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  await sleep(20000);

  // 0:35 - 0:55 순환 구조
  log('Scene 3: 순환 구조');
  await page.evaluate(() => {
    const el = document.querySelector('#cycle');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  await sleep(20000);

  // 0:55 - 1:10 이수율
  log('Scene 4: 이수율');
  await page.goto(`${BASE}/gap-map`, { waitUntil: 'domcontentloaded' });
  await sleep(7000);
  try {
    await page
      .getByRole('button', { name: /동기 평균/ })
      .first()
      .click({ timeout: 2000 });
  } catch {}
  await sleep(8000);

  // 1:10 - 1:25 자기평가
  log('Scene 5: 자기평가');
  await page.goto(`${BASE}/placement`, { waitUntil: 'domcontentloaded' });
  await sleep(2000);
  for (let i = 0; i < 3; i++) {
    try {
      const buttons = await page.getByRole('button', { name: /들어봤음/ }).all();
      if (buttons[i]) await buttons[i].click({ timeout: 1500 });
      await sleep(800);
    } catch {}
  }
  await sleep(3000);
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

  // 1:25 - 2:05 CAM 튜터 (40s)
  log('Scene 6: CAM 튜터');
  await page.goto(`${BASE}/tutor`, { waitUntil: 'domcontentloaded' });
  await sleep(3000);
  try {
    await page
      .getByRole('button', { name: /함수 return None/ })
      .first()
      .click({ timeout: 2000 });
  } catch {
    try {
      await page
        .getByRole('button', { name: /함수에서 return.*None/ })
        .first()
        .click({ timeout: 2000 });
    } catch {}
  }
  await sleep(37000);

  // 2:05 - 2:20 체크리스트
  log('Scene 7: 체크리스트');
  await page.goto(`${BASE}/checklist`, { waitUntil: 'domcontentloaded' });
  await sleep(3000);
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

  // 2:20 - 2:35 망각곡선
  log('Scene 8: 망각곡선');
  await page.goto(`${BASE}/quiz`, { waitUntil: 'domcontentloaded' });
  await sleep(8000);
  try {
    const opt = await page
      .getByRole('button', { name: /def hello.*: return/ })
      .first();
    await opt.click({ timeout: 2000 });
  } catch {}
  await sleep(7000);

  // 2:35 - 2:50 강사 F1
  log('Scene 9: 강사 F1');
  await page.goto(`${BASE}/curriculum`, { waitUntil: 'domcontentloaded' });
  await sleep(3000);
  await page.evaluate(() => window.scrollBy({ top: 600, behavior: 'smooth' }));
  await sleep(5000);
  await page.evaluate(() => window.scrollBy({ top: 600, behavior: 'smooth' }));
  await sleep(7000);

  // 2:50 - 3:03 강사 대시보드 + 클로징
  log('Scene 10: 강사 대시보드');
  await page.goto(`${BASE}/instructor`, { waitUntil: 'domcontentloaded' });
  await sleep(4000);
  try {
    await page
      .getByRole('button', { name: /메시지 직접 작성하기/ })
      .first()
      .click({ timeout: 2000 });
  } catch {}
  await sleep(9000);

  log('총 녹화 시간 도달 — 종료');
  await context.close();
  await browser.close();
  log('✅ 녹화 완료. output/ 폴더에 webm 파일 저장됨.');
}

main().catch((e) => {
  console.error('❌ 오류:', e);
  process.exit(1);
});

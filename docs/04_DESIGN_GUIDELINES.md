# 04. 디자인 가이드라인 — supanova-design-skill 기반 RE:Boot 적응

> 본 문서는 [supanova-design-skill](https://github.com/uxjoseph/supanova-design-skill)의 프리미엄 에이전시급 디자인 원칙을 RE:Boot(Human-in-the-Loop 적응형 학습 플랫폼)의 컨텍스트에 맞춰 재해석한 가이드라인이다. 2026 한국교육정보미디어학회 춘계학술대회 미디어 전시 제출을 최종 목표로 한다.

---

## 1. 디자인 철학

### 1.1 왜 "프리미엄 에이전시급" 인가
RE:Boot은 학술대회 심사위원 앞에 서는 **연구 프로토타입**인 동시에, 부트캠프 현장에서 실제 교수자가 사용하는 **운영 시스템**이다. 두 맥락 모두 "믿고 맡길 수 있는 브랜드"라는 첫인상을 필요로 한다. 일반적인 MVP에서 흔히 보이는 "Tailwind 기본값 + 파란색 버튼"은 심사위원에게 "또 하나의 해커톤 데모"로 읽힐 위험이 크다. supanova가 지향하는 **$150k 에이전시 수준의 비주얼 완성도**는 연구물의 진지함과 팀의 실행력을 동시에 전달하는 가장 빠른 수단이다.

### 1.2 학회 심사 맥락의 "신뢰 브랜드" 포지셔닝
- 심사위원은 짧은 시간 안에 수십 개의 전시물을 훑는다. 첫 3초 안에 **학술성 + 세련됨**을 동시에 전달하지 못하면 탈락한다.
- 교육공학 분야는 전통적으로 시각 언어가 보수적이다. RE:Boot은 이 보수성을 깨뜨리지 않되, **모던 타이포그래피와 절제된 모션**만으로 차별화한다.
- "우리는 장난감을 만들지 않았다"는 메시지는 카피가 아니라 **여백, 글꼴, 색의 깊이**로 말해야 한다.

### 1.3 RE:Boot의 정체성을 시각 언어로 번역
RE:Boot의 핵심 테제는 **"AI가 분석하고, 교수자가 결정한다 (Human-in-the-Loop)"** 이다. 이 이원 구조를 시각 언어로 직역한다.

| 개념 축 | 시각 대응 |
| --- | --- |
| AI 분석 (정밀, 데이터, 밤) | Deep Indigo — 차갑고 깊은 색, 정제된 세리프/산세리프 수치 |
| 교수자 결정 (온기, 판단, 낮) | Warm Amber — 따뜻한 호박색, 둥근 모서리, 손글씨 느낌 강조점 |
| 둘의 협업 | Indigo → Amber 방향의 미세한 그라데이션, 또는 두 색의 대칭 배치 |

### 1.4 명시적으로 피해야 할 것
- **과한 SaaS 톤**: 무지개 그라데이션 버튼, 3D 일러스트, "Get Started Free" 스타일 랜딩
- **장난스러운 일러스트**: unDraw 스타일의 납작한 캐릭터 일러스트
- **뻔한 AI 클리셰**: 뇌 아이콘, 회로 기판, 로봇 얼굴, "AI-powered ✨"
- **가독성 해치는 그라데이션**: 텍스트 배경으로 쓰는 다색 그라데이션
- **과잉 모션**: 자동 회전 히어로, parallax 남발, 항상 움직이는 배경

---

## 2. supanova 파라미터 튜닝 — RE:Boot 전용 설정

supanova-design-skill은 4개의 튜닝 파라미터로 디자인 강도를 조절한다. RE:Boot의 학회 제출 및 시연 목적에 맞춰 다음과 같이 설정한다.

| 파라미터 | 권장값 | 이유 |
| --- | --- | --- |
| **LANDING_PURPOSE** | `brand + saas` 혼합 | 심사위원 신뢰 확보는 brand 모드의 강점이고, 실제 교수자/학습자 UI 시연은 saas 모드의 기능 소개 섹션이 필요하다. 상단 절반은 브랜드, 하단 절반은 기능 데모로 구성한다. |
| **DESIGN_VARIANCE** | `6/10` | 교육공학은 보수적이라 10/10 브루털리즘은 과하다. 반대로 3/10은 평범하다. 6은 "세련됐지만 튀지 않는다"의 분기점이다. |
| **MOTION_INTENSITY** | `5/10` | 스프링 기반 hover와 scroll-trigger fade-up까지는 허용. 발표 중 심사위원이 마우스를 움직였을 때 방해가 될 parallax / 지속 루프는 금지. |
| **VISUAL_DENSITY** | `3/10` | RE:Boot은 이론(TPACK, ZPD, Bloom, Ebbinghaus), 기능(6개 MVP), 수치(21%, +38% 등)가 많다. 밀도를 낮추고 **숨쉴 공간**을 확보해야 각 요소가 읽힌다. |

> 요약: **낮은 밀도 × 중간 모션 × 중상위 베리언스 × 브랜드+SaaS 혼합** — 학술 전시장에서 "한 템포 느리게, 그러나 확실하게 각인되는" 좌표.

---

## 3. 컬러 시스템

> **2026-04-05 업데이트**: 팔레트 5안 비교를 통해 **4안 "Modern Gradient Indigo"** 확정. Linear / Arc Browser 레퍼런스. 기존 Amber / Emerald / Rose / Cream(warm) 계열은 완전 폐기.

### 3.1 메인 팔레트 (4안 Modern Gradient Indigo)

| 역할 | 이름 | HEX | Tailwind | 용도 |
| --- | --- | --- | --- | --- |
| BG | Cool Off-White | `#FAFAFB` | `bg-cream-50` | 바디 기본 배경 |
| BG Soft | Platinum | `#F3F4F8` | `bg-sky-50` | 교차 섹션 배경 |
| BG Tint | Indigo Mist | `#EEF2FF` | `bg-sky-100` / `bg-indigo-50` | 카드 배경, 배지 |
| Border Light | Periwinkle | `#C7D2FE` | `bg-sky-300` / `bg-indigo-200` | 카드 테두리 |
| Accent Light | Lavender | `#A5B4FC` | `bg-powder-400` / `bg-indigo-300` | 태그, 소프트 액센트 |
| Accent Primary | Iris | `#6366F1` | `text-indigo-500` | 중간 강조, 소형 CTA |
| **Accent Strong** | Deep Indigo | `#4F46E5` | `bg-indigo-600` / `text-indigo-600` | **메인 CTA, L2 emphasis 기본** |
| Accent Max | Royal Indigo | `#4338CA` | `text-indigo-700` | L3 stat / 최강 강조 |
| Body Text | Graphite | `#1F2937` | `text-slate2-700` | 본문 |
| Headline | Indigo Night | `#0F0D2E` | `text-navy-900` | 제목 |
| Headline Max | Deep Night | `#0B0A20` | `text-navy-950` | 히어로 헤드라인 |

### 3.2 강조 텍스트 4단 시스템 (Emphasis Scale)

RE:Boot는 강조 텍스트를 **단일 색상**으로 쓰지 않고 **L1~L4 4단 시스템**으로 분리한다. 본문은 중성 그레이(`#1F2937`) 고정이며, 강조색은 **전체 면적의 15% 이하**만 차지한다.

| 레벨 | 용도 | 색상 | HEX | Tailwind | 대비비(on `#FAFAFB`) |
| --- | --- | --- | --- | --- | --- |
| **L1** | 히어로 그라데이션 (페이지당 1회) | Indigo → Violet → Lavender | `#6366F1 → #8B5CF6 → #A78BFA` | `bg-em-grad bg-clip-text text-transparent` | 장식용 |
| **L2** | 본문 인라인 키워드 (기본) | Iris / Deep Indigo | `#4F46E5` | `text-indigo-600 font-semibold` | **7.5:1 ✅ AAA** |
| **L3** | 통계/숫자 (최강) | Royal Indigo | `#4338CA` | `text-indigo-700 font-mono font-black` | **9.0:1 ✅ AAA** |
| **L4** | 링크/보조 | Iris | `#6366F1` | `text-indigo-500 underline decoration-indigo-200 decoration-2 underline-offset-4` | 4.6:1 ✅ AA |

#### L1 — 히어로 그라데이션

```html
<h1 class="text-7xl font-black text-navy-950">
  AI가 분석하고,<br/>
  <span class="bg-clip-text text-transparent"
        style="background-image:linear-gradient(135deg,#6366F1 0%,#8B5CF6 60%,#A78BFA 100%);">
    교수자가 결정합니다.
  </span>
</h1>
```

#### L2 — 본문 인라인 키워드 (기본 emphasis)

```html
<p class="text-lg text-slate2-700">
  부트캠프 중도 이탈률 <span class="font-mono font-bold text-indigo-700">21%</span>와
  <span class="font-semibold text-indigo-600">AI 과의존</span> 문제를 동시에 해결합니다.
</p>
```

#### L3 — 통계/숫자

```html
<div>
  <p class="text-indigo-700 font-mono text-8xl font-black tabular-nums">21%</p>
  <p class="text-sm text-slate2-500 mt-2">중도 이탈률 · 박진아·김지은 (2024)</p>
</div>
```

#### L4 — 링크

```html
<a class="text-indigo-600 font-medium
          underline decoration-indigo-200 decoration-2 underline-offset-4
          hover:decoration-indigo-600 transition" href="#">
  EDM 2025 Best Paper
</a>
```

### 3.3 기능별 시맨틱 컬러 (모듈 구분용)

4안은 단일 컬러 가족(인디고)이므로 각 기능 축은 **인디고 쉐이드**로만 구분한다. 과도한 시맨틱 컬러(amber/emerald/rose)는 사용하지 않는다.

| 기능 축 | 쉐이드 | HEX | Tailwind | 근거 |
| --- | --- | --- | --- | --- |
| 진단 (ZPD) | Deep Indigo | `#4F46E5` | `indigo-600` | 기본 L2 |
| 개입 (AI-TPACK) | Royal Indigo | `#4338CA` | `indigo-700` | 신뢰 · 교수자 승인 |
| 보정 (Bloom/Ebbinghaus) | Iris | `#6366F1` | `indigo-500` | 반복 · 부드러움 |
| 관계 (+α LA) | Violet Bridge | `#7C3AED` | `violet-600` | 유일한 외부 톤 (인디고→바이올렛 브릿지) |
| 튜터 (RAG) | Lavender | `#8B5CF6` | `violet-500` | L1 그라데이션 끝점 |

### 3.4 사용 비율 가이드 (60-30-10 규칙)

| 비율 | 컬러 그룹 | 용도 |
| --- | --- | --- |
| **60%** | Cream/White (`#FAFAFB`, `#FFFFFF`) + Body ink (`#1F2937`) | 배경 + 본문 |
| **30%** | Sky / Indigo tints (`#F3F4F8`, `#EEF2FF`, `#C7D2FE`) | 카드 배경, 테두리, 소프트 액센트 |
| **10%** | Strong indigo (`#4F46E5`, `#4338CA`) + L1 gradient | CTA, L2/L3 강조, 링크 |

### 3.5 접근성 — WCAG AA/AAA

모든 텍스트/배경 조합은 **대비비 4.5:1 이상**을 유지한다. 4안은 인디고-딥 대비가 강해 대부분 AAA 달성.

| 전경 | 배경 | 대비비 | 판정 |
| --- | --- | --- | --- |
| `#1F2937` | `#FAFAFB` | 15.1:1 | ✅ AAA |
| `#4F46E5` | `#FAFAFB` | 7.5:1 | ✅ AAA |
| `#4338CA` | `#FAFAFB` | 9.0:1 | ✅ AAA |
| `#6366F1` | `#FAFAFB` | 4.6:1 | ✅ AA |
| `#6366F1` | `#EEF2FF` | 4.2:1 | ⚠ Large text only |
| `#FFFFFF` | `#4F46E5` | 7.1:1 | ✅ AAA (CTA) |

의심스러운 조합은 [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)로 사전 검증.

### 3.6 금지 사항

- ❌ Amber / Gold / Yellow 계열 (`#F59E0B`, `#FBBF24`, `#FDE68A` 등) 사용 금지
- ❌ Emerald / Teal / Mint 계열 사용 금지
- ❌ Rose / Pink / Red 계열 사용 금지 (에러 메시지 예외)
- ❌ `indigo-300` 이하의 연한 인디고를 텍스트에 사용 금지 (대비 부족)
- ❌ 페이지당 L1 그라데이션 2회 이상 사용 금지 (번잡)
- ❌ 본문 텍스트에 인디고 계열 사용 금지 (본문은 `#1F2937` 고정)

---

## 4. 타이포그래피

### 4.1 글꼴 선택

| 용도 | 글꼴 | 이유 |
| --- | --- | --- |
| 본문·제목 | **Pretendard Variable** (100–900) | 한글/라틴 혼용이 가장 자연스러운 한국어 가변 폰트, 학술적 신뢰감 |
| 수치·코드 | **JetBrains Mono** | tabular figures 지원, 지표 숫자 정렬, 코드 스니펫 가독성 |

### 4.2 타입 스케일

| 계층 | Tailwind 클래스 | 굵기 | 트래킹 |
| --- | --- | --- | --- |
| Hero Headline | `text-6xl md:text-7xl lg:text-8xl` | `font-black` | `tracking-tight` |
| Section Title | `text-4xl md:text-5xl` | `font-bold` | `tracking-tight` |
| Card Title | `text-xl` | `font-semibold` | `tracking-normal` |
| Body | `text-base` | `font-normal` | `leading-relaxed` |
| Caption | `text-sm` | `font-normal` | `text-slate-500` |
| Metric (숫자) | `text-5xl font-mono` | `font-bold` | `tabular-nums` |

### 4.3 한국어 최적화

```css
html[lang="ko"] {
  font-family: 'Pretendard Variable', Pretendard, -apple-system, sans-serif;
  word-break: keep-all;           /* 단어 중간 줄바꿈 방지 */
  line-height: 1.7;               /* 한글은 넉넉한 행간 필수 */
  letter-spacing: -0.01em;        /* 미세한 음수 트래킹 */
  font-feature-settings: "tnum";  /* 숫자 너비 통일 */
}

.metric {
  font-family: 'JetBrains Mono', monospace;
  font-variant-numeric: tabular-nums;
}
```

### 4.4 한글 본문 체크포인트

- 한 줄 길이는 **45–70자** 사이 (너무 길면 가독성 급감)
- 두 글자 단어가 줄 끝에 혼자 남지 않도록 `word-break: keep-all`
- 긴 영문 혼용은 `overflow-wrap: break-word`로 보완

---

## 5. 컴포넌트 시스템 — Double-Bezel 적용

### 5.1 Double-Bezel 카드란?
카드 외곽의 1px subtle border **안쪽에** 4–8px 떨어진 지점에 **두 번째 inner border**를 겹쳐, "프레임 안의 프레임" 효과를 만드는 supanova의 시그니처 카드 스타일이다. 고급 인쇄물(학술지 표지, 미술관 도록)의 액자 효과를 떠오르게 한다.

```html
<div class="relative rounded-2xl bg-white border border-slate-200/70
            shadow-[0_1px_0_0_#fff_inset]">
  <!-- Outer bezel: 카드 자체의 border -->
  <div class="m-2 rounded-xl border border-slate-100 p-8">
    <!-- Inner bezel: 두 번째 프레임 -->
    <h3 class="text-xl font-semibold text-slate-900">GapMap 진단</h3>
    <p class="mt-3 text-slate-600 leading-relaxed">
      학습자의 ZPD(근접발달영역)를 SVG 도넛으로 시각화합니다.
    </p>
  </div>
</div>
```

### 5.2 Glass Morphism Navigation

```html
<nav class="fixed top-4 left-1/2 -translate-x-1/2 z-50
            px-6 py-3 rounded-full
            bg-white/70 backdrop-blur-xl
            border border-white/40
            shadow-lg shadow-indigo-900/5">
  <!-- 스크롤이 내려가면 backdrop-blur로 뒷배경이 블러됨 -->
</nav>
```

### 5.3 Button Variants

| 종류 | Tailwind | 용도 |
| --- | --- | --- |
| Primary | `bg-indigo-950 text-white hover:scale-[1.03] transition spring` | 메인 CTA (데모 시작, 논문 다운로드) |
| Secondary | `bg-white/60 backdrop-blur border border-white/50` | 부가 액션 (자세히 보기) |
| Ghost | `text-slate-600 hover:underline underline-offset-4` | 텍스트 링크 |
| Amber CTA | `bg-amber-500 text-indigo-950 hover:bg-amber-400` | "교수자 승인" 같은 HITL 액션 |

### 5.4 Card Variants

| 컴포넌트 | 용도 | 특징 |
| --- | --- | --- |
| `FeatureCard` | 6개 기능 소개 그리드 | Double-Bezel + 상단 아이콘 뱃지 |
| `StatCard` | 21%, +38% 등 지표 강조 | 큰 JetBrains Mono 숫자 + 작은 설명 |
| `QuoteCard` | 이론 인용, 교수자 인터뷰 | 이탤릭 + 좌측 Amber 세로 바 + 출처 캡션 |
| `DiagramCard` | SVG 다이어그램 컨테이너 | 배경 `bg-cream-50` + 내부 padding 넉넉 |

### 5.5 Iconify Solar 아이콘 가이드

- **Solar 계열만** 사용한다 (Solar Linear, Solar Bold, Solar Outline). 다른 세트와 혼용 금지.
- 크기: 본문 16px, 카드 타이틀 24px, 히어로 강조 40px
- 색: 기본 `text-slate-700`, 기능 맥락에 따라 시맨틱 컬러
- AI 관련 아이콘은 **뇌 / 로봇 금지** → 대신 `solar:graph-linear`, `solar:magnifer-zoom-in-linear`, `solar:hand-shake-linear` 활용

---

## 6. 모션 가이드

### 6.1 Spring Physics 기본값

```ts
// svelte/motion spring 사용 예
import { spring } from 'svelte/motion';
const scale = spring(1, { stiffness: 0.2, damping: 0.25 });
// Framer Motion 대응: { type: 'spring', stiffness: 200, damping: 25 }
```

### 6.2 주요 애니메이션 목록

| 상황 | 효과 | 지속 |
| --- | --- | --- |
| 페이지 로드 | `opacity 0→1` + `blur 8px→0` + `translateY 12px→0` | 600ms |
| Scroll Reveal | IntersectionObserver, 상단 20px → 0 | 500ms |
| Hover (버튼) | `scale 1 → 1.03` + shadow 확대 | 200ms cubic-bezier(0.2, 0.8, 0.2, 1) |
| Card Lift (카드 호버) | `translateY(0) → translateY(-4px)` + shadow | 250ms |
| Number Count-up | 스크롤 진입 시 0 → 목표값 | 1200ms easeOut |

### 6.3 금지 사항

- 자동 재생 carousel / slider
- 3초 이상 무한 루프 애니메이션 (로딩 스피너 제외)
- 마우스 이동에 반응하는 과한 parallax (2레이어 이상 금지)
- 사용자가 멈출 수 없는 동영상 배경

### 6.4 접근성

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 7. 레이아웃 그리드

### 7.1 컨테이너 & 간격

| 항목 | 값 | Tailwind |
| --- | --- | --- |
| Max container | 1152px | `max-w-6xl mx-auto` |
| Section 수직 여백 | 96px–128px | `py-24 md:py-32` |
| 내부 grid gap | 32px | `gap-8` |
| 컬럼 수 | 12 | `grid-cols-12` |
| Mobile padding | 16px | `px-4` |

### 7.2 비대칭 배치 원칙

1:1 대칭은 피한다. 대신 **7:5** 또는 **4:8** 비율을 사용하여 시선 흐름을 유도한다.

```html
<div class="grid grid-cols-12 gap-8 items-center">
  <div class="col-span-12 md:col-span-7">
    <!-- 텍스트 (주요) -->
  </div>
  <div class="col-span-12 md:col-span-5">
    <!-- 시각 요소 (보조) -->
  </div>
</div>
```

### 7.3 반응형 브레이크포인트

| 디바이스 | 폭 | 레이아웃 |
| --- | --- | --- |
| Mobile | < 768px | 1열, 16px padding, 타입 스케일 한 단계 축소 |
| Tablet | 768–1024px | 2열, gap-6 |
| Desktop | > 1024px | 12-col grid, 비대칭 배치 활성화 |

---

## 8. 랜딩 페이지 섹션 구성안

총 9개 섹션을 스크롤 순서대로 배치한다.

### 8.1 Hero

| 항목 | 내용 |
| --- | --- |
| 목적 | 3초 안에 "RE:Boot이 무엇인가"를 각인 |
| 핵심 메시지 | "AI가 분석하고, 교수자가 결정한다 — 부트캠프를 위한 Human-in-the-Loop 적응형 학습" |
| 레이아웃 | 7:5 비대칭. 좌측 헤드라인 + CTA, 우측 AI↔교수자 다이어그램 (SVG) |
| 컬러 | 배경 `#1E1B4B`, 핵심 단어 amber, 서브 cream |
| 모션 | 페이지 로드 시 헤드라인 fade-up-blur, 다이어그램은 선이 그려지는 stroke 애니메이션 (1회만) |

### 8.2 Problem — 21% 이탈률 & AI 과의존

| 항목 | 내용 |
| --- | --- |
| 목적 | 문제의 심각성을 수치와 인용으로 각인 |
| 핵심 메시지 | "부트캠프 이탈률 21%, 그 중 상당수는 AI 과의존으로 인한 메타인지 약화" |
| 레이아웃 | 상단 StatCard 3개 (21%, ↓메타인지, ↑생성형 의존), 하단 QuoteCard (선행연구 인용) |
| 컬러 | Rose로 위기감 강조, 배경은 cream 유지 |
| 모션 | 숫자 count-up, 인용구는 scroll reveal |

### 8.3 2-Tier Trust 아키텍처 다이어그램

| 항목 | 내용 |
| --- | --- |
| 목적 | RE:Boot의 핵심 구조 "AI 제안 → 교수자 승인 → 학습자 적용"을 시각화 |
| 핵심 메시지 | "신뢰는 두 겹의 검증에서 나온다" |
| 레이아웃 | 전폭 인터랙티브 SVG. 3개 노드 (AI, 교수자, 학습자)를 Amber/Indigo 화살표로 연결 |
| 컬러 | AI=Indigo, 교수자=Amber, 학습자=Emerald |
| 모션 | hover 시 노드 확대 + 설명 툴팁. 자동 재생은 하지 않는다 |

### 8.4 6개 기능 카드 그리드 (Double-Bezel)

| 항목 | 내용 |
| --- | --- |
| 목적 | MVP 기능 6개를 한눈에 |
| 핵심 메시지 | Placement, GapMap, Curriculum, Tutor, AI Recommendation Manager, Early Warning |
| 레이아웃 | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8` |
| 컬러 | 각 카드 상단에 기능별 시맨틱 컬러 2px 상단 띠 |
| 모션 | Scroll reveal stagger (각 카드 100ms 간격) |

### 8.5 이론-코드 매핑 표 (학술 신뢰 섹션)

| 항목 | 내용 |
| --- | --- |
| 목적 | 심사위원 대상 학술적 근거 제시 |
| 핵심 메시지 | "모든 기능은 논문과 파일에 1:1 매핑된다" |
| 레이아웃 | 좌측 이론(ZPD, TPACK, Bloom, Ebbinghaus), 우측 대응 파일 경로·함수명 |
| 컬러 | Indigo on Cream, 모노스페이스 코드 부분은 amber 배경 하이라이트 |
| 모션 | 없음 — 정적 표의 권위를 유지 |

### 8.6 해외 2025 학회 트렌드 정합성 타임라인

| 항목 | 내용 |
| --- | --- |
| 목적 | RE:Boot이 국제 흐름과 일치함을 보임 |
| 핵심 메시지 | AIED 2025, L@S 2025, EC-TEL 2025 주요 키워드 vs RE:Boot 대응 |
| 레이아웃 | 가로 타임라인, 각 학회 배지 + 핵심 키워드 2–3개 |
| 컬러 | Neutral 베이스, 매칭되는 RE:Boot 기능을 amber로 강조 |
| 모션 | 가로 스크롤 또는 scroll-linked progress bar |

### 8.7 데모 시나리오 (3분 비디오/GIF)

| 항목 | 내용 |
| --- | --- |
| 목적 | 실제 교수자 워크플로 시연 |
| 핵심 메시지 | "클릭 3번으로 AI 제안을 검토하고 승인" |
| 레이아웃 | 전폭 비디오 플레이어 + 하단 챕터 마커 |
| 컬러 | 비디오 테두리에 Double-Bezel 프레임 |
| 모션 | 자동 재생 금지. 사용자 클릭 시만 재생 |

### 8.8 팀 / 학술 정보

| 항목 | 내용 |
| --- | --- |
| 목적 | 연구진 신뢰도 |
| 핵심 메시지 | 소속, 역할, 연락처, 논문 DOI |
| 레이아웃 | 좌측 팀 프로필 카드, 우측 학술대회 배지 및 발표 정보 |
| 컬러 | Pure white surface, Indigo 텍스트 |
| 모션 | 없음 |

### 8.9 Footer + CTA

| 항목 | 내용 |
| --- | --- |
| 목적 | 마지막 액션 유도 |
| 핵심 메시지 | "데모 체험", "논문 PDF", "GitHub" 3개 버튼 |
| 레이아웃 | 중앙 정렬, 상단 얇은 separator |
| 컬러 | Indigo 배경, Amber CTA |
| 모션 | CTA hover scale |

---

## 9. 데모 UI 화면별 디자인 방향

MVP 6개 기능 화면에 대한 개별 UX 원칙.

| 화면 | 핵심 원칙 | 시각 포인트 |
| --- | --- | --- |
| **Placement** | 설문 조사처럼 보이지 않게. "대화형 퀴즈" 느낌. 한 화면 한 질문, 진행률은 상단 얇은 바. | 질문 카드를 Double-Bezel로, 선택지는 큰 터치 영역 버튼 |
| **GapMap** | SVG 도넛을 화면 중앙에 배치, 섹터별 시맨틱 컬러 (ZPD 영역은 Indigo) | 호버 시 해당 섹터가 팝아웃되며 결손 스킬 설명 |
| **Curriculum** | 주차별 타임라인 + "AI 제안" 배지. 교수자는 드래그로 순서 조정 가능 | 타임라인 노드 크기로 중요도 표현, AI 제안은 amber 점선 테두리 |
| **Tutor Chat** | 좌측 학습자 버블, 우측 AI 버블로 비대칭. 출처 카드는 AI 메시지 하단에 접힘 상태로, 클릭 시 펼침 | Violet 계열, 출처 카드는 cream 배경 |
| **AI Recommendation Manager** (교수자) | 제안 큐 = 카드 리스트. 각 카드에 "사유" "증거" "영향 범위" 확장 섹션. 승인/반려/수정 3버튼 | 카드 좌측 Amber 세로 바, 승인 시 Emerald glow |
| **Early Warning** | 위험군 학습자는 은은한 Rose glow (`shadow-[0_0_24px_rgba(244,63,94,0.2)]`), 안전군은 Emerald | 리스트는 정렬 가능, 위험도에 따라 자동 상단 정렬 |

---

## 10. 구현 옵션

### Option A — SvelteKit 내부 전용 컴포넌트

- 경로: `web/src/routes/+page.svelte` 및 `web/src/lib/components/landing/*.svelte`
- **장점**
  - 데모 앱과 동일한 코드베이스 → 일관된 디자인 토큰 공유
  - Svelte 5 runes로 반응형 상태 관리가 간결
  - 실제 데이터(API)를 끌어와 인터랙티브 데모 섹션을 넣을 수 있음
- **단점**
  - 빌드·배포 파이프라인 의존 (Vite, adapter 설정)
  - 심사용으로만 빠르게 배포하기엔 오버헤드

### Option B — Standalone HTML 랜딩 페이지

- 경로: `landing/index.html` (단일 파일) + `landing/assets/*`
- Tailwind CDN, Iconify CDN, supanova-design-skill 원형에 가장 근접
- **장점**
  - 1 파일로 어디에나 배포 (Vercel, Netlify, GitHub Pages, USB)
  - 심사위원에게 링크 하나만 공유하면 됨
  - supanova 스킬 템플릿을 거의 그대로 활용 가능
- **단점**
  - 데모 앱과 디자인 토큰 동기화를 수동으로 관리해야 함
  - 복잡한 인터랙션(실 API 연동)은 불가

### 권장 전략

두 옵션을 **병행**한다.
1. **Option B (Standalone HTML)** 를 학회 제출·심사용 공식 랜딩으로 사용 (최우선 작업)
2. **Option A (SvelteKit)** 는 라이브 데모 경로 `/demo/*` 로 제공, 랜딩의 CTA 버튼에서 링크로 연결

---

## 11. 품질 체크리스트

배포 직전 다음을 전수 검사한다.

| 카테고리 | 항목 | 통과 기준 |
| --- | --- | --- |
| 한국어 타이포 | `word-break: keep-all` 전역 적용 | ✅ |
| 한국어 타이포 | 본문 line-height 1.7 이상 | ✅ |
| 한국어 타이포 | 두 글자 단어 고립 없음 | 눈으로 확인 |
| 접근성 | 모든 본문 대비비 4.5:1 | WebAIM 통과 |
| 접근성 | `prefers-reduced-motion` 존중 | DevTools 시뮬레이션 |
| 접근성 | 키보드 포커스 링 보임 | Tab 순회 테스트 |
| 반응형 | 375 / 768 / 1440 / 1920 | 모두 레이아웃 깨지지 않음 |
| 반응형 | 모바일 타이포 2단계 축소 | ✅ |
| 다크 모드 | (옵션) 지원 여부 명시 | 본 제출에서는 라이트 단일 권장 |
| 성능 | LCP < 3s | Lighthouse 통과 |
| 성능 | 이미지 WebP/AVIF | 원본 PNG/JPG 금지 |
| 성능 | 총 JS 페이로드 < 200KB (gzip) | Standalone HTML 기준 |
| 아이콘 | Iconify Solar 계열만 사용 | 혼용 금지 |
| 아이콘 | AI 클리셰(뇌·로봇) 없음 | ✅ |
| 모션 | 자동 재생 / 무한 루프 없음 | ✅ |
| 모션 | 발표 중 심사위원 시선 방해 없음 | 리허설로 확인 |
| 콘텐츠 | 모든 수치에 출처 명시 (footnote) | ✅ |
| 콘텐츠 | 이론-코드 매핑 링크 작동 | 404 없음 |
| SEO / 메타 | og:image 1200×630, 한글 title/description | ✅ |
| 브라우저 | Chrome, Safari, Firefox 최신 2버전 | 동일 렌더링 |

---

## 부록 A — 디자인 토큰 요약 (복붙용)

```js
// tailwind.config.js (발췌)
export default {
  theme: {
    extend: {
      colors: {
        indigo: { 950: '#1E1B4B', 900: '#312E81' },
        amber:  { 500: '#F59E0B', 600: '#D97706' },
        cream:  { 50: '#FAF9F6', 100: '#F3F0E9' },
        ink:    { 900: '#0F172A', 500: '#64748B' },
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', 'Pretendard', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    },
  },
};
```

## 부록 B — 참고 링크

- supanova-design-skill: https://github.com/uxjoseph/supanova-design-skill
- Pretendard: https://github.com/orioncactus/pretendard
- Iconify Solar: https://icon-sets.iconify.design/solar/
- WCAG 2.1 AA: https://www.w3.org/WAI/WCAG21/quickref/
- Korean Society for Educational Information Media: 2026 춘계학술대회

---

> 본 가이드라인은 2026-04-05 기준으로 작성되었으며, 학회 제출일까지 디자인 리뷰를 2회 이상 반복하여 검증한다. 각 섹션의 "권장값"은 프로토타입 과정에서 실제 심사위원 리허설 피드백에 따라 조정 가능하다.

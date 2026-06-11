# 주거금융계산기 MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 공식 출처 기반 금융 가이드와 브라우저 전용 계산기 3개를 제공하는 Next.js MVP 및 Codex 운영 하네스를 구축한다.

**Architecture:** App Router가 정적 페이지와 MDX 가이드를 렌더링하고, 계산기 클라이언트 컴포넌트는 `src/calculators`의 순수 함수만 호출한다. 콘텐츠는 구조화된 공식 출처 레지스트리와 검증 스크립트를 통과해야 공개되며, 입력값은 서버로 전송하거나 저장하지 않는다.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, MDX, Vitest, Testing Library, ESLint, GitHub Actions, Vercel

---

## 파일 구조

- `src/calculators/*`: 산식, 입력 검증, 결과 타입
- `src/components/calculators/*`: 입력 상태와 결과 표시
- `src/components/content/*`: 출처, 업데이트일, 면책 표시
- `src/data/sources.ts`: 공식 출처 단일 레지스트리
- `src/lib/content.ts`: MDX frontmatter 로드와 공개 문서 필터
- `content/guides/*.mdx`: 검토 완료된 가이드 3개
- `scripts/validate-content.ts`: 메타데이터, 출처, 금지 표현 검증
- `src/app/*`: 홈, 계산기, 가이드, 정책 페이지
- `skills/*/SKILL.md`, `AGENTS.md`, `docs/*.md`: Codex 운영 규칙

### Task 1: 프로젝트 기반과 테스트 러너

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `vitest.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`
- Create: `src/app/layout.tsx`, `src/app/globals.css`, `src/test/setup.ts`
- Test: `src/app/layout.test.tsx`

- [ ] **Step 1: 패키지 메타데이터와 Vitest 설정을 만든다**
- [ ] **Step 2: 루트 레이아웃이 사이트명과 기본 메타데이터를 제공한다는 실패 테스트를 작성한다**
- [ ] **Step 3: `npm test -- src/app/layout.test.tsx`를 실행해 모듈 부재 실패를 확인한다**
- [ ] **Step 4: 최소 루트 레이아웃과 전역 스타일을 구현한다**
- [ ] **Step 5: 테스트를 다시 실행해 통과를 확인한다**
- [ ] **Step 6: `chore: scaffold Next.js application`으로 커밋한다**

### Task 2: 계산기 순수 함수

**Files:**
- Create: `src/calculators/validation.ts`
- Create: `src/calculators/jeonse-increase.ts`
- Create: `src/calculators/loan-interest.ts`
- Create: `src/calculators/loan-increase.ts`
- Test: `src/calculators/*.test.ts`

- [ ] **Step 1: 보증금 5% 경계, 0원, 감소 금액 테스트를 작성한다**
- [ ] **Step 2: 테스트를 실행해 함수 부재 실패를 확인한다**
- [ ] **Step 3: `(new-old)/old*100`과 원 단위 반올림을 구현한다**
- [ ] **Step 4: 월 이자 정상값, 소수 금리, 음수 거부 테스트를 작성하고 실패를 확인한다**
- [ ] **Step 5: `principal * annualRate / 100 / 12`를 구현한다**
- [ ] **Step 6: 기존·증액분 금리 분리 계산 테스트를 작성하고 실패를 확인한다**
- [ ] **Step 7: 기존 이자, 증액분 이자, 합계와 증가액을 구현한다**
- [ ] **Step 8: 전체 계산기 테스트 통과를 확인한다**
- [ ] **Step 9: `feat: add finance calculator core`로 커밋한다**

### Task 3: 공식 출처와 콘텐츠 검증

**Files:**
- Create: `src/data/sources.ts`
- Create: `src/lib/content-schema.ts`
- Create: `scripts/validate-content.ts`
- Test: `scripts/validate-content.test.ts`

- [ ] **Step 1: 공식기관 URL, 확인일, 제목을 조사해 레지스트리 타입과 초기 데이터를 정의한다**
- [ ] **Step 2: 필수 frontmatter 누락, 미등록 출처, 금지 표현을 거부하는 실패 테스트를 작성한다**
- [ ] **Step 3: 검증 테스트를 실행해 구현 부재 실패를 확인한다**
- [ ] **Step 4: frontmatter 파싱과 검증 함수를 최소 구현한다**
- [ ] **Step 5: 정책 문서와 fixture를 공개 콘텐츠 검사에서 제외한다**
- [ ] **Step 6: 테스트와 `npm run validate:content` 통과를 확인한다**
- [ ] **Step 7: `feat: validate official-source content`로 커밋한다**

### Task 4: 계산기 UI와 페이지

**Files:**
- Create: `src/components/calculators/money-input.tsx`
- Create: `src/components/calculators/calculator-shell.tsx`
- Create: `src/components/calculators/jeonse-increase-calculator.tsx`
- Create: `src/components/calculators/loan-interest-calculator.tsx`
- Create: `src/components/calculators/loan-increase-calculator.tsx`
- Create: `src/app/calculators/*/page.tsx`
- Test: `src/components/calculators/*.test.tsx`

- [ ] **Step 1: 입력값을 네트워크 전송 없이 계산하고 오류를 인접 표시하는 컴포넌트 테스트를 작성한다**
- [ ] **Step 2: 테스트를 실행해 컴포넌트 부재 실패를 확인한다**
- [ ] **Step 3: 공통 입력, 셸, 결과 패널을 구현한다**
- [ ] **Step 4: 세 계산기 컴포넌트와 페이지를 구현한다**
- [ ] **Step 5: 결과에 `예상 계산값`과 금융기관 재확인 문구가 있는지 검증한다**
- [ ] **Step 6: UI 테스트 통과를 확인한다**
- [ ] **Step 7: `feat: add browser-only calculator pages`로 커밋한다**

### Task 5: 가이드 3개와 MDX 렌더링

**Files:**
- Create: `content/guides/hug-hf-sgi-comparison.mdx`
- Create: `content/guides/loan-extension-vs-refinance.mdx`
- Create: `content/guides/lease-renewal-right.mdx`
- Create: `src/lib/content.ts`
- Create: `src/components/content/source-list.tsx`
- Create: `src/components/content/financial-disclaimer.tsx`
- Create: `src/app/guides/page.tsx`, `src/app/guides/[slug]/page.tsx`
- Test: `src/lib/content.test.ts`

- [ ] **Step 1: 검토 완료 콘텐츠만 목록화하고 잘못된 slug를 거부하는 실패 테스트를 작성한다**
- [ ] **Step 2: 테스트를 실행해 로더 부재 실패를 확인한다**
- [ ] **Step 3: MDX 로더와 정적 경로 생성을 구현한다**
- [ ] **Step 4: 2026-06-11 기준 공식 원문을 확인해 가이드 3개를 작성한다**
- [ ] **Step 5: 모든 사실 주장에 등록 출처를 연결하고 확인일과 면책을 표시한다**
- [ ] **Step 6: 콘텐츠 테스트와 검증 명령 통과를 확인한다**
- [ ] **Step 7: `feat: publish official-source housing guides`로 커밋한다**

### Task 6: B안 홈과 공통 내비게이션

**Files:**
- Create: `src/components/site-header.tsx`, `src/components/site-footer.tsx`
- Create: `src/components/calculator-card.tsx`, `src/components/guide-card.tsx`
- Modify: `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/globals.css`
- Test: `src/app/page.test.tsx`

- [ ] **Step 1: 홈에서 세 계산기와 세 가이드가 한 번의 링크로 연결된다는 실패 테스트를 작성한다**
- [ ] **Step 2: 테스트 실패를 확인한다**
- [ ] **Step 3: B안의 계산기 우선 히어로, 카드, 신뢰 정보를 구현한다**
- [ ] **Step 4: 반응형 헤더와 푸터를 구현한다**
- [ ] **Step 5: 홈 테스트 통과를 확인한다**
- [ ] **Step 6: `feat: build calculator-first homepage`로 커밋한다**

### Task 7: 정책 페이지와 AdSense 준비

**Files:**
- Create: `src/components/ad-slot.tsx`, `src/components/adsense-script.tsx`
- Create: `src/app/about/page.tsx`, `src/app/contact/page.tsx`
- Create: `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`
- Create: `.env.example`
- Test: `src/components/ad-slot.test.tsx`

- [ ] **Step 1: 광고 환경변수가 없을 때 마크업을 렌더링하지 않는 실패 테스트를 작성한다**
- [ ] **Step 2: 실패를 확인하고 조건부 광고 컴포넌트를 구현한다**
- [ ] **Step 3: 자체 금융정보 수집 폼 없는 소개·문의·정책 페이지를 작성한다**
- [ ] **Step 4: 광고 사용 여부에 맞는 개인정보 문구와 환경변수 예시를 추가한다**
- [ ] **Step 5: 관련 테스트 통과를 확인한다**
- [ ] **Step 6: `feat: add policy pages and optional ads`로 커밋한다**

### Task 8: Codex 운영 하네스

**Files:**
- Create: `AGENTS.md`
- Create: `docs/source-policy.md`, `docs/content-policy.md`
- Create: `docs/financial-disclaimer.md`, `docs/publishing-checklist.md`
- Create: `skills/content-writer/SKILL.md`
- Create: `skills/fact-checker/SKILL.md`
- Create: `skills/calculator-builder/SKILL.md`
- Create: `skills/seo-reviewer/SKILL.md`
- Create: `README.md`

- [ ] **Step 1: 명세의 출처, 개인정보, 계산, PR 규칙을 AGENTS.md에 작성한다**
- [ ] **Step 2: 네 정책 문서에 허용 출처, 금지 표현, 면책, 게시 체크리스트를 분리한다**
- [ ] **Step 3: 반복 작업별 Skill 입력·절차·출력 형식을 작성한다**
- [ ] **Step 4: README에 로컬 실행, 검증, Vercel 환경변수와 운영 흐름을 작성한다**
- [ ] **Step 5: `docs: add Codex publishing harness`로 커밋한다**

### Task 9: CI, SEO, 최종 검증

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`
- Modify: `next.config.ts`, `package.json`

- [ ] **Step 1: CI에서 install, test, lint, typecheck, content validation, build를 실행하도록 구성한다**
- [ ] **Step 2: sitemap, robots, canonical metadata를 추가한다**
- [ ] **Step 3: `npm test`, `npm run lint`, `npm run typecheck`, `npm run validate:content`, `npm run build`를 각각 실행한다**
- [ ] **Step 4: 로컬 서버를 띄우고 브라우저에서 홈, 계산기 3개, 가이드 3개, 정책 페이지를 확인한다**
- [ ] **Step 5: 모바일·데스크톱 레이아웃, 콘솔 오류, 광고 미설정 빈 공간 부재를 확인한다**
- [ ] **Step 6: 명세 성공 기준을 항목별로 대조한다**
- [ ] **Step 7: `chore: add CI and production checks`로 커밋한다**


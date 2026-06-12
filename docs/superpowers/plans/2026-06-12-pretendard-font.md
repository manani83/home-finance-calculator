# Pretendard Font Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the locally hosted Pretendard Variable font to every site surface without changing the existing typography scale or content.

**Architecture:** Store one official variable WOFF2 asset beside the App Router layout, register it with `next/font/local`, and expose it through a CSS variable on `body`. Global CSS consumes that variable first and retains a Korean-capable system fallback stack.

**Tech Stack:** Next.js App Router, TypeScript, `next/font/local`, Vitest, CSS

---

### Task 1: Add a font integration regression test

**Files:**
- Create: `src/app/font-integration.test.ts`

- [x] **Step 1: Write the failing test**

Read `layout.tsx` and `globals.css`, then assert that the layout imports `next/font/local`, registers `PretendardVariable.woff2` with `display: "swap"`, `weight: "45 920"`, and `variable: "--font-pretendard"`, applies the generated variable class to `body`, and that global CSS uses `var(--font-pretendard)`.

- [x] **Step 2: Run test to verify it fails**

Run: `npm test -- src/app/font-integration.test.ts`

Expected: FAIL because the local font registration and CSS variable do not exist.

### Task 2: Add and connect Pretendard Variable

**Files:**
- Create: `src/app/fonts/PretendardVariable.woff2`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

- [x] **Step 1: Download the official font asset**

Download `packages/pretendard/dist/web/variable/PretendardVariable.woff2` from the official Pretendard release source into `src/app/fonts`.

- [x] **Step 2: Register the local variable font**

Use `localFont` in `layout.tsx` with `display: "swap"`, `weight: "45 920"`, and `variable: "--font-pretendard"`. Apply `pretendard.variable` to `body`.

- [x] **Step 3: Update the global fallback stack**

Set the body font family to `var(--font-pretendard), -apple-system, BlinkMacSystemFont, system-ui, "Noto Sans KR", "Malgun Gothic", sans-serif`.

- [x] **Step 4: Run focused test to verify it passes**

Run: `npm test -- src/app/font-integration.test.ts`

Expected: PASS.

### Task 3: Verify behavior and build

**Files:**
- Verify only

- [ ] **Step 1: Run required checks**

Run `npm test`, `npm run lint`, `npm run typecheck`, `npm run validate:content`, and `npm run build`.

- [ ] **Step 2: Verify in browser**

Check the home page, loan-interest calculator, guide article, and privacy page at desktop and 390px mobile widths. Confirm the computed font family contains Pretendard, headings do not overflow, and no horizontal scrolling is introduced.

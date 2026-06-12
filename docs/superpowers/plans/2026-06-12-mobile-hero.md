# Mobile Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the oversized mobile homepage hero with the approved B option while preserving the current desktop hero.

**Architecture:** Render separate desktop and mobile hero copy inside the same semantic hero content block, then switch visibility at the existing 760px breakpoint. Use a dedicated highlight class for the two mobile keywords and mobile-only spacing rules for the hero actions and trust card.

**Tech Stack:** Next.js App Router, React, CSS, Vitest, Testing Library

---

### Task 1: Add mobile hero regression coverage

**Files:**
- Modify: `src/app/page.test.tsx`
- Create: `src/app/mobile-hero.test.ts`

- [x] **Step 1: Add failing content assertions**

Render `HomePage` and assert that the desktop copy remains, the mobile heading contains `전세금`, `대출 이자`, and `한눈에 계산하세요`, and the mobile supporting text and privacy copy exist.

- [x] **Step 2: Add failing CSS assertions**

Read `globals.css` and assert that desktop/mobile copy classes switch visibility, mobile heading uses `36px` and `1.1`, highlighted words use `var(--brand)`, and the mobile action grid remains two columns at 390px but becomes one column at 360px or below.

- [x] **Step 3: Run focused tests**

Run `npm test -- src/app/page.test.tsx src/app/mobile-hero.test.ts`.

Expected: FAIL because the mobile hero elements and styles are absent.

### Task 2: Implement the approved B hero

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/globals.css`

- [x] **Step 1: Add desktop and mobile copy blocks**

Keep the existing desktop heading and description under desktop-only classes. Add a mobile heading with highlighted `전세금` and `대출 이자`, the phrase `한눈에 계산하세요`, and the approved short description.

- [x] **Step 2: Add mobile trust-card copy**

Keep the desktop trust card unchanged and add mobile-only label and statement elements for `브라우저에서만 계산` and `입력한 금액과 금리는 외부로 전송되지 않습니다.`.

- [x] **Step 3: Add responsive styles**

Hide mobile copy by default. At `max-width: 760px`, hide desktop copy, show mobile copy, set the title to `36px/1.1`, color highlighted words with `var(--brand)`, tighten hero spacing, and preserve two action columns. At `max-width: 360px`, stack actions vertically and reduce the title to `34px`.

- [x] **Step 4: Run focused tests**

Run `npm test -- src/app/page.test.tsx src/app/mobile-hero.test.ts`.

Expected: PASS.

### Task 3: Verify the responsive result

**Files:**
- Verify only

- [x] **Step 1: Run required repository checks**

Run `npm test`, `npm run lint`, `npm run typecheck`, `npm run validate:content`, and `npm run build`.

- [x] **Step 2: Verify desktop and mobile browsers**

Check the homepage at default desktop width, 390x844, and 320x800. Confirm desktop copy is unchanged, mobile copy uses three balanced lines, both highlighted words use the brand color, buttons fit, and no horizontal scrolling occurs.

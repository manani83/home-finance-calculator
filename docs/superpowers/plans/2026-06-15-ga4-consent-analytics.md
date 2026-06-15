# GA4 Consent Analytics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Load GA4 only after explicit analytics consent while preventing calculator values and results from being sent to analytics.

**Architecture:** A client-side consent component owns the local consent state and conditionally renders Next.js's `GoogleAnalytics` component. The root layout passes only the public measurement ID, calculators remain analytics-free, and the privacy page documents collection and controls.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, `@next/third-parties`, Vitest, Testing Library

---

### Task 1: Specify consent behavior with failing tests

**Files:**
- Create: `src/components/analytics-consent.test.tsx`
- Modify: `src/app/layout.test.tsx`
- Modify: `src/app/adsense-readiness.test.tsx`

- [ ] Test that no measurement ID renders no consent UI.
- [ ] Test that an undecided visitor sees the consent banner without a Google Analytics script.
- [ ] Test that consent persists and enables Google Analytics.
- [ ] Test that refusal persists and keeps Google Analytics disabled.
- [ ] Test that the privacy page describes analytics collection, exclusions, and opt-out controls.
- [ ] Run the focused tests and confirm they fail because the feature does not exist.

### Task 2: Implement consent-gated analytics

**Files:**
- Create: `src/components/analytics-consent.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`
- Modify: `.env.example`
- Modify: `package.json`
- Modify: `package-lock.json`

- [ ] Install `@next/third-parties`.
- [ ] Implement the consent component using one namespaced local storage key.
- [ ] Render analytics only after consent and only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` exists.
- [ ] Add accessible fixed banner styles that remain usable on mobile.
- [ ] Add the measurement ID placeholder to `.env.example`.
- [ ] Run focused tests and confirm they pass.

### Task 3: Update privacy documentation and guard calculator data

**Files:**
- Modify: `src/app/privacy/page.tsx`
- Modify: `src/app/adsense-readiness.test.tsx`

- [ ] Document GA4 purpose, collected visit metadata, consent behavior, cookie controls, and Google policy links.
- [ ] State that deposits, loan amounts, rates, calculation results, and form input are not sent.
- [ ] Add a source-level test that calculator components do not call `sendGAEvent`, `gtag`, or `dataLayer`.
- [ ] Run the privacy and analytics tests.

### Task 4: Verify and publish

**Files:**
- Verify only

- [ ] Run `npm test`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run validate:content`.
- [ ] Run `npm run build`.
- [ ] Verify the consent flow in the browser with a temporary measurement ID.
- [ ] Commit, push, and create a Korean-language PR.


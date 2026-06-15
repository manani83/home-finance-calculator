# Numeric Input Formatting Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Format every calculator numeric input with thousands separators and keep all input controls aligned.

**Architecture:** Keep calculator state as normalized numeric strings while formatting only the displayed input value in the shared input components. Stabilize grid and flex sizing through shared CSS so money and rate fields have identical dimensions.

**Tech Stack:** React 19, TypeScript, Testing Library, Vitest, CSS Grid/Flexbox

---

### Task 1: Add numeric input behavior tests

**Files:**
- Create: `src/components/calculators/money-input.test.tsx`
- Modify: `src/components/calculators/loan-interest-calculator.test.tsx`

- [ ] Add tests that type `1000000` into `MoneyInput` and expect `1,000,000` while `onChange` receives `1000000`.
- [ ] Add tests that type `1234.56` into `RateInput` and expect `1,234.56` while `onChange` receives `1234.56`.
- [ ] Run `npm test -- src/components/calculators/money-input.test.tsx` and confirm the formatting assertions fail because the current number inputs cannot display commas.

### Task 2: Implement normalized formatted inputs

**Files:**
- Modify: `src/components/calculators/money-input.tsx`

- [ ] Add pure normalization and formatting helpers for integer and decimal numeric strings.
- [ ] Change both shared inputs to `type="text"`, retain their current `inputMode`, and pass normalized values to `onChange`.
- [ ] Run the focused component tests and confirm they pass.
- [ ] Run the calculator tests and confirm calculations still receive comma-free values.

### Task 3: Stabilize numeric input layout

**Files:**
- Modify: `src/app/globals.css`

- [ ] Set `.field` and `.input-with-unit` to `min-width: 0` and `width: 100%`.
- [ ] Set `.input-with-unit input` to `min-width: 0`, `width: 100%`, and `flex: 1 1 auto`.
- [ ] Confirm the two-column form keeps money and rate fields within equal grid columns.

### Task 4: Verify the complete project

**Files:**
- Verify only

- [ ] Run `npm test`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run validate:content`.
- [ ] Run `npm run build`.


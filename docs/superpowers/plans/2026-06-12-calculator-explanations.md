# Calculator Explanations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add decision-useful explanatory content to all three calculator pages without changing their calculation behavior.

**Architecture:** A reusable server-safe presentation component renders a typed explanation model and resolves official source IDs through the existing source registry. Each calculator supplies only its own formula, example, rounding rule, exclusions, cautions, and source IDs.

**Tech Stack:** Next.js, React, TypeScript, Vitest, Testing Library

---

### Task 1: Lock the content contract with tests

**Files:**
- Create: `src/components/calculators/calculator-explanation.test.tsx`
- Modify: `src/components/calculators/loan-interest-calculator.test.tsx`
- Create: `src/components/calculators/calculator-content.test.tsx`

- [ ] Write tests requiring the six content sections, valid official links, and calculator-specific formulas.
- [ ] Run the focused tests and confirm they fail because the component and content are absent.

### Task 2: Implement the shared explanation component

**Files:**
- Create: `src/components/calculators/calculator-explanation.tsx`
- Modify: `src/app/globals.css`

- [ ] Define the typed content interface and render all six sections.
- [ ] Resolve source IDs using `officialSourceMap` and render checked dates.
- [ ] Add responsive styles matching the existing guide and policy surfaces.
- [ ] Run the focused tests and confirm the shared component passes.

### Task 3: Add content to all calculators

**Files:**
- Modify: `src/components/calculators/jeonse-increase-calculator.tsx`
- Modify: `src/components/calculators/loan-interest-calculator.tsx`
- Modify: `src/components/calculators/loan-increase-calculator.tsx`

- [ ] Add formulas and examples consistent with the current pure functions.
- [ ] State won rounding rules and costs or review factors excluded from each estimate.
- [ ] Link only registered official sources.
- [ ] Run focused component tests and confirm they pass.

### Task 4: Verify the repository

**Files:**
- No production files

- [ ] Run `npm test`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run validate:content`.
- [ ] Run `npm run build`.
- [ ] Report any environment-only failures separately from code failures.


# Typography Hierarchy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the selected balanced typography and color hierarchy across calculator, guide, and policy pages.

**Architecture:** Introduce semantic color tokens in the global stylesheet, then apply them to existing page-level selectors. Preserve the current component markup and responsive layout.

**Tech Stack:** CSS, Next.js, Vitest, in-app browser

---

### Task 1: Define the visual hierarchy contract

**Files:**
- Create: `src/app/typography-hierarchy.test.ts`

- [ ] Assert that strong heading, secondary text, and body text tokens exist.
- [ ] Assert that calculator and policy title selectors use distinct weight and color rules.
- [ ] Run the focused test and confirm it fails before CSS changes.

### Task 2: Apply the balanced visual system

**Files:**
- Modify: `src/app/globals.css`

- [ ] Add semantic heading and text color tokens.
- [ ] Strengthen calculator, guide, section, and policy title hierarchy.
- [ ] Restyle calculator explanation boundaries and cards using the selected B direction.
- [ ] Add mobile title sizing safeguards.
- [ ] Run the focused test and confirm it passes.

### Task 3: Verify behavior and rendering

**Files:**
- No additional production files

- [ ] Run all repository completion commands.
- [ ] Inspect representative calculator, guide, and policy pages at desktop and mobile widths.
- [ ] Confirm no horizontal overflow and clear heading-to-body differentiation.


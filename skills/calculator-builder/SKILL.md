---
name: calculator-builder
description: Use when adding or changing Korean jeonse, lease, deposit, or loan calculators, formulas, rounding, limits, validation, or calculator UI behavior in this project.
---

# Calculator Builder

## Read First

- Read only the target calculator, its test, and directly connected UI/page files first.
- Read official sources only when formulas, limits, rates, or eligibility rules are changing.
- Do not scan all guides unless a formula or displayed explanation affects them.

## Rules

1. Define inputs, outputs, units, rounding, exclusions, and source IDs before editing.
2. Keep formulas in `src/calculators` pure functions. Do not put financial formulas in UI components.
3. Write or update failing tests for normal values, 0, negatives, boundaries, decimals, and large won amounts before implementation.
4. Keep calculator inputs in-browser only. Do not add API calls, logs, cookies, local storage, or analytics for input values.
5. Label results as `예상 계산값` and separate them from actual screening or approval outcomes.

## Verify

- Formula only: run the relevant calculator test and `npm run typecheck`.
- Formula plus content/source text: also run `npm run validate:content`.
- UI behavior: run the relevant component test, `npm run lint`, and `npm run typecheck`.

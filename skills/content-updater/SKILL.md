---
name: content-updater
description: Use when updating existing Korean housing finance guides, official source metadata, checkedAt dates, formulas, limits, rates, rounding, or calculator explanations against current official sources.
---

# Content Updater

## Read First

- Start with the requested guide/source/calculator only.
- Read `src/data/sources.ts` entries referenced by that item.
- Read `src/calculators` and calculator UI only if official sources mention formulas, limits, rates, rounding, eligibility, exclusions, or displayed explanations.
- Do not scan all guides unless a changed source or formula is reused across pages.

## Update

1. Compare current content against official originals as of today.
2. Check guide body/frontmatter, source metadata, calculator formulas, UI explanations, exclusions, cautions, and source IDs when relevant.
3. Modify only items whose official source changed.
4. Leave unchanged content, formulas, and UI text untouched when the official source still matches.
5. If official pages are inaccessible or conflict, do not guess. Keep existing text and report the blocked item.
6. If formulas, limits, rates, or rounding change, update pure functions, tests, UI explanation, and affected guides together.

## Verify

- Source/content only: `npm run validate:content`.
- Formula change: relevant calculator tests, `npm run typecheck`, and `npm run validate:content`.
- UI explanation change: relevant component test or page check plus `npm run lint`.

## Report

- Changed items
- Unchanged items intentionally left as-is
- Official sources checked and check date
- Formula change 여부
- Blocked or human-review items

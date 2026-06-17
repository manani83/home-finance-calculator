---
name: fact-checker
description: Use when reviewing Korean housing finance content, calculator explanations, official source claims, risky financial wording, disclaimers, or changed guide/calculator files.
---

# Fact Checker

## Scope

- Review changed files first. Do not read unrelated guides or calculators.
- Escalate to official sources for numbers, periods, eligibility, legal rules, formulas, limits, rates, and guarantees.
- Read `src/calculators` only when examples or formulas are touched.

## Check

1. Match each factual claim to official source ID, URL, title, organization, and checked date.
2. Confirm unsupported or conflicting claims were not added.
3. Find risky guarantees: approval certainty, lowest-rate certainty, universal eligibility, or product steering.
4. Reproduce changed calculation examples with `src/calculators`.
5. For formula/rule changes, confirm pure functions, tests, UI explanations, and affected guides changed together.
6. Confirm no collection or external transfer of calculator input values was added.

## Report

Use this order: `통과 여부`, `수정 필요`, `출처 부족`, `계산 검토`, `변경 없음 유지`, `사람 확인`.

---
name: content-drafter
description: Use when drafting a new Korean housing finance MDX guide, adding a new guide slug, or creating new official-source-backed explanatory content.
---

# Content Drafter

## Read First

- Read `AGENTS.md` content rules and `docs/source-policy.md`.
- Read only nearby guide examples needed for structure. Do not load every guide.
- Register or reuse source IDs from `src/data/sources.ts` before writing claims.

## Draft

1. Define reader question, scope, 기준일, and official institutions.
2. Use official HTTPS originals first. Blogs, media, and communities are only clues.
3. Exclude unsupported or conflicting claims and report them as review items.
4. Create `content/guides/*.mdx` with required frontmatter: `title`, `description`, `slug`, `updatedAt`, `reviewStatus`, `sources`, `disclaimer`.
5. Include summary, target reader, core explanation, checklist, official sources, and disclaimer.
6. Avoid guarantees such as `무조건 가능`, `반드시 승인`, `100% 보장`, `최저금리 확정`.

## Verify

- Run `npm run validate:content`.
- If examples depend on calculators, reproduce them with `src/calculators` tests or functions.

## Report

- New or reused source IDs
- 기준일 and latestness risk
- Unsupported claims left out
- Human review points

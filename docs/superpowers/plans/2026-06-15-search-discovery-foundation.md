# Search Discovery Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configure the production domain and add verifiable technical discovery support for Google, Naver, Bing, and AI search without changing financial content or calculator formulas.

**Architecture:** Centralize public site identity and URL generation in `src/lib/site-config.ts`, expose reusable JSON-LD builders in `src/lib/structured-data.ts`, and render metadata through Next.js App Router conventions. Keep IndexNow payload generation pure and tested, with the network submission isolated in an explicitly invoked script.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Vitest, Testing Library, Netlify environment variables, Schema.org JSON-LD, IndexNow.

---

### Task 1: Production Site Configuration

**Files:**
- Modify: `src/lib/site-config.ts`
- Create: `src/lib/site-config.test.ts`
- Modify: `.env.example`
- Modify: `README.md`

- [ ] **Step 1: Write failing tests for the production fallback and absolute URL generation**

Test that the fallback is `https://shimmering-starship-236730.netlify.app`, trailing slashes are removed, and `absoluteUrl('/guides')` returns a canonical absolute URL.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- src/lib/site-config.test.ts`

Expected: FAIL because the fallback and `absoluteUrl` helper do not match the required API.

- [ ] **Step 3: Implement the minimal shared configuration**

Export `siteUrl`, `siteName`, `siteDescription`, `siteLocale`, and `absoluteUrl(pathname)` from `src/lib/site-config.ts`. Document the final domain and verification variables in `.env.example` and `README.md`.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- src/lib/site-config.test.ts`

Expected: PASS.

### Task 2: Root Metadata and Search Verification

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/layout.test.tsx`
- Modify: `src/app/robots.ts`
- Create: `src/app/search-discovery.test.ts`

- [ ] **Step 1: Write failing metadata and robots tests**

Assert that root metadata contains the production metadata base, default Open Graph image, Twitter summary-large-image card, index/follow directives, and optional Google/Naver/Bing verification values. Assert that robots includes a general allow rule and an explicit `OAI-SearchBot` allow rule with the production sitemap and host.

- [ ] **Step 2: Run focused tests and verify RED**

Run: `npm test -- src/app/layout.test.tsx src/app/search-discovery.test.ts`

Expected: FAIL because the metadata and crawler rules are not present.

- [ ] **Step 3: Implement root metadata and crawler policy**

Use Next.js `Metadata` verification fields for Google and Bing, and `verification.other` for `naver-site-verification`. Filter missing values so empty meta tags are not emitted. Add explicit `OAI-SearchBot` access while preserving general crawling.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `npm test -- src/app/layout.test.tsx src/app/search-discovery.test.ts`

Expected: PASS.

### Task 3: JSON-LD Builders and Safe Rendering

**Files:**
- Create: `src/lib/structured-data.ts`
- Create: `src/lib/structured-data.test.ts`
- Create: `src/components/json-ld.tsx`
- Create: `src/components/json-ld.test.tsx`

- [ ] **Step 1: Write failing tests for WebSite, Organization, Article, WebApplication, and BreadcrumbList data**

Assert exact canonical URLs, Korean locale, guide modification dates, publisher identity, calculator application category, and breadcrumb positions. Assert that rendered JSON escapes `<` as `\\u003c`.

- [ ] **Step 2: Run focused tests and verify RED**

Run: `npm test -- src/lib/structured-data.test.ts src/components/json-ld.test.tsx`

Expected: FAIL because the builders and component do not exist.

- [ ] **Step 3: Implement pure builders and renderer**

Create focused functions `buildSiteStructuredData`, `buildGuideStructuredData`, and `buildCalculatorStructuredData`. Return JSON-LD graph objects based only on visible page values. Render them with a reusable `JsonLd` component using safe serialization.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `npm test -- src/lib/structured-data.test.ts src/components/json-ld.test.tsx`

Expected: PASS.

### Task 4: Attach Structured Data and Page Metadata

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/guides/[slug]/page.tsx`
- Modify: `src/app/calculators/jeonse-increase/page.tsx`
- Modify: `src/app/calculators/loan-interest/page.tsx`
- Modify: `src/app/calculators/loan-increase/page.tsx`
- Create: `src/app/structured-pages.test.tsx`

- [ ] **Step 1: Write failing page integration tests**

Render root, a reviewed guide, and each calculator page. Assert that the expected JSON-LD script exists and contains the page canonical URL and correct schema type. Assert that guide metadata includes Open Graph article fields and `modifiedTime`.

- [ ] **Step 2: Run the integration test and verify RED**

Run: `npm test -- src/app/structured-pages.test.tsx`

Expected: FAIL because pages do not render JSON-LD or article metadata.

- [ ] **Step 3: Attach JSON-LD and metadata**

Render the site graph in the root layout, guide graph in each guide page, and calculator graph in each calculator page. Keep existing visible financial copy and calculator logic unchanged.

- [ ] **Step 4: Run the integration test and verify GREEN**

Run: `npm test -- src/app/structured-pages.test.tsx`

Expected: PASS.

### Task 5: Favicon and Social Sharing Image

**Files:**
- Create: `src/app/icon.svg`
- Create: `src/app/opengraph-image.tsx`
- Create: `src/app/twitter-image.tsx`
- Create: `src/app/social-image.test.ts`

- [ ] **Step 1: Write a failing test for image metadata exports**

Assert 1200x630 image dimensions, PNG content type, and accessible alt text describing the site without promotional guarantees.

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- src/app/social-image.test.ts`

Expected: FAIL because image modules do not exist.

- [ ] **Step 3: Implement image metadata routes and favicon**

Use `ImageResponse` for a simple branded Open Graph image and reuse it for Twitter. Add an SVG favicon that remains legible at small sizes.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- src/app/social-image.test.ts`

Expected: PASS.

### Task 6: IndexNow Support

**Files:**
- Create: `src/lib/indexnow.ts`
- Create: `src/lib/indexnow.test.ts`
- Create: `src/app/[indexNowKey]/route.ts`
- Create: `scripts/submit-indexnow.ts`
- Modify: `package.json`
- Modify: `.env.example`

- [ ] **Step 1: Write failing tests for key validation, payload generation, and key-file routing**

Assert that keys outside the IndexNow hexadecimal length rules are rejected, payloads contain the production host/key location/URL list, and only the configured `INDEXNOW_KEY.txt` route returns the key.

- [ ] **Step 2: Run focused tests and verify RED**

Run: `npm test -- src/lib/indexnow.test.ts`

Expected: FAIL because IndexNow helpers are missing.

- [ ] **Step 3: Implement pure IndexNow helpers, key route, and explicit submission script**

Generate the URL list from the same static routes and reviewed guides used by sitemap. Add `npm run indexnow:submit`; require `INDEXNOW_KEY`, validate before network access, and POST once to `https://api.indexnow.org/indexnow`.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `npm test -- src/lib/indexnow.test.ts`

Expected: PASS without making a network request.

### Task 7: Registration Runbook and Final Verification

**Files:**
- Create: `docs/search-engine-registration.md`
- Modify: `README.md`

- [ ] **Step 1: Document human-owned registration steps**

Include exact property URL, environment variable mapping, Netlify redeploy requirement, sitemap URL, verification checks, IndexNow invocation, and official console links. State clearly that account registration and production deployment remain human-reviewed actions.

- [ ] **Step 2: Run the full required verification suite**

Run in order:

```bash
npm test
npm run lint
npm run typecheck
npm run validate:content
npm run build
```

Expected: all commands exit 0.

- [ ] **Step 3: Review the diff against the approved design**

Confirm no files under `content/guides` or `src/calculators` changed, no analytics/storage code was added, and no deployment command was run.

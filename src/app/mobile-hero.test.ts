import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

describe("mobile homepage hero", () => {
  it("switches copy and balances the title at the mobile breakpoint", () => {
    expect(css).toMatch(/\.hero-copy-mobile[^}]*display: none/);
    expect(css).toContain(".hero-copy-desktop { display: none; }");
    expect(css).toContain(".hero-copy-mobile { display: block; }");
    expect(css).toMatch(/\.hero \.hero-mobile-title[^}]*font-size: 36px[^}]*line-height: 1\.1[^}]*letter-spacing: 0/);
    expect(css).toMatch(/\.hero-keyword[^}]*color: var\(--brand\)/);
  });

  it("keeps mobile actions usable on narrow screens", () => {
    expect(css).toMatch(/@media \(max-width: 760px\)[\s\S]*\.hero-actions[^}]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
    expect(css).toMatch(/@media \(max-width: 360px\)[\s\S]*\.hero-actions[^}]*grid-template-columns: 1fr/);
    expect(css).toMatch(/@media \(max-width: 360px\)[\s\S]*\.hero \.hero-mobile-title[^}]*font-size: 34px/);
  });

  it("keeps mobile headings readable without compressed Korean letter spacing", () => {
    expect(css).toMatch(/@media \(max-width: 640px\)[\s\S]*\.calculator-heading h1, \.section-heading h1, \.guide-article h1, \.policy-page h1[^}]*font-size: clamp\(2rem, 8vw, 2\.35rem\)[^}]*letter-spacing: 0/);
  });

  it("keeps secondary links large enough to tap on mobile", () => {
    expect(css).toMatch(/\.calculator-card \.text-link, \.home-guide-card a, \.guide-card \.text-link[^}]*min-height: 44px/);
    expect(css).toMatch(/@media \(max-width: 760px\)[\s\S]*\.nav-inner nav a[^}]*min-height: 44px/);
  });
});

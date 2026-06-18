import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

describe("mobile homepage hero", () => {
  it("switches copy and balances the title at the mobile breakpoint", () => {
    expect(css).toMatch(/@media \(max-width: 760px\)[\s\S]*\.hero h1[^}]*font-size: 36px[^}]*line-height: 1\.1[^}]*letter-spacing: 0/);
  });

  it("keeps mobile actions usable on narrow screens", () => {
    expect(css).toMatch(/@media \(max-width: 760px\)[\s\S]*\.hero-actions[^}]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
    expect(css).toMatch(/@media \(max-width: 360px\)[\s\S]*\.hero-actions[^}]*grid-template-columns: 1fr/);
    expect(css).toMatch(/@media \(max-width: 360px\)[\s\S]*\.hero h1[^}]*font-size: 34px/);
  });

  it("keeps mobile headings readable without compressed Korean letter spacing", () => {
    expect(css).toMatch(/@media \(max-width: 640px\)[\s\S]*\.calculator-heading h1, \.section-heading h1, \.guide-article h1, \.policy-page h1[^}]*font-size: clamp\(2rem, 8vw, 2\.35rem\)[^}]*letter-spacing: 0/);
  });

  it("keeps secondary links large enough to tap on mobile", () => {
    expect(css).toMatch(/\.calculator-card \.text-link, \.home-guide-card a, \.guide-card \.text-link[^}]*min-height: 44px/);
    expect(css).toMatch(/\.menu-toggle[^}]*height: 44px/);
    expect(css).toMatch(/\.mobile-drawer nav a[^}]*min-height: 58px/);
  });

  it("uses an opaque mobile drawer background so the page behind is hidden", () => {
    expect(css).toMatch(/\.mobile-drawer[^}]*height: 100dvh[^}]*background: #fff/);
    expect(css).toMatch(/\.mobile-drawer-overlay[^}]*background: #fff/);
  });

  it("uses visual click cues for tappable cards and choices", () => {
    expect(css).toMatch(/\.situation-links a[^}]*position: relative/);
    expect(css).toMatch(/\.click-cue[^}]*margin-left: auto/);
    expect(css).toMatch(/\.calculator-card, \.home-guide-card[^}]*cursor: pointer/);
    expect(css).toMatch(/\.calculator-card[^}]*min-height: 80px/);
    expect(css).toMatch(/\.calculator-card:hover, \.calculator-card:focus-visible[^}]*border-color: #1A56DB/);
    expect(css).toMatch(/\.card-click-cue[^}]*border-radius: 999px/);
  });

  it("gives tappable elements clear focus and active feedback", () => {
    expect(css).toMatch(/\.primary-link:focus-visible, \.secondary-link:focus-visible, \.situation-links a:focus-visible, \.calculator-card:focus-visible, \.home-guide-card a:focus-visible[^}]*outline: 3px solid/);
    expect(css).toMatch(/\.primary-link:active, \.secondary-link:active, \.situation-links a:active, \.calculator-card:active, \.home-guide-card:active[^}]*transform: scale\(\.98\)/);
  });

  it("styles the sticky CTA bar as a fixed bottom action", () => {
    expect(css).toMatch(/\.sticky-cta-bar[^}]*position: fixed[^}]*right: 0[^}]*bottom: 0[^}]*left: 0/);
    expect(css).toMatch(/\.sticky-cta-bar[^}]*height: calc\(64px \+ env\(safe-area-inset-bottom\)\)/);
    expect(css).toMatch(/\.sticky-cta-bar[^}]*padding: 0 20px env\(safe-area-inset-bottom\)/);
    expect(css).toMatch(/\.sticky-cta-bar[^}]*background: #1A56DB[^}]*color: #fff/);
  });
});

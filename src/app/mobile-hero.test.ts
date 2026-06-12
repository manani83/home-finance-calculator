import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

describe("mobile homepage hero", () => {
  it("switches copy and balances the title at the mobile breakpoint", () => {
    expect(css).toMatch(/\.hero-copy-mobile[^}]*display: none/);
    expect(css).toContain(".hero-copy-desktop { display: none; }");
    expect(css).toContain(".hero-copy-mobile { display: block; }");
    expect(css).toMatch(/\.hero \.hero-mobile-title[^}]*font-size: 36px[^}]*line-height: 1\.1/);
    expect(css).toMatch(/\.hero-keyword[^}]*color: var\(--brand\)/);
  });

  it("keeps mobile actions usable on narrow screens", () => {
    expect(css).toMatch(/@media \(max-width: 760px\)[\s\S]*\.hero-actions[^}]*grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
    expect(css).toMatch(/@media \(max-width: 360px\)[\s\S]*\.hero-actions[^}]*grid-template-columns: 1fr/);
    expect(css).toMatch(/@media \(max-width: 360px\)[\s\S]*\.hero \.hero-mobile-title[^}]*font-size: 34px/);
  });
});

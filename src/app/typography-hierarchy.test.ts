import fs from "node:fs";
import path from "node:path";

describe("balanced typography hierarchy", () => {
  const css = fs.readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf8");

  it("defines semantic colors for headings and reading text", () => {
    expect(css).toContain("--heading-strong: #0d2118");
    expect(css).toContain("--text-secondary: #66746c");
    expect(css).toContain("--text-body: #405047");
  });

  it("gives page titles and section headings a stronger hierarchy", () => {
    expect(css).toMatch(/\.calculator-heading h1[^}]*color: var\(--heading-strong\)[^}]*font-weight: 850/);
    expect(css).toMatch(/\.policy-page h1[^}]*color: var\(--heading-strong\)[^}]*font-weight: 850/);
    expect(css).toMatch(/\.policy-page h2[^}]*font-size: 1\.65rem[^}]*font-weight: 850/);
  });

  it("visually separates explanatory content from the calculator", () => {
    expect(css).toMatch(/\.calculator-explanation \{[^}]*border-top: 3px solid/);
    expect(css).toMatch(/\.calculator-explanation-grid section[^}]*background: #f3f8f5/);
    expect(css).toMatch(/\.calculator-explanation-grid h3[^}]*color: var\(--brand-dark\)/);
  });
});

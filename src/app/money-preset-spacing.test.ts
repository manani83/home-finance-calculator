import { readFileSync } from "node:fs";
import { join } from "node:path";

describe("money input preset spacing", () => {
  it("keeps quick amount preset buttons visually separated from the input", () => {
    const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

    expect(css).toMatch(/\.money-preset-group\s*\{[\s\S]*?margin-top:\s*6px;/);
  });
});

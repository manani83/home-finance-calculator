import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const appDirectory = join(process.cwd(), "src/app");
const layout = readFileSync(join(appDirectory, "layout.tsx"), "utf8");
const css = readFileSync(join(appDirectory, "globals.css"), "utf8");

describe("Pretendard font integration", () => {
  it("registers the local variable font with the recommended settings", () => {
    expect(layout).toContain('import localFont from "next/font/local"');
    expect(layout).toContain('src: "./fonts/PretendardVariable.woff2"');
    expect(layout).toContain('display: "swap"');
    expect(layout).toContain('weight: "45 920"');
    expect(layout).toContain('variable: "--font-pretendard"');
  });

  it("applies the font variable globally with Korean-capable fallbacks", () => {
    expect(layout).toMatch(/<body className=\{pretendard\.variable\}>/);
    expect(css).toContain("font-family: var(--font-pretendard), -apple-system, BlinkMacSystemFont, system-ui");
    expect(css).toContain('"Noto Sans KR", "Malgun Gothic", sans-serif');
  });

  it("keeps the font asset in the application source", () => {
    expect(existsSync(join(appDirectory, "fonts/PretendardVariable.woff2"))).toBe(true);
  });
});

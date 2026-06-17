import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("agent workflow rules", () => {
  const agents = readFileSync("AGENTS.md", "utf8");

  it("requires a new pull request when additional work follows a merged or closed pull request", () => {
    expect(agents).toContain("이미 머지되었거나 닫힌 PR");
    expect(agents).toContain("기존 PR을 수정하거나 닫힌 PR 브랜치에 계속 푸시하지 않는다");
    expect(agents).toContain("새 `codex/<작업명>` 브랜치와 새 PR을 만든다");
  });
});

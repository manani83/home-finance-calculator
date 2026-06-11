import { validateGuideSource } from "./validate-content";

const validGuide = `---
title: "전세보증 비교"
description: "공식 출처를 기준으로 비교합니다."
slug: "guarantee-comparison"
updatedAt: "2026-06-11"
reviewStatus: "reviewed"
sources:
  - hf-jeonse-guarantee
disclaimer: "financial-general"
---

## 한 줄 요약

조건은 기관과 상품에 따라 달라질 수 있습니다.
`;

describe("validateGuideSource", () => {
  it("accepts reviewed content with a registered official source", () => {
    expect(validateGuideSource(validGuide, "valid.mdx")).toEqual([]);
  });

  it("rejects missing metadata and unknown sources", () => {
    const invalid = validGuide
      .replace('description: "공식 출처를 기준으로 비교합니다."\n', "")
      .replace("hf-jeonse-guarantee", "unknown-source");

    expect(validateGuideSource(invalid, "invalid.mdx")).toEqual(
      expect.arrayContaining([
        expect.stringContaining("description"),
        expect.stringContaining("unknown-source"),
      ]),
    );
  });

  it("rejects prohibited certainty claims", () => {
    expect(
      validateGuideSource(`${validGuide}\n누구나 가능`, "unsafe.mdx"),
    ).toContain("unsafe.mdx: 금지 표현 '누구나 가능'을 포함합니다.");
  });
});

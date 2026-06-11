import { getGuide, getGuides } from "./content";

describe("guide content loader", () => {
  it("lists the three reviewed guides", () => {
    expect(getGuides().map((guide) => guide.slug)).toEqual([
      "hug-hf-sgi-comparison",
      "lease-renewal-right",
      "loan-extension-vs-refinance",
    ]);
  });

  it("rejects an unknown or unsafe slug", () => {
    expect(getGuide("missing")).toBeNull();
    expect(getGuide("../package.json")).toBeNull();
  });
});

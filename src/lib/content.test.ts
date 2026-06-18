import { getGuide, getGuides } from "./content";

describe("guide content loader", () => {
  it("lists the reviewed guides", () => {
    expect(getGuides().map((guide) => guide.slug)).toEqual([
      "dsr-dti-jeonse-loan",
      "guarantee-insurance-rejection",
      "hug-hf-sgi-comparison",
      "lease-renewal-right",
      "loan-extension-vs-refinance",
      "preferential-interest-rate",
    ]);
  });

  it("rejects an unknown or unsafe slug", () => {
    expect(getGuide("missing")).toBeNull();
    expect(getGuide("../package.json")).toBeNull();
  });
});

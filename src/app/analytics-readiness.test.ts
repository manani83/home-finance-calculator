import fs from "node:fs";
import path from "node:path";

describe("consent-gated analytics readiness", () => {
  it("connects the root layout to a consent-gated analytics component", () => {
    const layout = fs.readFileSync(path.join(process.cwd(), "src/app/layout.tsx"), "utf8");

    expect(layout).toContain("AnalyticsConsent");
    expect(layout).toContain("NEXT_PUBLIC_GA_MEASUREMENT_ID");
  });

  it("keeps calculator source free of analytics event payloads", () => {
    const calculatorDirectory = path.join(process.cwd(), "src/components/calculators");
    const calculatorSource = fs
      .readdirSync(calculatorDirectory)
      .filter((file) => file.endsWith(".tsx") && !file.endsWith(".test.tsx"))
      .map((file) => fs.readFileSync(path.join(calculatorDirectory, file), "utf8"))
      .join("\n");

    expect(calculatorSource).not.toMatch(/sendGAEvent|gtag\s*\(|dataLayer/);
  });
});

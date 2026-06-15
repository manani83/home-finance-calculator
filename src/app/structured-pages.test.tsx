import { render } from "@testing-library/react";
import RootLayout from "./layout";
import GuidePage, { generateMetadata } from "./guides/[slug]/page";
import JeonseIncreasePage from "./calculators/jeonse-increase/page";
import LoanInterestPage from "./calculators/loan-interest/page";
import LoanIncreasePage from "./calculators/loan-increase/page";

function jsonLdText(container: HTMLElement) {
  return Array.from(container.querySelectorAll('script[type="application/ld+json"]'))
    .map((script) => script.textContent)
    .join("\n");
}

describe("structured pages", () => {
  it("renders WebSite and Organization data in the root layout", () => {
    const { container } = render(<RootLayout><p>본문</p></RootLayout>);
    expect(jsonLdText(container)).toContain('"@type":"WebSite"');
    expect(jsonLdText(container)).toContain('"@type":"Organization"');
  });

  it("renders Article and breadcrumb data for a reviewed guide", async () => {
    const page = await GuidePage({ params: Promise.resolve({ slug: "lease-renewal-right" }) });
    const { container } = render(page);
    expect(jsonLdText(container)).toContain('"@type":"Article"');
    expect(jsonLdText(container)).toContain("/guides/lease-renewal-right");

    const metadata = await generateMetadata({ params: Promise.resolve({ slug: "lease-renewal-right" }) });
    expect(metadata.openGraph).toMatchObject({ type: "article", modifiedTime: "2026-06-11" });
  });

  it.each([
    [JeonseIncreasePage, "/calculators/jeonse-increase"],
    [LoanInterestPage, "/calculators/loan-interest"],
    [LoanIncreasePage, "/calculators/loan-increase"],
  ])("renders WebApplication data for a calculator", (Page, pathname) => {
    const { container } = render(<Page />);
    expect(jsonLdText(container)).toContain('"@type":"WebApplication"');
    expect(jsonLdText(container)).toContain(pathname);
  });
});

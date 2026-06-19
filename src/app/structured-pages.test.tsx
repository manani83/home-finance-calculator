import { render } from "@testing-library/react";
import RootLayout from "./layout";
import GuidePage, { generateMetadata } from "./guides/[slug]/page";
import JeonseIncreasePage from "./calculators/jeonse-increase/page";
import JeonseToMonthlyPage, { metadata as jeonseToMonthlyMetadata } from "./calculators/jeonse-to-monthly/page";
import LoanLimitPage, { metadata as loanLimitMetadata } from "./calculators/loan-limit/page";
import LoanInterestPage from "./calculators/loan-interest/page";
import LoanIncreasePage from "./calculators/loan-increase/page";
import { metadata as jeonseIncreaseMetadata } from "./calculators/jeonse-increase/page";
import { metadata as loanInterestMetadata } from "./calculators/loan-interest/page";
import { metadata as loanIncreaseMetadata } from "./calculators/loan-increase/page";

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
    expect(metadata.openGraph).toMatchObject({
      title: "계약갱신요구권 사용 시 주의사항",
      description: "주택임대차보호법의 계약갱신요구권과 보증금 증액을 확인할 때 필요한 체크리스트입니다.",
      images: [{ url: "/api/og?slug=lease-renewal-right", width: 1200, height: 630 }],
    });
    expect(metadata.twitter).toMatchObject({
      title: "계약갱신요구권 사용 시 주의사항",
      description: "주택임대차보호법의 계약갱신요구권과 보증금 증액을 확인할 때 필요한 체크리스트입니다.",
      images: ["/api/og?slug=lease-renewal-right"],
    });
  });

  it.each([
    [jeonseIncreaseMetadata, "전세보증금 5% 인상 계산기", "기존 전세보증금 기준 5% 상한 인상액과 인상 후 보증금을 예상 계산값으로 확인합니다.", "/api/og?slug=jeonse-increase"],
    [jeonseToMonthlyMetadata, "전월세 전환 계산기", "전세보증금의 일부 또는 전부를 월세로 전환할 때 전월세전환율 기준 예상 월세를 계산합니다.", "/api/og?slug=jeonse-to-monthly"],
    [loanLimitMetadata, "전세대출 한도 추정 계산기", "전세보증금 대비 대출 가능 한도를 LTV 기준으로 간략히 추정합니다.", "/api/og?slug=loan-limit"],
    [loanInterestMetadata, "전세대출 월 이자 계산기", "전세대출 원금과 연 금리를 입력해 월 예상 이자와 연 예상 이자를 원 단위로 계산합니다.", "/api/og?slug=loan-interest"],
    [loanIncreaseMetadata, "전세대출 증액 계산기", "전세대출 증액 전후의 월 예상 이자 차이와 추가 부담액을 비교합니다.", "/api/og?slug=loan-increase"],
  ])("defines page-specific social metadata for %s", (metadata, title, description, imageUrl) => {
    expect(metadata.description).toBe(description);
    expect(metadata.openGraph).toMatchObject({
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    });
    expect(metadata.twitter).toMatchObject({
      title,
      description,
      images: [imageUrl],
    });
  });

  it.each([
    [JeonseIncreasePage, "/calculators/jeonse-increase"],
    [JeonseToMonthlyPage, "/calculators/jeonse-to-monthly"],
    [LoanLimitPage, "/calculators/loan-limit"],
    [LoanInterestPage, "/calculators/loan-interest"],
    [LoanIncreasePage, "/calculators/loan-increase"],
  ])("renders WebApplication data for a calculator", (Page, pathname) => {
    const { container } = render(<Page />);
    expect(jsonLdText(container)).toContain('"@type":"WebApplication"');
    expect(jsonLdText(container)).toContain(pathname);
  });
});

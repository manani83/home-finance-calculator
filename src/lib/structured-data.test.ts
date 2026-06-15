import {
  buildCalculatorStructuredData,
  buildGuideStructuredData,
  buildSiteStructuredData,
} from "./structured-data";

describe("structured data", () => {
  it("builds WebSite and Organization data for the production site", () => {
    expect(buildSiteStructuredData()).toMatchObject({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Organization", name: "주거금융계산기", url: "https://shimmering-starship-236730.netlify.app" },
        { "@type": "WebSite", inLanguage: "ko-KR", url: "https://shimmering-starship-236730.netlify.app" },
      ],
    });
  });

  it("builds Article and breadcrumb data from visible guide fields", () => {
    const data = buildGuideStructuredData({
      title: "계약갱신요구권 사용 시 주의사항",
      description: "설명",
      slug: "lease-renewal-right",
      updatedAt: "2026-06-11",
    });

    expect(data[0]).toMatchObject({
      "@type": "Article",
      headline: "계약갱신요구권 사용 시 주의사항",
      dateModified: "2026-06-11",
      mainEntityOfPage: "https://shimmering-starship-236730.netlify.app/guides/lease-renewal-right",
      publisher: { "@type": "Organization", name: "주거금융계산기" },
    });
    expect(data[1]).toMatchObject({
      "@type": "BreadcrumbList",
      itemListElement: [
        { position: 1, item: "https://shimmering-starship-236730.netlify.app/" },
        { position: 2, item: "https://shimmering-starship-236730.netlify.app/guides" },
        { position: 3, item: "https://shimmering-starship-236730.netlify.app/guides/lease-renewal-right" },
      ],
    });
  });

  it("builds a free WebApplication and breadcrumb data for calculators", () => {
    const data = buildCalculatorStructuredData({
      title: "전세대출 월 이자 계산기",
      description: "월 예상 이자를 계산합니다.",
      pathname: "/calculators/loan-interest",
    });

    expect(data[0]).toMatchObject({
      "@type": "WebApplication",
      applicationCategory: "FinanceApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
      url: "https://shimmering-starship-236730.netlify.app/calculators/loan-interest",
    });
    expect(data[1]).toMatchObject({ "@type": "BreadcrumbList" });
  });
});

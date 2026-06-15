import { absoluteUrl, siteDescription, siteName, siteUrl } from "./site-config";

type GuideStructuredDataInput = {
  title: string;
  description: string;
  slug: string;
  updatedAt: string;
};

type CalculatorStructuredDataInput = {
  title: string;
  description: string;
  pathname: string;
};

function breadcrumb(items: Array<{ name: string; pathname: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.pathname),
    })),
  };
}

export function buildSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: siteName,
        url: siteUrl,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: siteName,
        description: siteDescription,
        inLanguage: "ko-KR",
        url: siteUrl,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
    ],
  };
}

export function buildGuideStructuredData(input: GuideStructuredDataInput) {
  const pathname = `/guides/${input.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: input.title,
      description: input.description,
      dateModified: input.updatedAt,
      inLanguage: "ko-KR",
      mainEntityOfPage: absoluteUrl(pathname),
      publisher: {
        "@type": "Organization",
        name: siteName,
        url: siteUrl,
      },
    },
    breadcrumb([
      { name: "홈", pathname: "/" },
      { name: "주거금융 가이드", pathname: "/guides" },
      { name: input.title, pathname },
    ]),
  ];
}

export function buildCalculatorStructuredData(input: CalculatorStructuredDataInput) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: input.title,
      description: input.description,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      inLanguage: "ko-KR",
      url: absoluteUrl(input.pathname),
      offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    },
    breadcrumb([
      { name: "홈", pathname: "/" },
      { name: "계산기", pathname: "/#calculators" },
      { name: input.title, pathname: input.pathname },
    ]),
  ];
}

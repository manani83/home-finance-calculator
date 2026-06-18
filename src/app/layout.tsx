import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AdSenseScript } from "@/components/adsense-script";
import { AnalyticsConsent } from "@/components/analytics-consent";
import { StickyCtaBar } from "@/components/sticky-cta-bar";
import { JsonLd } from "@/components/json-ld";
import { buildVerificationMetadata, siteDescription, siteLocale, siteName, siteUrl } from "@/lib/site-config";
import { buildSiteStructuredData } from "@/lib/structured-data";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    locale: siteLocale,
    siteName,
    title: siteName,
    description: siteDescription,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${siteName} 공식 출처 기반 계산기` }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/twitter-image"],
  },
  robots: { index: true, follow: true },
  verification: buildVerificationMetadata({
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    naver: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION,
    bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
  }),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const analyticsMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="ko">
      <body className={pretendard.variable}><JsonLd data={buildSiteStructuredData()} /><AdSenseScript /><SiteHeader />{children}<SiteFooter /><StickyCtaBar /><AnalyticsConsent measurementId={analyticsMeasurementId} /></body>
    </html>
  );
}

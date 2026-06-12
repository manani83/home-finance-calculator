import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AdSenseScript } from "@/components/adsense-script";
import { siteUrl } from "@/lib/site-config";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "주거금융계산기",
    template: "%s | 주거금융계산기",
  },
  description: "전세보증금과 전세대출 이자를 공식 출처와 함께 확인하는 계산기입니다.",
  openGraph: { type: "website", locale: "ko_KR", siteName: "주거금융계산기" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className={pretendard.variable}><AdSenseScript /><SiteHeader />{children}<SiteFooter /></body>
    </html>
  );
}

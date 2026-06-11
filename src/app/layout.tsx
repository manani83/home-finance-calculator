import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AdSenseScript } from "@/components/adsense-script";

export const metadata: Metadata = {
  metadataBase: new URL("https://housing-finance-calculator.vercel.app"),
  title: {
    default: "주거금융계산기",
    template: "%s | 주거금융계산기",
  },
  description: "전세보증금과 전세대출 이자를 공식 출처와 함께 확인하는 계산기입니다.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body><AdSenseScript /><SiteHeader />{children}<SiteFooter /></body>
    </html>
  );
}

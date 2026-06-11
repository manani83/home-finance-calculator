import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}

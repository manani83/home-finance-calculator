import type { Metadata } from "next";
import { LoanIncreaseCalculator } from "@/components/calculators/loan-increase-calculator";

export const metadata: Metadata = { title: "전세대출 증액 계산기", description: "전세대출 증액 전후의 월 예상 이자를 비교합니다.", alternates: { canonical: "/calculators/loan-increase" } };
export default function Page() { return <main className="page-container"><LoanIncreaseCalculator /></main>; }

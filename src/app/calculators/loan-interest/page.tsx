import type { Metadata } from "next";
import { LoanInterestCalculator } from "@/components/calculators/loan-interest-calculator";

export const metadata: Metadata = { title: "전세대출 월 이자 계산기", description: "전세대출 원금과 연 금리로 월 예상 이자를 계산합니다.", alternates: { canonical: "/calculators/loan-interest" } };
export default function Page() { return <main className="page-container"><LoanInterestCalculator /></main>; }

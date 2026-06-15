import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { LoanIncreaseCalculator } from "@/components/calculators/loan-increase-calculator";
import { buildCalculatorStructuredData } from "@/lib/structured-data";

const title = "전세대출 증액 계산기";
const description = "전세대출 증액 전후의 월 예상 이자를 비교합니다.";
const pathname = "/calculators/loan-increase";

export const metadata: Metadata = { title, description, alternates: { canonical: pathname }, openGraph: { title, description, url: pathname } };
export default function Page() { return <main className="page-container"><JsonLd data={buildCalculatorStructuredData({ title, description, pathname })} /><LoanIncreaseCalculator /></main>; }

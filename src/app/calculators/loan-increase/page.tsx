import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { LoanIncreaseCalculator } from "@/components/calculators/loan-increase-calculator";
import { buildPageMetadata } from "@/lib/social-metadata";
import { buildCalculatorStructuredData } from "@/lib/structured-data";

const title = "전세대출 증액 계산기";
const description = "전세대출 증액 전후의 월 예상 이자 차이와 추가 부담액을 비교합니다.";
const pathname = "/calculators/loan-increase";

export const metadata: Metadata = buildPageMetadata({ title, description, pathname, imageSlug: "loan-increase" });
export default function Page() { return <main className="page-container"><JsonLd data={buildCalculatorStructuredData({ title, description, pathname })} /><LoanIncreaseCalculator /></main>; }

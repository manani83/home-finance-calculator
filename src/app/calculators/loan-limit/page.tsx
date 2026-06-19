import type { Metadata } from "next";
import { LoanLimitCalculator } from "@/components/calculators/loan-limit-calculator";
import { JsonLd } from "@/components/json-ld";
import { buildPageMetadata } from "@/lib/social-metadata";
import { buildCalculatorStructuredData } from "@/lib/structured-data";

const title = "전세대출 한도 추정 계산기";
const description = "전세보증금 대비 대출 가능 한도를 LTV 기준으로 간략히 추정합니다.";
const pathname = "/calculators/loan-limit";

export const metadata: Metadata = buildPageMetadata({ title, description, pathname, imageSlug: "loan-limit" });

export default function Page() {
  return <main className="page-container"><JsonLd data={buildCalculatorStructuredData({ title, description, pathname })} /><LoanLimitCalculator /></main>;
}

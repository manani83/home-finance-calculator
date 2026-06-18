import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { LoanInterestCalculator } from "@/components/calculators/loan-interest-calculator";
import { buildPageMetadata } from "@/lib/social-metadata";
import { buildCalculatorStructuredData } from "@/lib/structured-data";

const title = "전세대출 월 이자 계산기";
const description = "전세대출 원금과 연 금리를 입력해 월 예상 이자와 연 예상 이자를 원 단위로 계산합니다.";
const pathname = "/calculators/loan-interest";

export const metadata: Metadata = buildPageMetadata({ title, description, pathname, imageSlug: "loan-interest" });
export default function Page() { return <main className="page-container"><JsonLd data={buildCalculatorStructuredData({ title, description, pathname })} /><LoanInterestCalculator /></main>; }

import type { Metadata } from "next";
import { JeonseToMonthlyCalculator } from "@/components/calculators/jeonse-to-monthly-calculator";
import { JsonLd } from "@/components/json-ld";
import { buildPageMetadata } from "@/lib/social-metadata";
import { buildCalculatorStructuredData } from "@/lib/structured-data";

const title = "전월세 전환 계산기";
const description = "전세보증금의 일부 또는 전부를 월세로 전환할 때 전월세전환율 기준 예상 월세를 계산합니다.";
const pathname = "/calculators/jeonse-to-monthly";

export const metadata: Metadata = buildPageMetadata({ title, description, pathname, imageSlug: "jeonse-to-monthly" });

export default function Page() {
  return <main className="page-container"><JsonLd data={buildCalculatorStructuredData({ title, description, pathname })} /><JeonseToMonthlyCalculator /></main>;
}

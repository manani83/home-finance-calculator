import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { JeonseIncreaseCalculator } from "@/components/calculators/jeonse-increase-calculator";
import { buildPageMetadata } from "@/lib/social-metadata";
import { buildCalculatorStructuredData } from "@/lib/structured-data";

const title = "전세보증금 5% 인상 계산기";
const description = "기존 전세보증금 기준 5% 상한 인상액과 인상 후 보증금을 예상 계산값으로 확인합니다.";
const pathname = "/calculators/jeonse-increase";

export const metadata: Metadata = buildPageMetadata({ title, description, pathname, imageSlug: "jeonse-increase" });
export default function Page() { return <main className="page-container"><JsonLd data={buildCalculatorStructuredData({ title, description, pathname })} /><JeonseIncreaseCalculator /></main>; }

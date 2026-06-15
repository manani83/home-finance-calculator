import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { JeonseIncreaseCalculator } from "@/components/calculators/jeonse-increase-calculator";
import { buildCalculatorStructuredData } from "@/lib/structured-data";

const title = "전세보증금 5% 인상 계산기";
const description = "전세보증금 인상액과 인상률을 계산합니다.";
const pathname = "/calculators/jeonse-increase";

export const metadata: Metadata = { title, description, alternates: { canonical: pathname }, openGraph: { title, description, url: pathname } };
export default function Page() { return <main className="page-container"><JsonLd data={buildCalculatorStructuredData({ title, description, pathname })} /><JeonseIncreaseCalculator /></main>; }

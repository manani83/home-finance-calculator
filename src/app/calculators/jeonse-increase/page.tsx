import type { Metadata } from "next";
import { JeonseIncreaseCalculator } from "@/components/calculators/jeonse-increase-calculator";

export const metadata: Metadata = { title: "전세보증금 5% 인상 계산기", description: "전세보증금 인상액과 인상률을 계산합니다.", alternates: { canonical: "/calculators/jeonse-increase" } };
export default function Page() { return <main className="page-container"><JeonseIncreaseCalculator /></main>; }

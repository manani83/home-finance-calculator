import type { Metadata } from "next";
import Link from "next/link";
import { getGuides } from "@/lib/content";

export const metadata: Metadata = { title: "주거금융 가이드", description: "공식 출처를 기준으로 작성한 전세와 주거금융 가이드입니다.", alternates: { canonical: "/guides" } };

const guideListTitles: Record<string, string> = {
  "dsr-dti-jeonse-loan": "DSR·DTI는 전세대출 심사에서 무엇을 보나요?",
  "guarantee-insurance-rejection": "전세보증보험이 거절될 때 먼저 볼 것은?",
  "hug-hf-sgi-comparison": "HUG·HF·SGI 중 뭐가 다른가요?",
  "lease-renewal-right": "계약갱신청구권 쓰면 보증금은 얼마나 오르나요?",
  "loan-extension-vs-refinance": "전세대출 연장과 대환, 뭐부터 확인해야 하나요?",
  "preferential-interest-rate": "우대금리는 실제 금리와 어떻게 다른가요?",
};

const categories = ["전체", "보증", "계약", "대출", "금리"] as const;
const defaultCategories: Record<string, (typeof categories)[number]> = {
  "hug-hf-sgi-comparison": "보증",
  "lease-renewal-right": "계약",
  "loan-extension-vs-refinance": "대출",
};

export default function GuidesPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const selectedCategory = categories.includes(searchParams?.category as (typeof categories)[number])
    ? searchParams?.category
    : "전체";
  const guides = getGuides().filter((guide) => {
    const category = guide.category ?? defaultCategories[guide.slug] ?? "전체";
    return selectedCategory === "전체" || category === selectedCategory;
  });

  return <main className="page-container"><div className="section-heading"><span className="eyebrow">공식 출처 기반</span><h1>주거금융 가이드</h1><p>게시일보다 최근 확인일과 공식 원문을 함께 확인하세요.</p></div><nav className="guide-tabs" aria-label="가이드 카테고리">{categories.map((category) => <Link key={category} href={category === "전체" ? "/guides" : `/guides?category=${encodeURIComponent(category)}`} aria-current={selectedCategory === category ? "page" : undefined}>{category}</Link>)}</nav><div className="card-grid">{guides.map((guide) => <article className="guide-card" key={guide.slug}><span>확인일 {guide.updatedAt}</span><h2><Link href={`/guides/${guide.slug}`}>{guideListTitles[guide.slug] ?? guide.title}</Link></h2><p>{guide.description}</p><Link className="text-link" href={`/guides/${guide.slug}`}>가이드 읽기 →</Link></article>)}</div></main>;
}

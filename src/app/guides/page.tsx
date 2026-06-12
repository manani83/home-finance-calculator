import type { Metadata } from "next";
import Link from "next/link";
import { getGuides } from "@/lib/content";

export const metadata: Metadata = { title: "주거금융 가이드", description: "공식 출처를 기준으로 작성한 전세와 주거금융 가이드입니다.", alternates: { canonical: "/guides" } };

export default function GuidesPage() {
  return <main className="page-container"><div className="section-heading"><span className="eyebrow">공식 출처 기반</span><h1>주거금융 가이드</h1><p>게시일보다 최근 확인일과 공식 원문을 함께 확인하세요.</p></div><div className="card-grid">{getGuides().map((guide) => <article className="guide-card" key={guide.slug}><span>확인일 {guide.updatedAt}</span><h2><Link href={`/guides/${guide.slug}`}>{guide.title}</Link></h2><p>{guide.description}</p><Link className="text-link" href={`/guides/${guide.slug}`}>가이드 읽기 →</Link></article>)}</div></main>;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinancialDisclaimer } from "@/components/content/financial-disclaimer";
import { GuideBody } from "@/components/content/guide-body";
import { SourceList } from "@/components/content/source-list";
import { getGuide, getGuides } from "@/lib/content";

export function generateStaticParams() { return getGuides().map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  return guide ? { title: guide.title, description: guide.description, alternates: { canonical: `/guides/${guide.slug}` } } : {};
}
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  return <main className="page-container"><article className="guide-article"><header><span className="eyebrow">최근 확인 {guide.updatedAt}</span><h1>{guide.title}</h1><p>{guide.description}</p></header><GuideBody body={guide.body} /><SourceList sourceIds={guide.sources} /><FinancialDisclaimer /></article></main>;
}

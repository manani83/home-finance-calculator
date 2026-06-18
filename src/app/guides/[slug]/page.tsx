import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinancialDisclaimer } from "@/components/content/financial-disclaimer";
import { GuideBody } from "@/components/content/guide-body";
import { SourceList } from "@/components/content/source-list";
import { JsonLd } from "@/components/json-ld";
import { getGuide, getGuides } from "@/lib/content";
import { buildPageMetadata } from "@/lib/social-metadata";
import { buildGuideStructuredData } from "@/lib/structured-data";

export function generateStaticParams() { return getGuides().map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  return guide ? buildPageMetadata({
    title: guide.title,
    description: guide.description,
    pathname: `/guides/${guide.slug}`,
    imageSlug: guide.slug,
    openGraphType: "article",
    modifiedTime: guide.updatedAt,
  }) : {};
}
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();
  return <main className="page-container"><JsonLd data={buildGuideStructuredData(guide)} /><article className="guide-article"><header><span className="eyebrow">최근 확인 {guide.updatedAt}</span><h1>{guide.title}</h1><p>{guide.description}</p></header><GuideBody body={guide.body} /><SourceList sourceIds={guide.sources} /><FinancialDisclaimer /></article></main>;
}

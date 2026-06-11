import Link from "next/link";

export function GuideCard({ title, description, href }: { title: string; description: string; href: string }) {
  return <article className="home-guide-card"><span>공식 출처 확인 · 2026-06-11</span><h3>{title}</h3><p>{description}</p><Link href={href}>가이드 읽기 →</Link></article>;
}

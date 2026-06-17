import Link from "next/link";

export function CalculatorCard({ index, title, description, href }: { index: string; title: string; description: string; href: string }) {
  return <article className="calculator-card" data-clickable="true"><span>{index}</span><h3><Link href={href}>{title}</Link></h3><p>{description}</p><Link className="text-link" href={href}>계산하기 →</Link><span className="card-click-cue" aria-hidden="true">›</span></article>;
}

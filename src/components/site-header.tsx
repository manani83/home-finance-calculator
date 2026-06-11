import Link from "next/link";

export function SiteHeader() {
  return <header className="site-header"><div className="nav-inner"><Link className="brand" href="/">주거금융계산기</Link><nav aria-label="주요 메뉴"><Link href="/#calculators">계산기</Link><Link href="/guides">금융 가이드</Link><Link href="/about">사이트 소개</Link></nav></div></header>;
}

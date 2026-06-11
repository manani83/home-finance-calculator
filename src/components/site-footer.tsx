import Link from "next/link";

export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-inner"><div><strong>주거금융계산기</strong><p>공식 출처와 계산 근거를 함께 제공하는 정보 서비스입니다.</p></div><div className="footer-links"><Link href="/about">소개</Link><Link href="/contact">문의</Link><Link href="/privacy">개인정보처리방침</Link><Link href="/terms">이용약관</Link></div><p className="footer-disclaimer">금융상품을 중개하거나 가입을 권유하지 않습니다. 실제 조건은 금융기관과 보증기관의 공식 안내를 확인하세요.</p></div></footer>;
}

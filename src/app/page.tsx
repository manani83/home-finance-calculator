import Link from "next/link";
import { CalculatorCard } from "@/components/calculator-card";
import { GuideCard } from "@/components/guide-card";

const calculators = [
  { index: "01", title: "전세보증금 5% 인상", description: "기존·신규 보증금의 차이와 인상률을 확인합니다.", href: "/calculators/jeonse-increase" },
  { index: "02", title: "전세대출 월 이자", description: "원금과 연 금리로 월·연 예상 이자를 계산합니다.", href: "/calculators/loan-interest" },
  { index: "03", title: "전세대출 증액", description: "기존 대출과 증액분의 금리를 나눠 이자 변화를 봅니다.", href: "/calculators/loan-increase" },
];
const guides = [
  { title: "HUG·HF·SGI 전세보증 차이", description: "기관보다 보증 대상과 보장받는 사람을 먼저 구분합니다.", href: "/guides/hug-hf-sgi-comparison" },
  { title: "계약갱신요구권 사용 시 주의사항", description: "행사 기록, 법정 사유와 보증금 변경 절차를 확인합니다.", href: "/guides/lease-renewal-right" },
  { title: "전세대출 연장과 대환대출 차이", description: "금리 외에 보증 심사, 비용과 실행 시점을 비교합니다.", href: "/guides/loan-extension-vs-refinance" },
];

export default function HomePage() {
  return <main>
    <section className="hero"><div className="hero-inner"><div><span className="eyebrow">공식 출처 기반 주거금융 도구</span><h1>전세보증금과<br />대출 이자를 바로 계산하세요</h1><p>복잡한 주거금융 정보를 계산 근거, 확인일, 공식 원문과 함께 제공합니다.</p><div className="hero-actions"><Link className="primary-link" href="#calculators">계산기 선택</Link><Link className="secondary-link" href="/guides">금융 가이드 보기</Link></div></div><div className="trust-card"><span>개인정보 보호 원칙</span><strong>입력값은 저장하거나 전송하지 않습니다.</strong><p>모든 계산은 현재 브라우저 안에서만 처리됩니다.</p><div><span>공식 출처</span><b>HF · HUG · SGI · 법제처</b></div><div><span>최근 확인</span><b>2026-06-11</b></div></div></div></section>
    <section className="home-section" id="calculators"><div className="home-section-heading"><span className="eyebrow">빠른 계산</span><h2>지금 필요한 계산기를 선택하세요</h2></div><div className="calculator-grid">{calculators.map((item) => <CalculatorCard key={item.href} {...item} />)}</div></section>
    <section className="home-section guide-band"><div className="home-section-heading"><span className="eyebrow">금융 가이드</span><h2>계산 전후에 확인할 공식 정보</h2><Link className="text-link" href="/guides">전체 가이드 →</Link></div><div className="card-grid">{guides.map((item) => <GuideCard key={item.href} {...item} />)}</div></section>
    <section className="principles"><div><span className="eyebrow">운영 원칙</span><h2>빠른 답보다 확인 가능한 답</h2></div><ul><li><strong>공식 출처 우선</strong><span>정부·공공기관·금융기관 원문을 연결합니다.</span></li><li><strong>예상값 명시</strong><span>계산 결과와 실제 심사 결과를 구분합니다.</span></li><li><strong>사람의 검토</strong><span>금융 콘텐츠는 자동 배포하지 않습니다.</span></li></ul></section>
  </main>;
}

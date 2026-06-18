import type { Metadata } from "next";
import Link from "next/link";
import { CalculatorCard } from "@/components/calculator-card";
import type { CalculatorCardIcon } from "@/components/calculator-card";
import { GuideCard } from "@/components/guide-card";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const calculators: Array<{
  index: string;
  title: string;
  description: string;
  href: string;
  icon: CalculatorCardIcon;
  iconLabel: string;
}> = [
  { index: "01", title: "보증금 5% 넘는지 확인", description: "집주인이 보증금을 올려달라고 했을 때 법정 상한과 실제 인상률을 먼저 확인하세요.", href: "/calculators/jeonse-increase", icon: "home", iconLabel: "보증금 계산기" },
  { index: "02", title: "전월세 전환 월세 계산", description: "전세보증금 일부를 월세로 바꿀 때 전월세전환율 기준 예상 월세를 확인하세요.", href: "/calculators/jeonse-to-monthly", icon: "compare", iconLabel: "전월세 전환 계산기" },
  { index: "03", title: "전세대출 월 이자 계산", description: "대출 원금과 금리를 넣고 매달 낼 예상 이자를 바로 확인하세요.", href: "/calculators/loan-interest", icon: "calculator", iconLabel: "이자 계산기" },
  { index: "04", title: "대출 늘리면 이자 얼마나 늘까", description: "기존 대출과 증액분 금리가 다를 때 월 이자 변화부터 비교하세요.", href: "/calculators/loan-increase", icon: "compare", iconLabel: "한도 비교 계산기" },
];
const guides = [
  { title: "HUG·HF·SGI 중 뭐가 다른가요?", description: "기관보다 보증 대상과 보장받는 사람을 먼저 구분합니다.", href: "/guides/hug-hf-sgi-comparison" },
  { title: "계약갱신청구권 쓰면 보증금은 얼마나 오르나요?", description: "행사 기록, 법정 사유와 보증금 변경 절차를 확인합니다.", href: "/guides/lease-renewal-right" },
  { title: "전세대출 연장과 대환, 뭐부터 확인해야 하나요?", description: "금리 외에 보증 심사, 비용과 실행 시점을 비교합니다.", href: "/guides/loan-extension-vs-refinance" },
];
const situations = [
  { index: "01", label: "보증금 5% 넘는지 확인", href: "/calculators/jeonse-increase" },
  { index: "02", label: "전세를 월세로 바꾸면 얼마인지 계산", href: "/calculators/jeonse-to-monthly" },
  { index: "03", label: "월 이자가 얼마인지 계산", href: "/calculators/loan-interest" },
];

export default function HomePage() {
  return <main>
    <section className="hero"><div className="hero-inner"><div><span className="eyebrow">공식 출처 기반 주거금융 도구</span><h1>전세보증금과 대출 이자를 바로 계산하세요</h1><p>집주인 요구 보증금이 합법인지, 이자 부담이 얼마인지 — 30초 안에 확인하세요</p><div className="situation-links" aria-label="자주 찾는 상황">{situations.map((item) => <Link key={item.href} href={item.href}><span className="situation-index">{item.index}</span><span>{item.label}</span><span className="click-cue" aria-hidden="true">›</span></Link>)}</div><div className="hero-actions"><Link className="primary-link" href="#calculators">계산기 선택</Link><Link className="secondary-link" href="/guides">금융 가이드 보기</Link></div></div><div className="trust-card"><span>브라우저에서만 계산</span><strong>입력값은 저장하거나 전송하지 않습니다.</strong><p>입력한 금액과 금리는 외부로 전송되지 않습니다. 모든 계산은 현재 브라우저 안에서만 처리됩니다.</p><div><span>공식 출처</span><b>HF · HUG · SGI · 법제처</b></div><div><span>최근 확인</span><b>2026-06-11</b></div></div></div></section>
    <section className="home-section" id="calculators"><div className="home-section-heading"><span className="eyebrow">빠른 계산</span><h2>지금 필요한 계산기를 선택하세요</h2></div><div className="calculator-grid">{calculators.map((item) => <CalculatorCard key={item.href} {...item} />)}</div></section>
    <section className="home-section guide-band"><div className="home-section-heading"><span className="eyebrow">금융 가이드</span><h2>계산 전후에 확인할 공식 정보</h2><Link className="text-link" href="/guides">전체 가이드 →</Link></div><div className="card-grid">{guides.map((item) => <GuideCard key={item.href} {...item} />)}</div></section>
    <section className="principles"><div><span className="eyebrow">운영 원칙</span><h2>빠른 답보다 확인 가능한 답</h2></div><ul><li><strong>공식 출처 우선</strong><span>정부·공공기관·금융기관 원문을 연결합니다.</span></li><li><strong>예상값 명시</strong><span>계산 결과와 실제 심사 결과를 구분합니다.</span></li><li><strong>사람의 검토</strong><span>금융 콘텐츠는 자동 배포하지 않습니다.</span></li></ul></section>
  </main>;
}

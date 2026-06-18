import type { ReactNode } from "react";
import Link from "next/link";

export function CalculatorShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="calculator-shell" aria-labelledby="calculator-title">
      <div className="calculator-heading">
        <span className="eyebrow">브라우저에서만 계산</span>
        <h1 id="calculator-title">{title}</h1>
        <p>{description}</p>
      </div>
      {children}
      <p className="privacy-note">입력값은 저장하거나 서버로 전송하지 않습니다.</p>
    </section>
  );
}

export function EstimateNotice() {
  return (
    <p className="estimate-notice">
      예상 계산값입니다. 실제 금리, 한도, 보증 및 승인 여부는 금융기관과 보증기관의 심사 기준에 따라 달라질 수 있습니다.
    </p>
  );
}

export function CalculatorNextSteps() {
  return (
    <section className="next-steps" aria-labelledby="calculator-next-steps">
      <h2 id="calculator-next-steps">다음 단계</h2>
      <div>
        <a className="primary-link" href="https://fine.fss.or.kr/" target="_blank" rel="noreferrer">실제 금리 확인 →</a>
        <Link className="secondary-link" href="/#calculators">다른 계산기 보기 →</Link>
      </div>
    </section>
  );
}

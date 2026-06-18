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

export function CalculatorNextSteps({
  primary = { label: "실제 금리 확인 →", href: "https://fine.fss.or.kr/", external: true },
  secondary = { label: "다른 계산기 보기 →", href: "/#calculators" },
}: {
  primary?: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section className="next-steps" aria-labelledby="calculator-next-steps">
      <h2 id="calculator-next-steps">다음 단계</h2>
      <div>
        <CalculatorActionLink action={primary} className="primary-link" />
        {secondary ? <CalculatorActionLink action={secondary} className="secondary-link" /> : null}
      </div>
    </section>
  );
}

function CalculatorActionLink({
  action,
  className,
}: {
  action: { label: string; href: string; external?: boolean };
  className: string;
}) {
  if (action.external) {
    return (
      <a className={className} href={action.href} target="_blank" rel="noreferrer">
        {action.label}
      </a>
    );
  }

  return <Link className={className} href={action.href}>{action.label}</Link>;
}

"use client";

import { useMemo, useState } from "react";
import { calculateLoanInterest } from "@/calculators/loan-interest";
import { CalculatorExplanation } from "./calculator-explanation";
import { CalculatorNextSteps, CalculatorShell, EstimateNotice } from "./calculator-shell";
import { MoneyInput, RateInput } from "./money-input";

function formatApproxManwon(label: "월" | "연", value: number): string {
  const manwon = Math.round(value / 10_000);
  return `${label} 약 ${manwon.toLocaleString("ko-KR")}만원`;
}

export function LoanInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const calculation = useMemo(() => {
    if (principal === "" || rate === "") return null;
    try {
      return { result: calculateLoanInterest(Number(principal), Number(rate)), error: "" };
    } catch (caught) {
      return { result: null, error: caught instanceof Error ? caught.message : "입력값을 확인해 주세요." };
    }
  }, [principal, rate]);
  const result = calculation?.result ?? null;
  const error = calculation?.error ?? "";

  const updatePrincipal = (value: string) => {
    setPrincipal(value);
  };
  const updateRate = (value: string) => {
    setRate(value);
  };

  return (
    <CalculatorShell
      title="전세대출 월 이자 계산기"
      description="대출 원금과 연 금리로 이자만 납부할 때의 월·연 예상 이자를 계산합니다."
    >
      <form className="calculator-form" onSubmit={(event) => event.preventDefault()}>
        <MoneyInput id="principal" label="대출 원금" value={principal} onChange={updatePrincipal} />
        <div className="preset-group" aria-label="대출 원금 빠른 입력">
          {[
            ["1억", "100000000"],
            ["2억", "200000000"],
            ["3억", "300000000"],
            ["4억", "400000000"],
          ].map(([label, value]) => (
            <button key={value} type="button" onClick={() => updatePrincipal(value)}>{label}</button>
          ))}
        </div>
        <RateInput id="rate" label="연 금리" value={rate} onChange={updateRate} />
        <div className="preset-group" aria-label="연 금리 빠른 입력">
          {["3.5", "4.0", "4.5"].map((value) => (
            <button key={value} type="button" onClick={() => updateRate(value)}>{value}%</button>
          ))}
        </div>
        {error ? <p role="alert" className="field-error">{error}</p> : null}
      </form>
      {result ? (
        <>
          <div className="result-panel result-card-grid" aria-live="polite">
            <div className="result-number-card"><span>월 예상 이자</span><strong>{formatApproxManwon("월", result.monthlyInterest)}</strong></div>
            <div className="result-number-card"><span>연 예상 이자</span><strong>{formatApproxManwon("연", result.annualInterest)}</strong></div>
            <EstimateNotice />
          </div>
          <CalculatorNextSteps
            primary={{ label: "이 조건으로 실제 금리 확인하기", href: "https://fine.fss.or.kr/", external: true }}
            secondary={{ label: "보증 유형별 한도 비교하기", href: "/calculators/loan-increase" }}
          />
        </>
      ) : null}
      <CalculatorExplanation
        formula="월 이자 = 대출 원금 x 연 금리 / 100 / 12 / 연 이자 = 대출 원금 x 연 금리 / 100"
        example="1억원을 연 4.2%로 계산하면 연 예상 이자는 420만원이고 월 예상 이자는 35만원입니다."
        rounding="연 이자와 월 이자는 각각 가장 가까운 원 단위로 반올림합니다. 금융기관의 일수 계산이나 납입일 기준 계산과는 차이가 날 수 있습니다."
        exclusions={[
          "원금 상환액과 원리금균등·원금균등 상환 일정",
          "보증료와 인지세 등 부대 비용",
          "중도상환수수료와 연체이자",
          "우대금리 조건, 변동금리 변경과 실제 대출 실행일",
        ]}
        cautions={[
          "이 계산은 매월 이자만 납부한다고 가정한 예상치입니다.",
          "금융기관은 365일 또는 윤년 일수와 실제 사용 일수로 이자를 계산할 수 있습니다.",
          "신청 전 금융기관의 실제 적용 금리, 상환 방식, 보증료와 부대 비용을 함께 확인하세요.",
        ]}
        sourceIds={["hf-jeonse-guarantee", "fss-loan-consumer-guide"]}
      />
    </CalculatorShell>
  );
}

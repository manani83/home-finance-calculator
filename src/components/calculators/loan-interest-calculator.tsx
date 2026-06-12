"use client";

import { useState } from "react";
import { calculateLoanInterest, type LoanInterestResult } from "@/calculators/loan-interest";
import { formatWon } from "@/lib/format";
import { CalculatorExplanation } from "./calculator-explanation";
import { CalculatorShell, EstimateNotice } from "./calculator-shell";
import { MoneyInput, RateInput } from "./money-input";

export function LoanInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState<LoanInterestResult | null>(null);
  const [error, setError] = useState("");

  return (
    <CalculatorShell
      title="전세대출 월 이자 계산기"
      description="대출 원금과 연 금리로 이자만 납부할 때의 월·연 예상 이자를 계산합니다."
    >
      <form
        className="calculator-form"
        onSubmit={(event) => {
          event.preventDefault();
          try {
            const nextResult = calculateLoanInterest(Number(principal), Number(rate));
            setResult(nextResult);
            setError("");
          } catch (caught) {
            setResult(null);
            setError(caught instanceof Error ? caught.message : "입력값을 확인해 주세요.");
          }
        }}
      >
        <MoneyInput id="principal" label="대출 원금" value={principal} onChange={setPrincipal} />
        <RateInput id="rate" label="연 금리" value={rate} onChange={setRate} />
        {error ? <p role="alert" className="field-error">{error}</p> : null}
        <button className="primary-button" type="submit">이자 계산하기</button>
      </form>
      {result ? (
        <div className="result-panel" aria-live="polite">
          <div><span>월 예상 이자</span><strong>{formatWon(result.monthlyInterest)}</strong></div>
          <div><span>연 예상 이자</span><strong>{formatWon(result.annualInterest)}</strong></div>
          <EstimateNotice />
        </div>
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

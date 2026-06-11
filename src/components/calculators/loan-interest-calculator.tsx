"use client";

import { useState } from "react";
import { calculateLoanInterest, type LoanInterestResult } from "@/calculators/loan-interest";
import { formatWon } from "@/lib/format";
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
    </CalculatorShell>
  );
}

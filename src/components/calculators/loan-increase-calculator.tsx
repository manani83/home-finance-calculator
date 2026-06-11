"use client";

import { useState } from "react";
import { calculateLoanIncrease, type LoanIncreaseResult } from "@/calculators/loan-increase";
import { formatWon } from "@/lib/format";
import { CalculatorShell, EstimateNotice } from "./calculator-shell";
import { MoneyInput, RateInput } from "./money-input";

export function LoanIncreaseCalculator() {
  const [existingPrincipal, setExistingPrincipal] = useState("");
  const [existingRate, setExistingRate] = useState("");
  const [additionalPrincipal, setAdditionalPrincipal] = useState("");
  const [additionalRate, setAdditionalRate] = useState("");
  const [result, setResult] = useState<LoanIncreaseResult | null>(null);
  const [error, setError] = useState("");
  return (
    <CalculatorShell title="전세대출 증액 계산기" description="기존 대출과 증액분에 서로 다른 금리를 적용해 월 이자 변화를 계산합니다.">
      <form className="calculator-form two-column" onSubmit={(event) => {
        event.preventDefault();
        try {
          setResult(calculateLoanIncrease(Number(existingPrincipal), Number(existingRate), Number(additionalPrincipal), Number(additionalRate)));
          setError("");
        } catch (caught) {
          setResult(null);
          setError(caught instanceof Error ? caught.message : "입력값을 확인해 주세요.");
        }
      }}>
        <MoneyInput id="existing-principal" label="기존 대출금" value={existingPrincipal} onChange={setExistingPrincipal} />
        <RateInput id="existing-rate" label="기존 연 금리" value={existingRate} onChange={setExistingRate} />
        <MoneyInput id="additional-principal" label="증액 금액" value={additionalPrincipal} onChange={setAdditionalPrincipal} />
        <RateInput id="additional-rate" label="증액분 연 금리" value={additionalRate} onChange={setAdditionalRate} />
        {error ? <p role="alert" className="field-error full-width">{error}</p> : null}
        <button className="primary-button full-width" type="submit">증액 이자 계산하기</button>
      </form>
      {result ? <div className="result-panel" aria-live="polite">
        <div><span>기존 월 이자</span><strong>{formatWon(result.existingMonthlyInterest)}</strong></div>
        <div><span>증액분 월 이자</span><strong>{formatWon(result.additionalMonthlyInterest)}</strong></div>
        <div><span>증액 후 월 이자</span><strong>{formatWon(result.totalMonthlyInterest)}</strong></div>
        <div><span>월 이자 증가액</span><strong>{formatWon(result.monthlyIncrease)}</strong></div>
        <p className="estimate-notice">금융기관에 따라 전체 잔액에 신규 금리를 적용할 수 있으므로 실제 적용 방식을 확인하세요.</p>
        <EstimateNotice />
      </div> : null}
    </CalculatorShell>
  );
}

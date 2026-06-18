"use client";

import { useMemo, useState } from "react";
import { calculateLoanIncrease } from "@/calculators/loan-increase";
import { formatWon } from "@/lib/format";
import { CalculatorExplanation } from "./calculator-explanation";
import { CalculatorNextSteps, CalculatorShell, EstimateNotice } from "./calculator-shell";
import { MoneyInput, RateInput } from "./money-input";

export function LoanIncreaseCalculator() {
  const [existingPrincipal, setExistingPrincipal] = useState("");
  const [existingRate, setExistingRate] = useState("");
  const [additionalPrincipal, setAdditionalPrincipal] = useState("");
  const [additionalRate, setAdditionalRate] = useState("");
  const calculation = useMemo(() => {
    if (existingPrincipal === "" || existingRate === "" || additionalPrincipal === "" || additionalRate === "") return null;
    try {
      return { result: calculateLoanIncrease(Number(existingPrincipal), Number(existingRate), Number(additionalPrincipal), Number(additionalRate)), error: "" };
    } catch (caught) {
      return { result: null, error: caught instanceof Error ? caught.message : "입력값을 확인해 주세요." };
    }
  }, [additionalPrincipal, additionalRate, existingPrincipal, existingRate]);
  const result = calculation?.result ?? null;
  const error = calculation?.error ?? "";

  return (
    <CalculatorShell title="전세대출 증액 계산기" description="기존 대출과 증액분에 서로 다른 금리를 적용해 월 이자 변화를 계산합니다.">
      <form className="calculator-form two-column" onSubmit={(event) => event.preventDefault()}>
        <MoneyInput id="existing-principal" label="기존 대출금" value={existingPrincipal} onChange={setExistingPrincipal} />
        <RateInput id="existing-rate" label="기존 연 금리" value={existingRate} onChange={setExistingRate} />
        <MoneyInput id="additional-principal" label="증액 금액" value={additionalPrincipal} onChange={setAdditionalPrincipal} />
        <RateInput id="additional-rate" label="증액분 연 금리" value={additionalRate} onChange={setAdditionalRate} />
        {error ? <p role="alert" className="field-error full-width">{error}</p> : null}
      </form>
      {result ? (
        <>
          <div className="result-panel" aria-live="polite">
            <div><span>기존 월 이자</span><strong>{formatWon(result.existingMonthlyInterest)}</strong></div>
            <div><span>증액분 월 이자</span><strong>{formatWon(result.additionalMonthlyInterest)}</strong></div>
            <div><span>증액 후 월 이자</span><strong>{formatWon(result.totalMonthlyInterest)}</strong></div>
            <div><span>월 이자 증가액</span><strong>{formatWon(result.monthlyIncrease)}</strong></div>
            <p className="estimate-notice">금융기관에 따라 전체 잔액에 신규 금리를 적용할 수 있으므로 실제 적용 방식을 확인하세요.</p>
            <EstimateNotice />
          </div>
          <CalculatorNextSteps
            primary={{ label: "전세대출 연장 vs 대환 가이드 읽기", href: "/guides/loan-extension-vs-refinance" }}
            secondary={null}
          />
        </>
      ) : null}
      <CalculatorExplanation
        formula="증액 후 월 이자 = 기존 대출 월 이자 + 증액분 월 이자 / 각 월 이자 = 해당 원금 x 해당 연 금리 / 100 / 12"
        example="기존 1억원과 증액 2,000만원을 각각 연 4.0%, 연 4.5%로 계산하면 기존 월 이자는 약 333,333원, 증액분은 75,000원, 합계는 약 408,333원입니다."
        rounding="기존 대출과 증액분의 월 이자를 각각 원 단위로 반올림한 뒤 합산합니다. 실제 금융기관의 일수 계산 방식에 따라 차이가 날 수 있습니다."
        exclusions={[
          "증액 심사에 따른 보증료와 부대 비용",
          "기존 대출의 중도상환수수료 또는 조건 변경 비용",
          "원금 상환액과 상환 방식 변경",
          "소득, 신용도, 주택 조건과 보증기관의 증액 심사 결과",
        ]}
        cautions={[
          "이 계산기는 기존 대출과 증액분에 서로 다른 금리가 유지된다고 가정합니다.",
          "금융기관에 따라 증액 시 전체 잔액에 신규 금리를 적용할 수 있으므로 실제 약정 방식을 확인하세요.",
          "증액 실행 전 보증 재심사, 필요 서류, 실행 일정과 반환보증 변경 여부를 확인하세요.",
        ]}
        sourceIds={["hf-jeonse-guarantee", "fss-loan-consumer-guide"]}
      />
    </CalculatorShell>
  );
}

"use client";

import { useMemo, useState } from "react";
import { calculateJeonseToMonthly } from "@/calculators/jeonse-to-monthly";
import { formatWon } from "@/lib/format";
import { CalculatorExplanation } from "./calculator-explanation";
import { CalculatorNextSteps, CalculatorShell, EstimateNotice } from "./calculator-shell";
import { MoneyInput, RateInput } from "./money-input";

export function JeonseToMonthlyCalculator() {
  const [originalDeposit, setOriginalDeposit] = useState("");
  const [afterDeposit, setAfterDeposit] = useState("");
  const [conversionRate, setConversionRate] = useState("6");
  const calculation = useMemo(() => {
    if (originalDeposit === "" || afterDeposit === "" || conversionRate === "") return null;
    try {
      return { result: calculateJeonseToMonthly(Number(originalDeposit), Number(afterDeposit), Number(conversionRate)), error: "" };
    } catch (caught) {
      return { result: null, error: caught instanceof Error ? caught.message : "입력값을 확인해 주세요." };
    }
  }, [afterDeposit, conversionRate, originalDeposit]);
  const result = calculation?.result ?? null;
  const error = calculation?.error ?? "";

  return (
    <CalculatorShell
      title="전월세 전환 계산기"
      description="전세보증금의 일부 또는 전부를 월세로 전환할 때 주택임대차보호법상 전월세전환율 기준 예상 월세를 계산합니다."
    >
      <form className="calculator-form" onSubmit={(event) => event.preventDefault()}>
        <MoneyInput id="original-deposit" label="전환 전 전세보증금" value={originalDeposit} onChange={setOriginalDeposit} />
        <MoneyInput id="after-deposit" label="전환 후 보증금" value={afterDeposit} onChange={setAfterDeposit} />
        <RateInput id="conversion-rate" label="전월세전환율" value={conversionRate} onChange={setConversionRate} />
        {error ? <p role="alert" className="field-error">{error}</p> : null}
      </form>
      {result ? (
        <>
          <div className="result-panel" aria-live="polite">
            <div><span>예상 월세 금액</span><strong>{formatWon(result.monthlyRent)}</strong></div>
            <div><span>연간 환산 금액</span><strong>{formatWon(result.annualRent)}</strong></div>
            <div><span>적용된 전월세전환율</span><strong>{result.conversionRate.toFixed(2)}%</strong></div>
            <p className="estimate-notice">전월세전환율은 사용자가 입력한 값을 적용한 예상 계산값입니다. 실제 계약에는 법령, 기준금리와 개별 약정 확인이 필요합니다.</p>
            <EstimateNotice />
          </div>
          <CalculatorNextSteps
            primary={{ label: "계약갱신청구권 가이드 읽기", href: "/guides/lease-renewal-right" }}
            secondary={{ label: "전세대출 월 이자 계산하기", href: "/calculators/loan-interest" }}
          />
        </>
      ) : null}
      <CalculatorExplanation
        formula="월세 = (전환 전 보증금 - 전환 후 보증금) x 전월세전환율 / 100 / 12"
        example="전환 전 전세보증금 3억원 중 1억 5,000만원을 월세로 전환하고 전월세전환율 6%를 적용하면 예상 월세는 75만원입니다."
        rounding="연간 환산 금액과 월세는 각각 가장 가까운 원 단위로 반올림합니다."
        exclusions={[
          "당사자 간 개별 약정에 의한 전환율 적용 가능 여부",
          "전환 시점과 계약 갱신 여부",
          "한국은행 기준금리 변동에 따른 법정 상한 변화",
          "관리비, 보증보험료, 중개보수와 세금 등 부대 비용",
        ]}
        cautions={[
          "계산 결과는 입력한 전월세전환율을 적용한 예상 계산값입니다.",
          "주택임대차보호법 제7조의2와 시행령, 한국은행 기준금리를 함께 확인해야 합니다.",
          "실제 계약 조건은 계약서와 당사자 합의, 갱신 여부에 따라 달라질 수 있습니다.",
        ]}
        sourceIds={["law-housing-lease-protection-article-7-2"]}
      />
    </CalculatorShell>
  );
}

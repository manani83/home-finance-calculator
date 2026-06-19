"use client";

import { useMemo, useState } from "react";
import { calculateLoanLimit } from "@/calculators/loan-limit";
import { formatWon } from "@/lib/format";
import { CalculatorExplanation } from "./calculator-explanation";
import { CalculatorNextSteps, CalculatorShell, EstimateNotice } from "./calculator-shell";
import { MoneyInput, RateInput } from "./money-input";

const requiredNotice = "이 계산 결과는 LTV만 적용한 단순 추정값입니다. 실제 대출 한도는 소득, 신용도, 보증기관 심사 기준, 금융기관 내부 정책에 따라 달라집니다.";

export function LoanLimitCalculator() {
  const [jeonseDeposit, setJeonseDeposit] = useState("");
  const [ltvRate, setLtvRate] = useState("80");
  const calculation = useMemo(() => {
    if (jeonseDeposit === "" || ltvRate === "") return null;
    try {
      return { result: calculateLoanLimit(Number(jeonseDeposit), Number(ltvRate)), error: "" };
    } catch (caught) {
      return { result: null, error: caught instanceof Error ? caught.message : "입력값을 확인해 주세요." };
    }
  }, [jeonseDeposit, ltvRate]);
  const result = calculation?.result ?? null;
  const error = calculation?.error ?? "";

  return (
    <CalculatorShell
      title="전세대출 한도 추정 계산기"
      description="전세보증금 대비 대출 가능 한도를 LTV 기준으로 간략히 추정합니다."
    >
      <form className="calculator-form" onSubmit={(event) => event.preventDefault()}>
        <MoneyInput id="jeonse-deposit" label="전세보증금" value={jeonseDeposit} onChange={setJeonseDeposit} />
        <RateInput id="ltv-rate" label="LTV 비율" value={ltvRate} onChange={setLtvRate} />
        {error ? <p role="alert" className="field-error">{error}</p> : null}
      </form>
      {result ? (
        <>
          <div className="result-panel" aria-live="polite">
            <div><span>추정 최대 대출 가능 금액</span><strong>{formatWon(result.estimatedLimit)}</strong></div>
            <div><span>자기 자금 필요 금액</span><strong>{formatWon(result.requiredOwnFunds)}</strong></div>
            <p className="estimate-notice">{requiredNotice}</p>
            <EstimateNotice />
          </div>
          <CalculatorNextSteps
            primary={{ label: "전세대출 월 이자 계산하기", href: "/calculators/loan-interest" }}
            secondary={{ label: "대출 늘리면 이자 얼마나 늘까 계산하기", href: "/calculators/loan-increase" }}
          />
        </>
      ) : null}
      <CalculatorExplanation
        formula="추정 대출 한도 = 전세보증금 x LTV 비율 / 100 / 자기 자금 필요 금액 = 전세보증금 - 추정 한도"
        example="전세보증금 3억원에 LTV 80%를 적용하면 추정 대출 한도는 2억 4,000만원, 자기 자금 필요 금액은 6,000만원입니다."
        rounding="추정 대출 한도와 자기 자금 필요 금액은 각각 원 단위로 반올림합니다."
        exclusions={[
          "소득, 신용도, 기존 대출과 DSR·DTI 등 상환 능력 심사",
          "보증기관 심사 기준과 보증 가능 금액",
          "금융기관 내부 정책, 주택 조건과 임대차계약 조건",
          "보증료, 인지세, 중개보수 등 부대 비용",
        ]}
        cautions={[
          requiredNotice,
          "HF 전세자금보증 등 보증기관과 금융기관의 실제 상품 기준을 신청 전 확인하세요.",
          "이 계산기는 특정 금융상품 가입을 권유하거나 승인 가능성을 보장하지 않습니다.",
        ]}
        sourceIds={["hf-jeonse-guarantee"]}
      />
    </CalculatorShell>
  );
}

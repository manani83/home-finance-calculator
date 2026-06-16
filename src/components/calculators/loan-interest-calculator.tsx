"use client";

import { useMemo, useState } from "react";
import { calculateLoanInterest } from "@/calculators/loan-interest";
import { formatWon } from "@/lib/format";
import { CalculatorExplanation } from "./calculator-explanation";
import { CalculatorShell, EstimateNotice } from "./calculator-shell";
import { MoneyInput, RateInput } from "./money-input";

export function LoanInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [error, setError] = useState("");
  const result = useMemo(() => {
    if (principal === "" || rate === "") return null;
    try {
      return calculateLoanInterest(Number(principal), Number(rate));
    } catch {
      return null;
    }
  }, [principal, rate]);

  const updatePrincipal = (value: string) => {
    setPrincipal(value);
    setError("");
  };
  const updateRate = (value: string) => {
    setRate(value);
    setError("");
  };

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
            calculateLoanInterest(Number(principal), Number(rate));
            setError("");
          } catch (caught) {
            setError(caught instanceof Error ? caught.message : "입력값을 확인해 주세요.");
          }
        }}
      >
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
        <button className="primary-button" type="submit">이자 계산하기</button>
      </form>
      {result ? (
        <>
          <div className="result-panel" aria-live="polite">
            <div className="result-summary"><h2><span>월 예상 이자</span> {formatWon(result.monthlyInterest)}</h2></div>
            <div><span>연 예상 이자</span><strong>{formatWon(result.annualInterest)}</strong></div>
            <EstimateNotice />
          </div>
          <section className="next-checks" aria-labelledby="loan-interest-next-checks">
            <h2 id="loan-interest-next-checks">다음에 확인할 것</h2>
            <div>
              <span>보증료와 인지세</span>
              <span>실제 적용 금리</span>
              <span>상환 방식</span>
            </div>
          </section>
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

"use client";

import { useState } from "react";
import { calculateJeonseIncrease, type JeonseIncreaseResult } from "@/calculators/jeonse-increase";
import { formatWon } from "@/lib/format";
import { CalculatorExplanation } from "./calculator-explanation";
import { CalculatorShell, EstimateNotice } from "./calculator-shell";
import { MoneyInput } from "./money-input";

export function JeonseIncreaseCalculator() {
  const [existing, setExisting] = useState("");
  const [next, setNext] = useState("");
  const [result, setResult] = useState<JeonseIncreaseResult | null>(null);
  const [error, setError] = useState("");
  return (
    <CalculatorShell title="전세보증금 5% 인상 계산기" description="기존 보증금과 신규 보증금의 차이, 인상률과 5% 초과 여부를 산술적으로 확인합니다.">
      <form className="calculator-form" onSubmit={(event) => {
        event.preventDefault();
        try {
          setResult(calculateJeonseIncrease(Number(existing), Number(next)));
          setError("");
        } catch (caught) {
          setResult(null);
          setError(caught instanceof Error ? caught.message : "입력값을 확인해 주세요.");
        }
      }}>
        <MoneyInput id="existing-deposit" label="기존 보증금" value={existing} onChange={setExisting} />
        <MoneyInput id="new-deposit" label="신규 보증금" value={next} onChange={setNext} />
        {error ? <p role="alert" className="field-error">{error}</p> : null}
        <button className="primary-button" type="submit">인상률 계산하기</button>
      </form>
      {result ? <div className="result-panel" aria-live="polite">
        <div><span>보증금 차이</span><strong>{formatWon(result.increaseAmount)}</strong></div>
        <div><span>인상률</span><strong>{result.increaseRate.toFixed(2)}%</strong></div>
        <div><span>5% 초과 여부</span><strong>{result.exceedsFivePercent ? "초과" : "초과 아님"}</strong></div>
        <p className="estimate-notice">5% 표시는 입력값의 산술 비교이며 개별 계약에 대한 법률 판단이 아닙니다.</p>
        <EstimateNotice />
      </div> : null}
      <CalculatorExplanation
        formula="인상액 = 신규 보증금 - 기존 보증금 / 인상률 = (신규 보증금 - 기존 보증금) / 기존 보증금 x 100"
        example="기존 보증금이 3억원에서 3억 1,500만원으로 변경되면 인상액은 1,500만원, 인상률은 5.00%입니다."
        rounding="보증금 차이는 입력한 원 단위 금액으로 계산합니다. 인상률은 화면에 소수 둘째 자리까지 표시하지만, 5% 초과 여부는 반올림하기 전 계산값으로 판정합니다."
        exclusions={[
          "증액 시점과 이전 증액 이력",
          "계약갱신요구권 행사 여부와 임대인의 법정 거절 사유",
          "지방자치단체 조례, 특약과 개별 계약의 사실관계",
          "확정일자, 전세대출과 반환보증의 변경 절차",
        ]}
        cautions={[
          "5% 표시는 두 입력값을 비교한 예상 계산값이며 개별 계약에 대한 법률 판단이 아닙니다.",
          "실제 증액 가능 범위는 적용 법령, 계약 경위와 증액 시점을 확인해야 합니다.",
          "분쟁 가능성이 있으면 계약서와 의사표시 기록을 준비해 법률구조기관 또는 전문가에게 확인하세요.",
        ]}
        sourceIds={["law-housing-lease-protection"]}
      />
    </CalculatorShell>
  );
}

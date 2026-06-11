"use client";

import { useState } from "react";
import { calculateJeonseIncrease, type JeonseIncreaseResult } from "@/calculators/jeonse-increase";
import { formatWon } from "@/lib/format";
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
    </CalculatorShell>
  );
}

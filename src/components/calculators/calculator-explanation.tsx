"use client";

import { useState } from "react";
import { SourceList } from "@/components/content/source-list";

export type CalculatorExplanationProps = {
  formula: string;
  example: string;
  rounding: string;
  exclusions: string[];
  cautions: string[];
  sourceIds: string[];
};

export function CalculatorExplanation({
  formula,
  example,
  rounding,
  exclusions,
  cautions,
  sourceIds,
}: CalculatorExplanationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = "calculator-explanation-panel";

  return (
    <article className="calculator-explanation" aria-label="계산기 이용 안내">
      <div className="calculator-explanation-intro">
        <span className="eyebrow">계산 근거와 확인사항</span>
        <h2>결과를 확인하기 전에 읽어보세요</h2>
        <p>계산기가 적용하는 산식과 실제 계약·대출 검토에서 별도로 확인할 항목을 정리했습니다.</p>
        <button
          className="accordion-toggle"
          type="button"
          aria-controls={panelId}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          계산 방식 보기 {isOpen ? "▴" : "▾"}
        </button>
      </div>

      <div
        id={panelId}
        data-testid="calculator-explanation-panel"
        className={`calculator-explanation-panel${isOpen ? " is-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="calculator-explanation-panel-inner">
          <div className="calculator-explanation-grid">
            <section>
              <h3>계산 방법</h3>
              <p className="formula-box">{formula}</p>
            </section>
            <section>
              <h3>계산 예시</h3>
              <p>{example}</p>
            </section>
            <section>
              <h3>반올림 규칙</h3>
              <p>{rounding}</p>
            </section>
            <section>
              <h3>계산에 포함되지 않는 항목</h3>
              <ul>{exclusions.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
            <section className="calculator-explanation-wide">
              <h3>사용 전 확인사항</h3>
              <ul>{cautions.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          </div>

          <SourceList sourceIds={sourceIds} />
        </div>
      </div>
    </article>
  );
}

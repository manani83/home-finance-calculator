import { render, screen } from "@testing-library/react";
import { CalculatorExplanation } from "./calculator-explanation";

describe("CalculatorExplanation", () => {
  it("renders the complete explanation structure and registered official sources", () => {
    render(
      <CalculatorExplanation
        formula="원금 x 연 금리 / 100 / 12"
        example="1억원을 연 4.2%로 계산하면 월 350,000원입니다."
        rounding="월 이자는 원 단위로 반올림합니다."
        exclusions={["보증료", "중도상환수수료"]}
        cautions={["실제 적용 금리는 금융기관에서 확인하세요."]}
        sourceIds={["hf-jeonse-guarantee"]}
      />,
    );

    for (const heading of [
      "계산 방법",
      "계산 예시",
      "반올림 규칙",
      "계산에 포함되지 않는 항목",
      "사용 전 확인사항",
      "공식 출처",
    ]) {
      expect(screen.getByRole("heading", { name: heading })).toBeInTheDocument();
    }

    expect(screen.getByRole("link", { name: /한국주택금융공사/ })).toHaveAttribute(
      "href",
      "https://www.hf.go.kr/ko/sub02/sub02_01_02_01.do",
    );
    expect(screen.getByText(/확인일 2026-06-11/)).toBeInTheDocument();
  });
});

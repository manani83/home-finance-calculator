import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { JeonseIncreaseCalculator } from "./jeonse-increase-calculator";
import { LoanIncreaseCalculator } from "./loan-increase-calculator";
import { LoanInterestCalculator } from "./loan-interest-calculator";

describe("calculator explanatory content", () => {
  it("explains the jeonse increase formula and its legal limitation", async () => {
    const user = userEvent.setup();
    render(<JeonseIncreaseCalculator />);
    await user.click(screen.getByRole("button", { name: "계산 방식 보기 ▾" }));

    expect(screen.getByText(/\(신규 보증금 - 기존 보증금\) \/ 기존 보증금 x 100/)).toBeInTheDocument();
    expect(screen.getByText(/3억원에서 3억 1,500만원/)).toBeInTheDocument();
    expect(screen.getByText(/법률 판단이 아닙니다/)).toBeInTheDocument();
  });

  it("explains the interest-only formula and excluded costs", async () => {
    const user = userEvent.setup();
    render(<LoanInterestCalculator />);
    await user.click(screen.getByRole("button", { name: "계산 방식 보기 ▾" }));

    expect(screen.getByText(/대출 원금 x 연 금리 \/ 100 \/ 12/)).toBeInTheDocument();
    expect(screen.getByText(/1억원을 연 4.2%/)).toBeInTheDocument();
    expect(screen.getByText("보증료와 인지세 등 부대 비용")).toBeInTheDocument();
  });

  it("explains that existing and additional loan portions are calculated separately", async () => {
    const user = userEvent.setup();
    render(<LoanIncreaseCalculator />);
    await user.click(screen.getByRole("button", { name: "계산 방식 보기 ▾" }));

    expect(screen.getByText(/기존 대출 월 이자 \+ 증액분 월 이자/)).toBeInTheDocument();
    expect(screen.getByText(/기존 1억원과 증액 2,000만원/)).toBeInTheDocument();
    expect(screen.getByText(/전체 잔액에 신규 금리/)).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoanLimitCalculator } from "./loan-limit-calculator";

describe("LoanLimitCalculator", () => {
  it("uses an 80 percent default LTV and estimates the loan limit", async () => {
    const user = userEvent.setup();
    render(<LoanLimitCalculator />);

    expect(screen.getByLabelText("LTV 비율")).toHaveValue("80");

    await user.type(screen.getByLabelText("전세보증금"), "300000000");

    expect(screen.getByText("추정 최대 대출 가능 금액")).toBeInTheDocument();
    expect(screen.getByText("240,000,000원")).toBeInTheDocument();
    expect(screen.getByText("60,000,000원")).toBeInTheDocument();
    expect(screen.getAllByText(/LTV만 적용한 단순 추정값/).length).toBeGreaterThan(0);
  });

  it("updates the result when the user edits the LTV rate", async () => {
    const user = userEvent.setup();
    render(<LoanLimitCalculator />);

    await user.type(screen.getByLabelText("전세보증금"), "300000000");
    await user.clear(screen.getByLabelText("LTV 비율"));
    await user.type(screen.getByLabelText("LTV 비율"), "70");

    expect(screen.getByText("210,000,000원")).toBeInTheDocument();
    expect(screen.getByText("90,000,000원")).toBeInTheDocument();
  });

  it("does not show a result before the deposit exists", () => {
    render(<LoanLimitCalculator />);

    expect(screen.queryByText("추정 최대 대출 가능 금액")).not.toBeInTheDocument();
  });

  it("shows the HF source in the explanation", async () => {
    const user = userEvent.setup();
    render(<LoanLimitCalculator />);

    await user.click(screen.getByRole("button", { name: "계산 방식 보기 ▾" }));

    expect(screen.getAllByText(/소득, 신용도/).length).toBeGreaterThan(0);
    expect(screen.getByText(/한국주택금융공사\(HF\)/)).toBeInTheDocument();
    expect(screen.getAllByText(/전세자금보증/).length).toBeGreaterThan(0);
  });
});

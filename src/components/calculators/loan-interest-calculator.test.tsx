import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoanInterestCalculator } from "./loan-interest-calculator";

describe("LoanInterestCalculator", () => {
  it("calculates locally and labels the result as an estimate", async () => {
    const user = userEvent.setup();
    const { container } = render(<LoanInterestCalculator />);

    await user.type(screen.getByLabelText("대출 원금"), "100000000");
    await user.type(screen.getByLabelText("연 금리"), "4.2");
    await user.click(screen.getByRole("button", { name: "이자 계산하기" }));

    expect(screen.getByText("월 예상 이자")).toBeInTheDocument();
    expect(screen.getByText("350,000원")).toBeInTheDocument();
    expect(screen.getByText(/예상 계산값/)).toBeInTheDocument();
    expect(container.querySelector("form")).not.toHaveAttribute("action");
  });

  it("shows a nearby error for a negative value", async () => {
    const user = userEvent.setup();
    render(<LoanInterestCalculator />);

    await user.type(screen.getByLabelText("대출 원금"), "-1");
    await user.type(screen.getByLabelText("연 금리"), "4");
    await user.click(screen.getByRole("button", { name: "이자 계산하기" }));

    expect(screen.getByRole("alert")).toHaveTextContent("대출 원금");
  });
});

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

  it("shows the estimated result while typing without submitting", async () => {
    const user = userEvent.setup();
    render(<LoanInterestCalculator />);

    await user.type(screen.getByLabelText("대출 원금"), "100000000");
    await user.type(screen.getByLabelText("연 금리"), "4.2");

    expect(screen.getByRole("heading", { name: "월 예상 이자 350,000원" })).toBeInTheDocument();
  });

  it("shows next checks after the estimated result", async () => {
    const user = userEvent.setup();
    render(<LoanInterestCalculator />);

    await user.type(screen.getByLabelText("대출 원금"), "100000000");
    await user.type(screen.getByLabelText("연 금리"), "4.2");

    expect(screen.getByRole("heading", { name: "다음에 확인할 것" })).toBeInTheDocument();
    expect(screen.getByText("보증료와 인지세")).toBeInTheDocument();
    expect(screen.getByText("실제 적용 금리")).toBeInTheDocument();
    expect(screen.getByText("상환 방식")).toBeInTheDocument();
  });

  it("offers mobile-friendly amount and rate presets", async () => {
    const user = userEvent.setup();
    render(<LoanInterestCalculator />);

    await user.click(screen.getByRole("button", { name: "2억" }));
    await user.click(screen.getByRole("button", { name: "4.0%" }));

    expect(screen.getByLabelText("대출 원금")).toHaveValue("200,000,000");
    expect(screen.getByLabelText("연 금리")).toHaveValue("4.0");
    expect(screen.getByRole("heading", { name: "월 예상 이자 666,667원" })).toBeInTheDocument();
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

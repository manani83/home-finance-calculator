import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoanInterestCalculator } from "./loan-interest-calculator";

describe("LoanInterestCalculator", () => {
  it("calculates locally and labels the result as an estimate", async () => {
    const user = userEvent.setup();
    const { container } = render(<LoanInterestCalculator />);

    await user.type(screen.getByLabelText("대출 원금"), "100000000");
    await user.type(screen.getByLabelText("연 금리"), "4.2");

    expect(screen.getByText("월 예상 이자")).toBeInTheDocument();
    expect(screen.getByText("월 약 35만원")).toBeInTheDocument();
    expect(screen.getByText(/예상 계산값/)).toBeInTheDocument();
    expect(container.querySelector("form")).not.toHaveAttribute("action");
    expect(screen.queryByRole("button", { name: "이자 계산하기" })).not.toBeInTheDocument();
  });

  it("shows the estimated result while typing without submitting", async () => {
    const user = userEvent.setup();
    render(<LoanInterestCalculator />);

    await user.type(screen.getByLabelText("대출 원금"), "100000000");
    await user.type(screen.getByLabelText("연 금리"), "4.2");

    expect(screen.getByText("월 예상 이자")).toBeInTheDocument();
    expect(screen.getByText("월 약 35만원")).toBeInTheDocument();
    expect(screen.getByText("연 약 420만원")).toBeInTheDocument();
  });

  it("shows next step action buttons after the estimated result", async () => {
    const user = userEvent.setup();
    render(<LoanInterestCalculator />);

    await user.type(screen.getByLabelText("대출 원금"), "100000000");
    await user.type(screen.getByLabelText("연 금리"), "4.2");

    expect(screen.getByRole("heading", { name: "다음 단계" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "대출 늘리면 이자 얼마나 늘까 계산하기" })).toHaveAttribute("href", "/calculators/loan-increase");
    expect(screen.getByRole("link", { name: "전세대출 연장 vs 대환 가이드 읽기" })).toHaveAttribute("href", "/guides/loan-extension-vs-refinance");
  });

  it("does not show next step action buttons before a result exists", () => {
    render(<LoanInterestCalculator />);

    expect(screen.queryByRole("heading", { name: "다음 단계" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "대출 늘리면 이자 얼마나 늘까 계산하기" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "전세대출 연장 vs 대환 가이드 읽기" })).not.toBeInTheDocument();
  });

  it("offers mobile-friendly amount and rate presets", async () => {
    const user = userEvent.setup();
    render(<LoanInterestCalculator />);

    await user.click(screen.getByRole("button", { name: "2억" }));
    await user.click(screen.getByRole("button", { name: "4.0%" }));

    expect(screen.getByLabelText("대출 원금")).toHaveValue("200,000,000");
    expect(screen.getByLabelText("연 금리")).toHaveValue("4.0");
    expect(screen.getByText("월 약 67만원")).toBeInTheDocument();
  });

  it("shows a nearby error for a negative value", async () => {
    const user = userEvent.setup();
    render(<LoanInterestCalculator />);

    await user.type(screen.getByLabelText("대출 원금"), "-1");
    await user.type(screen.getByLabelText("연 금리"), "4");

    expect(screen.getByRole("alert")).toHaveTextContent("대출 원금");
  });
});

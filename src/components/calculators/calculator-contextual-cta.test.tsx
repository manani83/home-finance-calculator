import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { JeonseIncreaseCalculator } from "./jeonse-increase-calculator";
import { LoanIncreaseCalculator } from "./loan-increase-calculator";

describe("calculator contextual CTA buttons", () => {
  it("does not show CTA buttons before the jeonse increase result exists", () => {
    render(<JeonseIncreaseCalculator />);

    expect(screen.queryByRole("heading", { name: "다음 단계" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "계약갱신청구권 가이드 읽기" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "전세대출 월 이자 계산하기" })).not.toBeInTheDocument();
  });

  it("links to the lease renewal guide when the deposit increase exceeds 5 percent", async () => {
    const user = userEvent.setup();
    render(<JeonseIncreaseCalculator />);

    await user.type(screen.getByLabelText("기존 보증금"), "100000000");
    await user.type(screen.getByLabelText("신규 보증금"), "106000000");

    expect(screen.getByRole("link", { name: "계약갱신청구권 가이드 읽기" })).toHaveAttribute("href", "/guides/lease-renewal-right");
    expect(screen.queryByRole("link", { name: "전세대출 월 이자 계산하기" })).not.toBeInTheDocument();
  });

  it("links to the loan interest calculator when the deposit increase is 5 percent or less", async () => {
    const user = userEvent.setup();
    render(<JeonseIncreaseCalculator />);

    await user.type(screen.getByLabelText("기존 보증금"), "100000000");
    await user.type(screen.getByLabelText("신규 보증금"), "105000000");

    expect(screen.getByRole("link", { name: "전세대출 월 이자 계산하기" })).toHaveAttribute("href", "/calculators/loan-interest");
    expect(screen.queryByRole("link", { name: "계약갱신청구권 가이드 읽기" })).not.toBeInTheDocument();
  });

  it("links to the extension vs refinance guide after the loan increase result exists", async () => {
    const user = userEvent.setup();
    render(<LoanIncreaseCalculator />);

    await user.type(screen.getByLabelText("기존 대출금"), "100000000");
    await user.type(screen.getByLabelText("기존 연 금리"), "4");
    await user.type(screen.getByLabelText("증액 금액"), "20000000");
    await user.type(screen.getByLabelText("증액분 연 금리"), "4.5");

    expect(screen.getByRole("link", { name: "전세대출 연장 vs 대환 가이드 읽기" })).toHaveAttribute("href", "/guides/loan-extension-vs-refinance");
  });
});

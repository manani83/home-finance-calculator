import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { JeonseToMonthlyCalculator } from "./jeonse-to-monthly-calculator";

describe("JeonseToMonthlyCalculator", () => {
  it("uses a 6 percent default conversion rate and calculates estimated monthly rent", async () => {
    const user = userEvent.setup();
    render(<JeonseToMonthlyCalculator />);

    expect(screen.getByLabelText("전월세전환율")).toHaveValue("6");

    await user.type(screen.getByLabelText("전환 전 전세보증금"), "300000000");
    await user.type(screen.getByLabelText("전환 후 보증금"), "150000000");

    expect(screen.getByText("예상 월세 금액")).toBeInTheDocument();
    expect(screen.getByText("750,000원")).toBeInTheDocument();
    expect(screen.getByText("9,000,000원")).toBeInTheDocument();
    expect(screen.getByText("6.00%")).toBeInTheDocument();
    expect(screen.getAllByText(/예상 계산값/).length).toBeGreaterThan(0);
  });

  it("does not show the result before both deposit values exist", () => {
    render(<JeonseToMonthlyCalculator />);

    expect(screen.queryByText("예상 월세 금액")).not.toBeInTheDocument();
  });

  it("shows official source and excluded items in the explanation", async () => {
    const user = userEvent.setup();
    render(<JeonseToMonthlyCalculator />);

    await user.click(screen.getByRole("button", { name: "계산 방식 보기 ▾" }));

    expect(screen.getByText(/당사자 간 개별 약정에 의한 전환율 적용 가능 여부/)).toBeInTheDocument();
    expect(screen.getByText(/전환 시점과 계약 갱신 여부/)).toBeInTheDocument();
    expect(screen.getAllByText(/주택임대차보호법 제7조의2/).length).toBeGreaterThan(0);
  });
});

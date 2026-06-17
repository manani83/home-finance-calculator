import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("links directly to all MVP calculators and guides", () => {
    render(<HomePage />);
    const destinations = [
      "/calculators/jeonse-increase",
      "/calculators/loan-interest",
      "/calculators/loan-increase",
      "/guides/hug-hf-sgi-comparison",
      "/guides/lease-renewal-right",
      "/guides/loan-extension-vs-refinance",
    ];

    for (const href of destinations) {
      expect(document.querySelector(`a[href="${href}"]`)).toBeInTheDocument();
    }
    expect(screen.getByText(/입력값은 저장하거나 전송하지 않습니다/)).toBeInTheDocument();
  });

  it("provides distinct desktop and mobile hero copy", () => {
    render(<HomePage />);

    expect(screen.getByText(/전세보증금과/)).toHaveClass("hero-copy-desktop");
    expect(screen.getByText("전세금")).toHaveClass("hero-keyword");
    expect(screen.getByText("대출 이자")).toHaveClass("hero-keyword");
    expect(screen.getByText(/한눈에 계산하세요/)).toBeInTheDocument();
    expect(screen.getByText("예상 계산값과 공식 확인 자료를 한곳에서 제공합니다.")).toBeInTheDocument();
    expect(screen.getByText("입력한 금액과 금리는 외부로 전송되지 않습니다.")).toBeInTheDocument();
  });

  it("leads mobile users through urgent housing finance situations", () => {
    render(<HomePage />);

    expect(screen.getAllByRole("link", { name: /보증금 5% 넘는지 확인/ })[0]).toHaveAttribute("href", "/calculators/jeonse-increase");
    expect(screen.getAllByRole("link", { name: /월 이자가 얼마인지 계산/ })[0]).toHaveAttribute("href", "/calculators/loan-interest");
    expect(screen.getAllByRole("link", { name: /대출을 늘리면 이자 변화 확인/ })[0]).toHaveAttribute("href", "/calculators/loan-increase");
  });

  it("uses question-oriented calculator cards", () => {
    render(<HomePage />);

    expect(screen.getAllByText("보증금 5% 넘는지 확인")).toHaveLength(2);
    expect(screen.getByText("집주인이 보증금을 올려달라고 했을 때 법정 상한과 실제 인상률을 먼저 확인하세요.")).toBeInTheDocument();
    expect(screen.getByText("대출 늘리면 이자 얼마나 늘까")).toBeInTheDocument();
  });

  it("marks situation links as tappable choices", () => {
    render(<HomePage />);

    const situationList = screen.getByLabelText("자주 찾는 상황");
    expect(situationList.querySelectorAll(".situation-index")).toHaveLength(3);
    expect(situationList.querySelectorAll(".click-cue")).toHaveLength(3);
  });

  it("marks calculator and guide cards as clickable cards", () => {
    render(<HomePage />);

    expect(document.querySelectorAll(".card-click-cue")).toHaveLength(6);
    expect(document.querySelectorAll(".calculator-card[data-clickable='true']")).toHaveLength(3);
    expect(document.querySelectorAll(".home-guide-card[data-clickable='true']")).toHaveLength(3);
  });
});

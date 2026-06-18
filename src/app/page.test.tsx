import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("links directly to all MVP calculators and guides", () => {
    render(<HomePage />);
    const destinations = [
      "/calculators/jeonse-increase",
      "/calculators/jeonse-to-monthly",
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

  it("uses a single hero h1 with the approved copy", () => {
    render(<HomePage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: "전세보증금과 대출 이자를 바로 계산하세요" })).toBeInTheDocument();
    expect(screen.getByText("집주인 요구 보증금이 합법인지, 이자 부담이 얼마인지 — 30초 안에 확인하세요")).toBeInTheDocument();
    expect(screen.queryByText(/복잡한 주거금융 정보를/)).not.toBeInTheDocument();
    expect(screen.getByText(/입력한 금액과 금리는 외부로 전송되지 않습니다/)).toBeInTheDocument();
  });

  it("leads mobile users through urgent housing finance situations", () => {
    render(<HomePage />);

    expect(screen.getAllByRole("link", { name: /보증금 5% 넘는지 확인/ })[0]).toHaveAttribute("href", "/calculators/jeonse-increase");
    expect(screen.getAllByRole("link", { name: /전세를 월세로 바꾸면 얼마인지 계산/ })[0]).toHaveAttribute("href", "/calculators/jeonse-to-monthly");
    expect(screen.getAllByRole("link", { name: /월 이자가 얼마인지 계산/ })[0]).toHaveAttribute("href", "/calculators/loan-interest");
  });

  it("uses question-oriented calculator cards", () => {
    render(<HomePage />);

    expect(screen.getAllByText("보증금 5% 넘는지 확인")).toHaveLength(2);
    expect(screen.getByText("집주인이 보증금을 올려달라고 했을 때 법정 상한과 실제 인상률을 먼저 확인하세요.")).toBeInTheDocument();
    expect(screen.getByText("전월세 전환 월세 계산")).toBeInTheDocument();
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

    expect(document.querySelectorAll(".card-click-cue")).toHaveLength(7);
    expect(document.querySelectorAll(".calculator-card[data-clickable='true']")).toHaveLength(4);
    expect(document.querySelectorAll(".home-guide-card[data-clickable='true']")).toHaveLength(3);
  });

  it("adds distinct icons to calculator choice cards", () => {
    render(<HomePage />);

    expect(screen.getByLabelText("보증금 계산기")).toBeInTheDocument();
    expect(screen.getByLabelText("전월세 전환 계산기")).toBeInTheDocument();
    expect(screen.getByLabelText("이자 계산기")).toBeInTheDocument();
    expect(screen.getByLabelText("한도 비교 계산기")).toBeInTheDocument();
  });

  it("makes the whole calculator card a navigation link", () => {
    render(<HomePage />);

    expect(document.querySelector('.calculator-card[href="/calculators/jeonse-increase"]')).toBeInTheDocument();
    expect(document.querySelector('.calculator-card[href="/calculators/jeonse-to-monthly"]')).toBeInTheDocument();
    expect(document.querySelector('.calculator-card[href="/calculators/loan-interest"]')).toBeInTheDocument();
    expect(document.querySelector('.calculator-card[href="/calculators/loan-increase"]')).toBeInTheDocument();
  });
});

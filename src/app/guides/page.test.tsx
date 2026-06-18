import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GuidesPage from "./page";

describe("GuidesPage", () => {
  it("frames guides as decision questions for mobile users", async () => {
    render(await GuidesPage());

    expect(screen.getByRole("heading", { name: "HUG·HF·SGI 중 뭐가 다른가요?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "계약갱신청구권 쓰면 보증금은 얼마나 오르나요?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "전세대출 연장과 대환, 뭐부터 확인해야 하나요?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "DSR·DTI 계산, 내 대출 한도에 어떻게 영향을 주나요?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "전세보증보험 가입 거절 사유와 대처 방법" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "우대금리 조건 확인하는 방법 — 은행별 차이점" })).toBeInTheDocument();
  });

  it("shows category badges and reading time on each guide card", async () => {
    render(await GuidesPage());

    expect(screen.getAllByText("약 3분").length).toBeGreaterThanOrEqual(6);
    expect(screen.getAllByText("보증").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("계약").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("대출").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("금리").length).toBeGreaterThanOrEqual(1);
  });

  it("offers client-side guide category filter tabs", async () => {
    render(await GuidesPage());

    for (const name of ["전체", "보증", "계약", "대출", "금리"]) {
      expect(screen.getByRole("button", { name })).toBeInTheDocument();
    }

    expect(screen.getByRole("button", { name: "전체" })).toHaveAttribute("aria-pressed", "true");
  });

  it("filters guides when a category tab is clicked", async () => {
    const user = userEvent.setup();
    render(await GuidesPage());

    await user.click(screen.getByRole("button", { name: "보증" }));

    expect(screen.getByRole("button", { name: "보증" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "HUG·HF·SGI 중 뭐가 다른가요?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "전세보증보험 가입 거절 사유와 대처 방법" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "계약갱신청구권 쓰면 보증금은 얼마나 오르나요?" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "전세대출 연장과 대환, 뭐부터 확인해야 하나요?" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "우대금리 조건 확인하는 방법 — 은행별 차이점" })).not.toBeInTheDocument();
  });

  it("links new guide cards to their future slug pages", async () => {
    render(await GuidesPage());

    expect(screen.getByRole("link", { name: "DSR·DTI 계산, 내 대출 한도에 어떻게 영향을 주나요?" })).toHaveAttribute("href", "/guides/dsr-dti-jeonse-loan");
    expect(screen.getByRole("link", { name: "전세보증보험 가입 거절 사유와 대처 방법" })).toHaveAttribute("href", "/guides/guarantee-insurance-rejection");
    expect(screen.getByRole("link", { name: "우대금리 조건 확인하는 방법 — 은행별 차이점" })).toHaveAttribute("href", "/guides/preferential-interest-rate");
  });
});

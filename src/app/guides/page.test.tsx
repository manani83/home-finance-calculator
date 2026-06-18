import { render, screen } from "@testing-library/react";
import GuidesPage from "./page";

describe("GuidesPage", () => {
  it("frames guides as decision questions for mobile users", () => {
    render(<GuidesPage />);

    expect(screen.getByRole("heading", { name: "HUG·HF·SGI 중 뭐가 다른가요?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "계약갱신청구권 쓰면 보증금은 얼마나 오르나요?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "전세대출 연장과 대환, 뭐부터 확인해야 하나요?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "DSR·DTI는 전세대출 심사에서 무엇을 보나요?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "전세보증보험이 거절될 때 먼저 볼 것은?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "우대금리는 실제 금리와 어떻게 다른가요?" })).toBeInTheDocument();
  });

  it("offers guide category filter tabs", () => {
    render(<GuidesPage />);

    for (const name of ["전체", "보증", "계약", "대출", "금리"]) {
      expect(screen.getByRole("link", { name })).toBeInTheDocument();
    }

    expect(screen.getByRole("link", { name: "전체" })).toHaveAttribute("aria-current", "page");
  });
});

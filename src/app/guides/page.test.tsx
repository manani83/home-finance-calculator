import { render, screen } from "@testing-library/react";
import GuidesPage from "./page";

describe("GuidesPage", () => {
  it("frames guides as decision questions for mobile users", () => {
    render(<GuidesPage />);

    expect(screen.getByRole("heading", { name: "HUG·HF·SGI 중 뭐가 다른가요?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "계약갱신청구권 쓰면 보증금은 얼마나 오르나요?" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "전세대출 연장과 대환, 뭐부터 확인해야 하나요?" })).toBeInTheDocument();
  });
});

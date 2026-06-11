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
});

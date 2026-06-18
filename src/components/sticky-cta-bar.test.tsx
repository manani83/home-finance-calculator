import { act, render, screen } from "@testing-library/react";
import { StickyCtaBar } from "./sticky-cta-bar";

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];

  readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }

  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = vi.fn(() => []);
}

describe("StickyCtaBar", () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = [];
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("appears after the hero section leaves the viewport", () => {
    render(<><section className="hero" /><StickyCtaBar /></>);

    expect(screen.getByText("지금 계산하기")).toHaveAttribute("aria-hidden", "true");

    act(() => {
      MockIntersectionObserver.instances[0].callback([{ isIntersecting: false } as IntersectionObserverEntry], MockIntersectionObserver.instances[0] as unknown as IntersectionObserver);
    });

    expect(screen.getByRole("link", { name: "지금 계산하기" })).toHaveClass("is-visible");
    expect(screen.getByRole("link", { name: "지금 계산하기" })).toHaveAttribute("href", "/#calculators");
  });
});

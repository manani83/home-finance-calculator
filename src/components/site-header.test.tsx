import { act, render, screen } from "@testing-library/react";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { SiteHeader } from "./site-header";

describe("SiteHeader", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("opens a mobile drawer with active navigation state", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/guides");
    render(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: "메뉴 열기" }));

    const drawer = screen.getByRole("dialog", { name: "모바일 메뉴" });
    expect(drawer).toBeInTheDocument();
    expect(within(drawer).getByRole("link", { name: "금융 가이드" })).toHaveAttribute("aria-current", "page");
    expect(within(drawer).getByRole("link", { name: "금융 가이드" })).toHaveClass("active");

    await user.click(screen.getByRole("button", { name: "메뉴 닫기" }));
    expect(screen.queryByRole("dialog", { name: "모바일 메뉴" })).not.toBeInTheDocument();
  });

  it("updates the active navigation item from window.location.pathname changes", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "계산기" })).not.toHaveClass("active");

    act(() => {
      window.history.pushState({}, "", "/calculators/loan-interest");
      window.dispatchEvent(new PopStateEvent("popstate"));
    });

    expect(screen.getByRole("link", { name: "계산기" })).toHaveClass("active");
    expect(screen.getByRole("link", { name: "계산기" })).toHaveAttribute("aria-current", "page");
  });

  it("closes the mobile drawer when the overlay background is tapped", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    await user.click(screen.getByRole("button", { name: "메뉴 열기" }));
    expect(screen.getByRole("dialog", { name: "모바일 메뉴" })).toBeInTheDocument();

    await user.click(document.querySelector(".mobile-drawer-overlay") as HTMLElement);

    expect(screen.queryByRole("dialog", { name: "모바일 메뉴" })).not.toBeInTheDocument();
  });

  it("adds a header shadow only while scrolling down", () => {
    render(<SiteHeader />);
    const header = screen.getByRole("banner");

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 80, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header).toHaveClass("is-scrolled");

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 20, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header).not.toHaveClass("is-scrolled");
  });
});

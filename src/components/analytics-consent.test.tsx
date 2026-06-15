import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { AnalyticsConsent } from "./analytics-consent";

vi.mock("@next/third-parties/google", () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) => <div data-testid="google-analytics" data-ga-id={gaId} />,
}));

const consentStorageKey = "home-finance-analytics-consent";

describe("AnalyticsConsent", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("renders nothing when a measurement ID is not configured", () => {
    render(<AnalyticsConsent />);

    expect(screen.queryByRole("region", { name: "방문 분석 설정" })).not.toBeInTheDocument();
    expect(screen.queryByTestId("google-analytics")).not.toBeInTheDocument();
  });

  it("asks for consent without loading analytics before a choice", async () => {
    render(<AnalyticsConsent measurementId="G-TEST123" />);

    expect(await screen.findByRole("region", { name: "방문 분석 설정" })).toBeInTheDocument();
    expect(screen.queryByTestId("google-analytics")).not.toBeInTheDocument();
  });

  it("stores consent and loads analytics after acceptance", async () => {
    const user = userEvent.setup();
    render(<AnalyticsConsent measurementId="G-TEST123" />);

    await user.click(await screen.findByRole("button", { name: "분석 수집 동의" }));

    expect(window.localStorage.getItem(consentStorageKey)).toBe("granted");
    expect(screen.getByTestId("google-analytics")).toHaveAttribute("data-ga-id", "G-TEST123");
    expect(screen.queryByRole("region", { name: "방문 분석 설정" })).not.toBeInTheDocument();
  });

  it("stores refusal and keeps analytics disabled", async () => {
    const user = userEvent.setup();
    render(<AnalyticsConsent measurementId="G-TEST123" />);

    await user.click(await screen.findByRole("button", { name: "분석 수집 거부" }));

    expect(window.localStorage.getItem(consentStorageKey)).toBe("denied");
    expect(screen.queryByTestId("google-analytics")).not.toBeInTheDocument();
    expect(screen.queryByRole("region", { name: "방문 분석 설정" })).not.toBeInTheDocument();
  });

  it("restores a previously granted choice", async () => {
    window.localStorage.setItem(consentStorageKey, "granted");

    render(<AnalyticsConsent measurementId="G-TEST123" />);

    await waitFor(() => expect(screen.getByTestId("google-analytics")).toBeInTheDocument());
    expect(screen.queryByRole("region", { name: "방문 분석 설정" })).not.toBeInTheDocument();
  });
});

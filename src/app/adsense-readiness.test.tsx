import { render, screen } from "@testing-library/react";
import HomePage, { metadata as homeMetadata } from "./page";
import AboutPage, { metadata as aboutMetadata } from "./about/page";
import ContactPage, { metadata as contactMetadata } from "./contact/page";
import PrivacyPage, { metadata as privacyMetadata } from "./privacy/page";
import TermsPage, { metadata as termsMetadata } from "./terms/page";
import GuidesPage, { metadata as guidesMetadata } from "./guides/page";
import JeonseIncreasePage, { metadata as jeonseMetadata } from "./calculators/jeonse-increase/page";
import LoanIncreasePage, { metadata as loanIncreaseMetadata } from "./calculators/loan-increase/page";
import LoanInterestPage, { metadata as loanInterestMetadata } from "./calculators/loan-interest/page";

describe("AdSense readiness pages", () => {
  it.each([
    [homeMetadata, "/"],
    [aboutMetadata, "/about"],
    [contactMetadata, "/contact"],
    [privacyMetadata, "/privacy"],
    [termsMetadata, "/terms"],
    [guidesMetadata, "/guides"],
    [jeonseMetadata, "/calculators/jeonse-increase"],
    [loanIncreaseMetadata, "/calculators/loan-increase"],
    [loanInterestMetadata, "/calculators/loan-interest"],
  ])("sets a self-referencing canonical", (metadata, canonical) => {
    expect(metadata.alternates).toEqual({ canonical });
  });

  it("describes Google advertising data use and user controls", () => {
    render(<PrivacyPage />);

    expect(screen.getByText(/페이지 URL과 IP 주소/)).toBeInTheDocument();
    expect(screen.getByText(/이전 방문 기록/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Google 광고 설정" })).toHaveAttribute(
      "href",
      "https://adssettings.google.com/",
    );
    expect(screen.getByRole("link", { name: /Google 서비스를 사용하는 사이트/ })).toHaveAttribute(
      "href",
      "https://policies.google.com/technologies/partner-sites?hl=ko",
    );
    expect(screen.getByText(/Google 인증 동의 관리 플랫폼/)).toBeInTheDocument();
  });

  it("describes consent-gated analytics without collecting calculator values", () => {
    render(<PrivacyPage />);

    expect(screen.getByRole("heading", { name: /Google Analytics 4/ })).toBeInTheDocument();
    expect(screen.getByText(/분석 수집에 동의한 경우에만/)).toBeInTheDocument();
    expect(screen.getByText(/보증금, 대출금, 금리와 계산 결과/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Google Analytics 차단 브라우저 부가기능/ })).toHaveAttribute(
      "href",
      "https://tools.google.com/dlpage/gaoptout?hl=ko",
    );
  });

  it("shows a real public contact address without deployment instructions", () => {
    render(<ContactPage />);

    expect(screen.getByRole("link", { name: "manani8381@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:manani8381@gmail.com",
    );
    expect(screen.queryByText(/배포 환경/)).not.toBeInTheDocument();
  });

  it("keeps all reviewed page components renderable", () => {
    for (const Page of [HomePage, AboutPage, TermsPage, GuidesPage, JeonseIncreasePage, LoanIncreasePage, LoanInterestPage]) {
      const { unmount } = render(<Page />);
      unmount();
    }
  });
});

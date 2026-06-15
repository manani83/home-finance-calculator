import { absoluteUrl, siteDescription, siteLocale, siteName, siteUrl } from "./site-config";

describe("site config", () => {
  it("uses the production Netlify domain as the default site URL", () => {
    expect(siteUrl).toBe("https://shimmering-starship-236730.netlify.app");
  });

  it("builds absolute canonical URLs", () => {
    expect(absoluteUrl("/guides")).toBe("https://shimmering-starship-236730.netlify.app/guides");
    expect(absoluteUrl("guides")).toBe("https://shimmering-starship-236730.netlify.app/guides");
  });

  it("exposes shared site identity", () => {
    expect(siteName).toBe("주거금융계산기");
    expect(siteDescription).toContain("공식 출처");
    expect(siteLocale).toBe("ko_KR");
  });
});

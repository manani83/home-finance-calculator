import robots from "./robots";
import { buildVerificationMetadata } from "@/lib/site-config";

describe("search discovery", () => {
  it("maps optional search verification values to their required meta names", () => {
    expect(buildVerificationMetadata({
      google: "google-code",
      naver: "naver-code",
      bing: "bing-code",
    })).toEqual({
      google: "google-code",
      other: {
        "naver-site-verification": "naver-code",
        "msvalidate.01": "bing-code",
      },
    });
  });

  it("omits empty verification meta tags", () => {
    expect(buildVerificationMetadata({ google: "", naver: undefined, bing: "" })).toBeUndefined();
  });

  it("allows search crawlers and advertises the production sitemap", () => {
    expect(robots()).toEqual({
      rules: [
        { userAgent: "*", allow: "/" },
        { userAgent: "OAI-SearchBot", allow: "/" },
      ],
      sitemap: "https://shimmering-starship-236730.netlify.app/sitemap.xml",
      host: "https://shimmering-starship-236730.netlify.app",
    });
  });
});

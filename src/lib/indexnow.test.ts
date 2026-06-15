import { buildIndexNowPayload, indexNowKeyResponse, isValidIndexNowKey } from "./indexnow";
import { getPublicUrls } from "./public-urls";

describe("IndexNow", () => {
  it("accepts only 8 to 128 hexadecimal character keys", () => {
    expect(isValidIndexNowKey("abcdef12")).toBe(true);
    expect(isValidIndexNowKey("ABCDEF1234567890")).toBe(true);
    expect(isValidIndexNowKey("short")).toBe(false);
    expect(isValidIndexNowKey("not-hex-key")).toBe(false);
  });

  it("builds a payload for all public sitemap URLs", () => {
    const urls = getPublicUrls();
    const payload = buildIndexNowPayload("abcdef12", urls);

    expect(payload).toMatchObject({
      host: "shimmering-starship-236730.netlify.app",
      key: "abcdef12",
      keyLocation: "https://shimmering-starship-236730.netlify.app/abcdef12.txt",
    });
    expect(payload.urlList).toContain("https://shimmering-starship-236730.netlify.app/guides/lease-renewal-right");
  });

  it("serves only the configured IndexNow key file", () => {
    expect(indexNowKeyResponse("abcdef12.txt", "abcdef12")).toEqual({ status: 200, body: "abcdef12" });
    expect(indexNowKeyResponse("different.txt", "abcdef12")).toEqual({ status: 404, body: "Not found" });
    expect(indexNowKeyResponse("abcdef12.txt", undefined)).toEqual({ status: 404, body: "Not found" });
  });
});

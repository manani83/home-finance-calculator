import { alt as openGraphAlt, contentType as openGraphContentType, size as openGraphSize } from "./opengraph-image";
import { alt as twitterAlt, contentType as twitterContentType, size as twitterSize } from "./twitter-image";

describe("social images", () => {
  it("provides a 1200 by 630 Open Graph image with descriptive alt text", () => {
    expect(openGraphSize).toEqual({ width: 1200, height: 630 });
    expect(openGraphContentType).toBe("image/png");
    expect(openGraphAlt).toBe("주거금융계산기 - 공식 출처 기반 전세 계산기와 가이드");
  });

  it("provides matching Twitter image metadata", () => {
    expect(twitterSize).toEqual({ width: 1200, height: 630 });
    expect(twitterContentType).toBe("image/png");
    expect(twitterAlt).toBe(openGraphAlt);
  });
});

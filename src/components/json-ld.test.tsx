import { render } from "@testing-library/react";
import { JsonLd, serializeJsonLd } from "./json-ld";

describe("JsonLd", () => {
  it("escapes less-than characters in JSON script content", () => {
    expect(serializeJsonLd({ value: "</script><script>" })).toContain("\\u003c/script>");
  });

  it("renders application/ld+json", () => {
    const { container } = render(<JsonLd data={{ "@type": "WebSite" }} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script?.textContent).toContain('"@type":"WebSite"');
  });
});

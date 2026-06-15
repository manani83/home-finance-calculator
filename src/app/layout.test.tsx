import RootLayout, { metadata } from "./layout";

describe("RootLayout", () => {
  it("provides the site identity and Korean document language", () => {
    const element = RootLayout({ children: <p>본문</p> });

    expect(metadata.title).toEqual({
      default: "주거금융계산기",
      template: "%s | 주거금융계산기",
    });
    expect(metadata.metadataBase?.toString()).toBe("https://shimmering-starship-236730.netlify.app/");
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
    expect(element.props.lang).toBe("ko");
    expect(element.props.children.props.children).toContainEqual(<p>본문</p>);
  });
});

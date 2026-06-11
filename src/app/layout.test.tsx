import RootLayout, { metadata } from "./layout";

describe("RootLayout", () => {
  it("provides the site identity and Korean document language", () => {
    const element = RootLayout({ children: <p>본문</p> });

    expect(metadata.title).toEqual({
      default: "주거금융계산기",
      template: "%s | 주거금융계산기",
    });
    expect(element.props.lang).toBe("ko");
    expect(element.props.children.props.children[1]).toEqual(<p>본문</p>);
  });
});

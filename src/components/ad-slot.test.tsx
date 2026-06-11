import { render } from "@testing-library/react";
import { AdSlot } from "./ad-slot";

describe("AdSlot", () => {
  it("renders no markup when AdSense is not configured", () => {
    delete process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
    delete process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID;
    const { container } = render(<AdSlot />);
    expect(container).toBeEmptyDOMElement();
  });
});

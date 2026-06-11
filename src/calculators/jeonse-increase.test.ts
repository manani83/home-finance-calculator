import { calculateJeonseIncrease } from "./jeonse-increase";

describe("calculateJeonseIncrease", () => {
  it("treats an exact five percent increase as within the threshold", () => {
    expect(calculateJeonseIncrease(200_000_000, 210_000_000)).toEqual({
      increaseAmount: 10_000_000,
      increaseRate: 5,
      exceedsFivePercent: false,
    });
  });

  it("supports a decrease without classifying it as over five percent", () => {
    expect(calculateJeonseIncrease(200_000_000, 190_000_000)).toEqual({
      increaseAmount: -10_000_000,
      increaseRate: -5,
      exceedsFivePercent: false,
    });
  });

  it("rejects a non-positive existing deposit", () => {
    expect(() => calculateJeonseIncrease(0, 10_000_000)).toThrow("기존 보증금");
  });
});

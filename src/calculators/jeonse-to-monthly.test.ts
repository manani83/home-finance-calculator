import { calculateJeonseToMonthly } from "./jeonse-to-monthly";

describe("calculateJeonseToMonthly", () => {
  it("calculates monthly rent from the converted deposit amount at the given annual conversion rate", () => {
    expect(calculateJeonseToMonthly(300_000_000, 150_000_000, 6)).toEqual({
      convertedDeposit: 150_000_000,
      monthlyRent: 750_000,
      annualRent: 9_000_000,
      conversionRate: 6,
    });
  });

  it("allows converting the full jeonse deposit to monthly rent when the after deposit is zero", () => {
    expect(calculateJeonseToMonthly(300_000_000, 0, 6)).toEqual({
      convertedDeposit: 300_000_000,
      monthlyRent: 1_500_000,
      annualRent: 18_000_000,
      conversionRate: 6,
    });
  });

  it("rounds monthly and annual rent to won", () => {
    expect(calculateJeonseToMonthly(100_000_000, 0, 4.55)).toMatchObject({
      monthlyRent: 379_167,
      annualRent: 4_550_000,
    });
  });

  it("rejects a non-positive original deposit", () => {
    expect(() => calculateJeonseToMonthly(0, 0, 6)).toThrow("전환 전 전세보증금");
  });

  it("rejects an after deposit larger than the original deposit", () => {
    expect(() => calculateJeonseToMonthly(100_000_000, 110_000_000, 6)).toThrow("전환 후 보증금");
  });

  it("rejects a non-positive conversion rate", () => {
    expect(() => calculateJeonseToMonthly(100_000_000, 0, 0)).toThrow("전월세전환율");
  });
});

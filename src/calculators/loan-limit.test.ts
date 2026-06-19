import { calculateLoanLimit } from "./loan-limit";

describe("calculateLoanLimit", () => {
  it("estimates the loan limit by applying the LTV ratio to the jeonse deposit", () => {
    expect(calculateLoanLimit(300_000_000, 80)).toEqual({
      estimatedLimit: 240_000_000,
      requiredOwnFunds: 60_000_000,
      ltvRate: 80,
    });
  });

  it("allows a zero percent LTV and treats the full deposit as own funds", () => {
    expect(calculateLoanLimit(300_000_000, 0)).toEqual({
      estimatedLimit: 0,
      requiredOwnFunds: 300_000_000,
      ltvRate: 0,
    });
  });

  it("rounds estimated values to won for decimal LTV rates", () => {
    expect(calculateLoanLimit(123_456_789, 66.6)).toEqual({
      estimatedLimit: 82_222_221,
      requiredOwnFunds: 41_234_568,
      ltvRate: 66.6,
    });
  });

  it("rejects a non-positive jeonse deposit", () => {
    expect(() => calculateLoanLimit(0, 80)).toThrow("전세보증금");
  });

  it("rejects LTV values below 0 or above 100 percent", () => {
    expect(() => calculateLoanLimit(100_000_000, -1)).toThrow("LTV 비율");
    expect(() => calculateLoanLimit(100_000_000, 100.1)).toThrow("LTV 비율");
  });
});

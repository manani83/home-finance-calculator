import { calculateLoanIncrease } from "./loan-increase";

describe("calculateLoanIncrease", () => {
  it("keeps existing and additional loan rates separate", () => {
    expect(calculateLoanIncrease(100_000_000, 3.6, 20_000_000, 4.8)).toEqual({
      existingMonthlyInterest: 300_000,
      additionalMonthlyInterest: 80_000,
      totalMonthlyInterest: 380_000,
      monthlyIncrease: 80_000,
    });
  });
});

import { calculateLoanInterest } from "./loan-interest";

describe("calculateLoanInterest", () => {
  it("calculates interest-only monthly and annual estimates", () => {
    expect(calculateLoanInterest(100_000_000, 4.2)).toEqual({
      monthlyInterest: 350_000,
      annualInterest: 4_200_000,
    });
  });

  it("rounds the displayed won amount", () => {
    expect(calculateLoanInterest(10_000_000, 3.33).monthlyInterest).toBe(27_750);
  });

  it("rejects negative values", () => {
    expect(() => calculateLoanInterest(-1, 4)).toThrow("대출 원금");
    expect(() => calculateLoanInterest(100_000_000, -1)).toThrow("연 금리");
  });
});

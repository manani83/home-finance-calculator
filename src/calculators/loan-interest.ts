import { requireNonNegative, roundWon } from "./validation";

export type LoanInterestResult = {
  monthlyInterest: number;
  annualInterest: number;
};

export function calculateLoanInterest(
  principal: number,
  annualRate: number,
): LoanInterestResult {
  requireNonNegative(principal, "대출 원금");
  requireNonNegative(annualRate, "연 금리");

  const annualInterest = principal * (annualRate / 100);
  return {
    monthlyInterest: roundWon(annualInterest / 12),
    annualInterest: roundWon(annualInterest),
  };
}

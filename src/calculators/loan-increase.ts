import { calculateLoanInterest } from "./loan-interest";

export type LoanIncreaseResult = {
  existingMonthlyInterest: number;
  additionalMonthlyInterest: number;
  totalMonthlyInterest: number;
  monthlyIncrease: number;
};

export function calculateLoanIncrease(
  existingPrincipal: number,
  existingAnnualRate: number,
  additionalPrincipal: number,
  additionalAnnualRate: number,
): LoanIncreaseResult {
  const existingMonthlyInterest = calculateLoanInterest(
    existingPrincipal,
    existingAnnualRate,
  ).monthlyInterest;
  const additionalMonthlyInterest = calculateLoanInterest(
    additionalPrincipal,
    additionalAnnualRate,
  ).monthlyInterest;

  return {
    existingMonthlyInterest,
    additionalMonthlyInterest,
    totalMonthlyInterest: existingMonthlyInterest + additionalMonthlyInterest,
    monthlyIncrease: additionalMonthlyInterest,
  };
}

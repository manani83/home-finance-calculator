import { requirePositive, roundWon } from "./validation";

export type LoanLimitResult = {
  estimatedLimit: number;
  requiredOwnFunds: number;
  ltvRate: number;
};

export function calculateLoanLimit(
  jeonseDeposit: number,
  ltvRate: number,
): LoanLimitResult {
  requirePositive(jeonseDeposit, "전세보증금");

  if (!Number.isFinite(ltvRate) || ltvRate < 0 || ltvRate > 100) {
    throw new RangeError("LTV 비율은 0 이상 100 이하의 숫자여야 합니다.");
  }

  const estimatedLimit = roundWon(jeonseDeposit * (ltvRate / 100));

  return {
    estimatedLimit,
    requiredOwnFunds: roundWon(jeonseDeposit - estimatedLimit),
    ltvRate,
  };
}

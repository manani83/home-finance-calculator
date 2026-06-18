import { requireNonNegative, requirePositive, roundWon } from "./validation";

export type JeonseToMonthlyResult = {
  convertedDeposit: number;
  monthlyRent: number;
  annualRent: number;
  conversionRate: number;
};

export function calculateJeonseToMonthly(
  originalDeposit: number,
  afterDeposit: number,
  conversionRate: number,
): JeonseToMonthlyResult {
  requirePositive(originalDeposit, "전환 전 전세보증금");
  requireNonNegative(afterDeposit, "전환 후 보증금");
  requirePositive(conversionRate, "전월세전환율");

  if (afterDeposit > originalDeposit) {
    throw new RangeError("전환 후 보증금은 전환 전 전세보증금보다 클 수 없습니다.");
  }

  const convertedDeposit = originalDeposit - afterDeposit;
  const annualRent = roundWon(convertedDeposit * (conversionRate / 100));
  const monthlyRent = roundWon(annualRent / 12);

  return {
    convertedDeposit,
    monthlyRent,
    annualRent,
    conversionRate,
  };
}

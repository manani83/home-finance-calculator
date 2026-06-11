import { requireNonNegative, requirePositive } from "./validation";

export type JeonseIncreaseResult = {
  increaseAmount: number;
  increaseRate: number;
  exceedsFivePercent: boolean;
};

export function calculateJeonseIncrease(
  existingDeposit: number,
  newDeposit: number,
): JeonseIncreaseResult {
  requirePositive(existingDeposit, "기존 보증금");
  requireNonNegative(newDeposit, "신규 보증금");

  const increaseAmount = newDeposit - existingDeposit;
  const increaseRate = (increaseAmount / existingDeposit) * 100;

  return {
    increaseAmount,
    increaseRate,
    exceedsFivePercent: increaseRate > 5,
  };
}

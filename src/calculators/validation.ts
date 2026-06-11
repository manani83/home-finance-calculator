export function requireNonNegative(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${label}은(는) 0 이상의 숫자여야 합니다.`);
  }
}

export function requirePositive(value: number, label: string): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label}은(는) 0보다 큰 숫자여야 합니다.`);
  }
}

export function roundWon(value: number): number {
  return Math.round(value);
}

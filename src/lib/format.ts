export function formatWon(value: number): string {
  return `${new Intl.NumberFormat("ko-KR").format(value)}원`;
}

export function formatKoreanAmount(value: number): string {
  if (!Number.isFinite(value) || value === 0) return "0원";
  const eok = Math.floor(Math.abs(value) / 100_000_000);
  const man = Math.floor((Math.abs(value) % 100_000_000) / 10_000);
  const sign = value < 0 ? "-" : "";
  return `${sign}${eok ? `${eok}억 ` : ""}${man ? `${man}만원` : eok ? "원" : `${Math.abs(value)}원`}`.trim();
}

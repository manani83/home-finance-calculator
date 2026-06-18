export function formatWon(value: number): string {
  return `${new Intl.NumberFormat("ko-KR").format(value)}원`;
}

export function formatKoreanAmount(value: number): string {
  if (!Number.isFinite(value) || value === 0) return "0원";
  const absoluteValue = Math.abs(Math.trunc(value));
  const eok = Math.floor(absoluteValue / 100_000_000);
  const man = Math.floor((absoluteValue % 100_000_000) / 10_000);
  const won = absoluteValue % 10_000;
  const sign = value < 0 ? "-" : "";
  const parts = [
    eok ? `${eok.toLocaleString("ko-KR")}억` : "",
    man ? `${man.toLocaleString("ko-KR")}만` : "",
  ].filter(Boolean);

  if (parts.length > 0) {
    const majorUnits = `${sign}${parts.join(" ")}`;
    return won ? `${majorUnits} ${won.toLocaleString("ko-KR")}원` : `${majorUnits} 원`;
  }

  return `${sign}${won.toLocaleString("ko-KR")}원`;
}

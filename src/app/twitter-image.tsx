import { ImageResponse } from "next/og";

export const alt = "주거금융계산기 - 공식 출처 기반 전세 계산기와 가이드";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px", background: "#f4f0e8", color: "#17221b", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", fontSize: 28, color: "#365b45", marginBottom: 28 }}>공식 출처 기반 주거금융 도구</div>
      <div style={{ display: "flex", fontSize: 72, fontWeight: 800, letterSpacing: "-3px" }}>주거금융계산기</div>
      <div style={{ display: "flex", fontSize: 34, lineHeight: 1.45, marginTop: 30 }}>전세보증금과 전세대출 예상 이자를<br />계산 근거와 공식 원문과 함께 확인하세요.</div>
    </div>,
    size,
  );
}

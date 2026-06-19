import { ImageResponse } from "next/og";
import { getGuide } from "@/lib/content";
import { siteName } from "@/lib/site-config";
import { socialImageSize } from "@/lib/social-metadata";

const calculatorSocialContent: Record<string, { title: string; description: string; eyebrow: string }> = {
  "jeonse-increase": {
    eyebrow: "계산기",
    title: "전세보증금 5% 인상 계산기",
    description: "기존 전세보증금 기준 인상액과 인상 후 보증금을 예상 계산값으로 확인합니다.",
  },
  "loan-interest": {
    eyebrow: "계산기",
    title: "전세대출 월 이자 계산기",
    description: "전세대출 원금과 연 금리로 월 예상 이자와 연 예상 이자를 계산합니다.",
  },
  "jeonse-to-monthly": {
    eyebrow: "계산기",
    title: "전월세 전환 계산기",
    description: "전세보증금을 월세로 전환할 때 전월세전환율 기준 예상 월세를 계산합니다.",
  },
  "loan-limit": {
    eyebrow: "계산기",
    title: "전세대출 한도 추정 계산기",
    description: "전세보증금과 LTV 비율로 예상 대출 한도와 자기 자금을 계산합니다.",
  },
  "loan-increase": {
    eyebrow: "계산기",
    title: "전세대출 증액 계산기",
    description: "증액 전후의 월 예상 이자 차이와 추가 부담액을 비교합니다.",
  },
};

function getSocialContent(slug: string | null) {
  if (slug && calculatorSocialContent[slug]) return calculatorSocialContent[slug];

  const guide = slug ? getGuide(slug) : null;
  if (guide) {
    return {
      eyebrow: "가이드",
      title: guide.title,
      description: guide.description,
    };
  }

  return {
    eyebrow: "공식 출처 기반 주거금융 도구",
    title: siteName,
    description: "전세보증금과 전세대출 예상 이자를 계산 근거와 공식 원문과 함께 확인하세요.",
  };
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const content = getSocialContent(searchParams.get("slug"));

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px", background: "#f4f0e8", color: "#17221b", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", fontSize: 28, color: "#365b45", marginBottom: 28 }}>{content.eyebrow}</div>
      <div style={{ display: "flex", fontSize: 70, fontWeight: 800, lineHeight: 1.12 }}>{content.title}</div>
      <div style={{ display: "flex", fontSize: 32, lineHeight: 1.45, marginTop: 30, maxWidth: 980 }}>{content.description}</div>
      <div style={{ display: "flex", fontSize: 24, color: "#365b45", marginTop: 54 }}>{siteName}</div>
    </div>,
    socialImageSize,
  );
}

import type { Metadata } from "next";
import { GuidesList, type GuideCardItem } from "./guides-list";
import { getGuides } from "@/lib/content";

export const metadata: Metadata = { title: "주거금융 가이드", description: "공식 출처를 기준으로 작성한 전세와 주거금융 가이드입니다.", alternates: { canonical: "/guides" } };

const guideCardOverrides: Record<string, Partial<Pick<GuideCardItem, "title" | "description" | "category" | "readingTime">>> = {
  "dsr-dti-jeonse-loan": {
    title: "DSR·DTI 계산, 내 대출 한도에 어떻게 영향을 주나요?",
    description: "DSR·DTI가 대출 한도와 상담 준비 자료에 어떤 영향을 주는지 빠르게 확인합니다.",
    category: "대출",
  },
  "guarantee-insurance-rejection": {
    title: "전세보증보험 가입 거절 사유와 대처 방법",
    description: "반환보증 가입이 어려울 수 있는 조건과 신청 전 점검할 항목을 정리합니다.",
    category: "보증",
  },
  "preferential-interest-rate": {
    title: "우대금리 조건 확인하는 방법 — 은행별 차이점",
    description: "우대금리 조건을 실제 적용 금리와 구분하고 은행별 차이를 확인하는 방법을 봅니다.",
    category: "금리",
  },
};

const guideListTitles: Record<string, string> = {
  "hug-hf-sgi-comparison": "HUG·HF·SGI 중 뭐가 다른가요?",
  "lease-renewal-right": "계약갱신청구권 쓰면 보증금은 얼마나 오르나요?",
  "loan-extension-vs-refinance": "전세대출 연장과 대환, 뭐부터 확인해야 하나요?",
};

const defaultCategories: Record<string, GuideCardItem["category"]> = {
  "hug-hf-sgi-comparison": "보증",
  "lease-renewal-right": "계약",
  "loan-extension-vs-refinance": "대출",
};

function buildGuideCards(): GuideCardItem[] {
  return getGuides().map((guide) => {
    const override = guideCardOverrides[guide.slug];
    return {
      slug: guide.slug,
      title: override?.title ?? guideListTitles[guide.slug] ?? guide.title,
      description: override?.description ?? guide.description,
      category: override?.category ?? guide.category ?? defaultCategories[guide.slug] ?? "대출",
      readingTime: override?.readingTime ?? "약 3분",
      updatedAt: guide.updatedAt,
    };
  });
}

export default async function GuidesPage() {
  return <main className="page-container"><div className="section-heading"><span className="eyebrow">공식 출처 기반</span><h1>주거금융 가이드</h1><p>게시일보다 최근 확인일과 공식 원문을 함께 확인하세요.</p></div><GuidesList guides={buildGuideCards()} /></main>;
}

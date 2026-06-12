import type { Metadata } from "next";
import { contactEmail } from "@/lib/site-config";

export const metadata: Metadata = { title: "문의", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <main className="page-container">
      <article className="policy-page">
        <span className="eyebrow">Contact</span>
        <h1>문의</h1>
        <p>잘못된 정보, 끊어진 공식 출처 링크, 계산 오류 또는 개인정보 관련 요청은 아래 이메일로 알려주세요.</p>
        <p><a className="primary-link" href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
        <h2>문의할 때 주의할 점</h2>
        <p>주민등록번호, 계좌번호, 신용점수, 소득자료, 계약서 원본 등 개인정보와 금융정보는 보내지 마세요. 이 사이트는 개인별 대출 상담이나 승인 가능성 판단을 제공하지 않습니다.</p>
      </article>
    </main>
  );
}

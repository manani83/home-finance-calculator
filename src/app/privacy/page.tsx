import type { Metadata } from "next";
import { contactEmail } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="page-container">
      <article className="policy-page">
        <span className="eyebrow">Privacy</span>
        <h1>개인정보처리방침</h1>
        <p>시행일: 2026년 6월 12일</p>

        <h2>계산기 입력값</h2>
        <p>계산기에 입력한 보증금, 대출금과 금리는 현재 브라우저에서만 계산합니다. 해당 입력값을 서버, 쿠키, 로컬 스토리지 또는 분석 도구로 전송하거나 저장하지 않습니다.</p>

        <h2>이메일 문의 정보</h2>
        <p>문의 폼은 운영하지 않습니다. 사용자가 <a className="text-link" href={`mailto:${contactEmail}`}>{contactEmail}</a>로 직접 보낸 이메일 주소와 메시지는 문의 확인과 답변 목적으로 이용합니다. 관련 법령상 보관 의무가 있거나 분쟁 대응에 필요한 경우를 제외하고 목적 달성 후 삭제합니다.</p>

        <h2>Google AdSense와 광고 데이터</h2>
        <p>광고가 활성화된 경우 Google과 제3자 광고 공급업체는 광고 게재, 광고 효과 측정, 부정 사용 방지와 광고 개인 최적화를 위해 쿠키를 사용하거나 읽을 수 있습니다. 브라우저는 방문한 페이지 URL과 IP 주소 등의 정보를 Google에 자동으로 전송할 수 있습니다.</p>
        <p>Google과 광고 파트너는 사용자의 이 사이트 이전 방문 기록 또는 인터넷상의 다른 사이트 방문 기록을 바탕으로 개인 맞춤 광고를 게재할 수 있습니다. 개인 맞춤 광고를 사용하지 않더라도 현재 페이지의 내용이나 대략적인 위치 등을 바탕으로 광고가 표시될 수 있습니다.</p>
        <p>Google이 파트너 사이트에서 정보를 처리하는 방식은 <a className="text-link" href="https://policies.google.com/technologies/partner-sites?hl=ko" target="_blank" rel="noreferrer">Google 서비스를 사용하는 사이트 또는 앱의 정보 사용 안내</a>에서 확인할 수 있습니다.</p>

        <h2>광고 설정과 쿠키 관리</h2>
        <p>사용자는 <a className="text-link" href="https://adssettings.google.com/" target="_blank" rel="noreferrer">Google 광고 설정</a>에서 개인 맞춤 광고에 사용되는 정보를 확인하거나 개인 맞춤 광고를 사용 중지할 수 있습니다. 브라우저 설정에서도 제3자 쿠키를 차단하거나 기존 쿠키를 삭제할 수 있습니다.</p>

        <h2>지역별 동의 관리</h2>
        <p>EEA, 영국 또는 스위스 사용자에게 Google 광고를 게재하는 경우 Google 인증 동의 관리 플랫폼(CMP)을 통해 필요한 동의 선택권을 제공합니다. 인증 CMP 설정이 적용되지 않은 트래픽에는 개인 맞춤 광고를 게재하지 않습니다.</p>

        <h2>제3자 광고 사업자</h2>
        <p>현재 광고 공급업체는 Google AdSense입니다. 다른 광고 네트워크를 추가하는 경우 해당 사업자, 데이터 이용 목적과 선택 해제 방법을 이 방침에 반영합니다.</p>

        <h2>문의와 방침 변경</h2>
        <p>개인정보 관련 문의는 <a className="text-link" href={`mailto:${contactEmail}`}>{contactEmail}</a>로 보내주세요. 수집 항목이나 외부 서비스가 변경되면 실제 운영 내용에 맞춰 이 방침과 시행일을 갱신합니다.</p>
      </article>
    </main>
  );
}

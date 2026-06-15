"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import { useSyncExternalStore } from "react";

type AnalyticsConsentValue = "granted" | "denied";

const consentStorageKey = "home-finance-analytics-consent";
const consentChangeEvent = "home-finance-analytics-consent-change";

function readStoredConsent(): AnalyticsConsentValue | null {
  try {
    const value = window.localStorage.getItem(consentStorageKey);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

function storeConsent(value: AnalyticsConsentValue) {
  try {
    window.localStorage.setItem(consentStorageKey, value);
  } catch {
    // The current visit still follows the user's choice when storage is unavailable.
  }
  window.dispatchEvent(new Event(consentChangeEvent));
}

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(consentChangeEvent, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(consentChangeEvent, onStoreChange);
  };
}

export function AnalyticsConsent({ measurementId }: { measurementId?: string }) {
  const consent = useSyncExternalStore(subscribeToConsent, readStoredConsent, () => undefined);

  if (!measurementId || consent === undefined) return null;
  if (consent === "granted") return <GoogleAnalytics gaId={measurementId} />;
  if (consent === "denied") return null;

  const choose = (value: AnalyticsConsentValue) => {
    storeConsent(value);
  };

  return (
    <section className="analytics-consent" role="region" aria-label="방문 분석 설정">
      <div>
        <strong>방문 분석 사용 여부를 선택해 주세요</strong>
        <p>
          동의한 경우에만 Google Analytics를 사용합니다. 계산기 입력값과 계산 결과는 전송하지 않습니다.
          {" "}<Link href="/privacy">개인정보처리방침</Link>
        </p>
      </div>
      <div className="analytics-consent-actions">
        <button type="button" className="secondary-button" onClick={() => choose("denied")}>분석 수집 거부</button>
        <button type="button" className="primary-button" onClick={() => choose("granted")}>분석 수집 동의</button>
      </div>
    </section>
  );
}

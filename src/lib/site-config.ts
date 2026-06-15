export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://shimmering-starship-236730.netlify.app").replace(/\/$/, "");
export const siteName = "주거금융계산기";
export const siteDescription = "전세보증금과 전세대출 이자를 공식 출처와 함께 확인하는 계산기입니다.";
export const siteLocale = "ko_KR";
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "manani8381@gmail.com";

type VerificationValues = {
  google?: string;
  naver?: string;
  bing?: string;
};

export function buildVerificationMetadata(values: VerificationValues) {
  const other = Object.fromEntries([
    ["naver-site-verification", values.naver],
    ["msvalidate.01", values.bing],
  ].filter((entry): entry is [string, string] => Boolean(entry[1])));

  if (!values.google && Object.keys(other).length === 0) return undefined;

  return {
    ...(values.google ? { google: values.google } : {}),
    ...(Object.keys(other).length > 0 ? { other } : {}),
  };
}

export function absoluteUrl(pathname = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteUrl}${normalizedPath}`;
}

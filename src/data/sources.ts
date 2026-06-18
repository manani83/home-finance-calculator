export type OfficialSource = {
  id: string;
  organization: string;
  title: string;
  url: string;
  checkedAt: string;
};

export const officialSources = [
  {
    id: "hf-jeonse-guarantee",
    organization: "한국주택금융공사(HF)",
    title: "전세자금보증",
    url: "https://www.hf.go.kr/ko/sub02/sub02_01_02_01.do",
    checkedAt: "2026-06-11",
  },
  {
    id: "hug-return-guarantee",
    organization: "주택도시보증공사(HUG)",
    title: "전세보증금반환보증",
    url: "https://www.khug.or.kr/jeonse/web/s01/s010101.jsp",
    checkedAt: "2026-06-11",
  },
  {
    id: "sgi-home",
    organization: "SGI서울보증",
    title: "SGI서울보증 공식 홈페이지",
    url: "https://www.sgic.co.kr/",
    checkedAt: "2026-06-11",
  },
  {
    id: "law-housing-lease-protection",
    organization: "국가법령정보센터",
    title: "주택임대차보호법",
    url: "https://www.law.go.kr/법령/주택임대차보호법",
    checkedAt: "2026-06-11",
  },
  {
    id: "law-housing-lease-protection-article-7-2",
    organization: "국가법령정보센터",
    title: "주택임대차보호법 제7조의2",
    url: "https://www.law.go.kr/법령/주택임대차보호법/제7조의2",
    checkedAt: "2026-06-18",
  },
  {
    id: "fss-loan-consumer-guide",
    organization: "금융감독원 금융소비자정보포털 파인",
    title: "금융상품 한눈에 및 금융소비자 정보",
    url: "https://fine.fss.or.kr/",
    checkedAt: "2026-06-11",
  },
  {
    id: "fsc-household-loan-policy",
    organization: "금융위원회",
    title: "가계대출 및 대출규제 관련 공식 정책 자료",
    url: "https://www.fsc.go.kr/",
    checkedAt: "2026-06-17",
  },
  {
    id: "kfb-consumer-loan-rates",
    organization: "은행연합회 소비자포털",
    title: "대출금리 비교공시",
    url: "https://portal.kfb.or.kr/",
    checkedAt: "2026-06-17",
  },
] as const satisfies readonly OfficialSource[];

export const officialSourceMap: ReadonlyMap<string, OfficialSource> = new Map(
  officialSources.map((source) => [source.id, source]),
);

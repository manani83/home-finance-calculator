# 검색 노출 기술 기반 설계

## 목표

운영 도메인 `https://shimmering-starship-236730.netlify.app`을 기준으로 Google, 네이버, Bing 및 AI 검색 서비스가 사이트를 안정적으로 발견하고 페이지 의미를 해석할 수 있는 기술 기반을 마련한다.

이번 작업은 검색 노출을 보장하지 않는다. 검색엔진 소유권 인증과 사이트맵 제출은 각 서비스 계정에서 사람이 완료해야 하며, Codex는 운영 배포를 수행하지 않는다.

## 범위

### 포함

- 운영 도메인을 기본 canonical URL로 설정
- Google Search Console, 네이버 서치어드바이저, Bing Webmaster Tools 인증 메타태그를 환경변수로 지원
- `robots.txt`에서 일반 검색 크롤러와 OAI-SearchBot의 검색 접근 허용
- 실제 공개 URL과 수정일을 반영하는 sitemap 유지
- 사이트 공통 `WebSite`, `Organization` JSON-LD 추가
- 가이드 페이지 `Article`, `BreadcrumbList` JSON-LD 추가
- 계산기 페이지 `WebApplication`, `BreadcrumbList` JSON-LD 추가
- 페이지별 Open Graph 및 Twitter 메타데이터 보강
- 기본 favicon 및 공유 이미지 제공
- IndexNow 키 파일과 URL 제출 스크립트 준비
- 검색엔진 등록과 검증을 위한 운영 체크리스트 작성
- 기술 SEO 동작에 대한 자동 테스트 추가

### 제외

- 신규 금융 콘텐츠 작성
- 기존 금융 설명이나 계산식 변경
- 검색엔진 계정 생성 및 소유권 인증 완료
- Search Console, 네이버, Bing에 실제 제출
- 운영 배포
- 방문자 입력값, 쿠키, 로컬 스토리지 또는 분석 도구를 사용하는 추적 기능

## 구성

### 사이트 설정

`src/lib/site-config.ts`에서 운영 도메인, 사이트명, 설명을 공통 값으로 관리한다. `NEXT_PUBLIC_SITE_URL`이 있으면 이를 우선하고, 없으면 운영 Netlify 도메인을 사용한다. URL 끝의 슬래시는 제거해 canonical과 sitemap의 중복을 방지한다.

검색엔진 인증값은 다음 공개 환경변수로 받는다.

- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`

값이 없으면 빈 인증 태그를 출력하지 않는다.

### 메타데이터

루트 레이아웃에 기본 Open Graph, Twitter 카드, robots 지시자와 검색엔진 인증값을 설정한다. 각 페이지는 고유 제목, 설명, canonical URL을 유지하고 대표 이미지가 필요한 경우 공통 공유 이미지를 상속한다.

검색 결과용 favicon과 공유 이미지는 Next.js 메타데이터 파일 규칙을 사용해 생성하거나 정적 파일로 제공한다. 이미지는 사이트의 실제 성격을 과장하지 않고 서비스명과 공식 출처 기반 계산기라는 설명만 포함한다.

### 구조화 데이터

JSON-LD는 화면에 실제 표시되는 정보만 사용한다.

- 루트: `WebSite`, `Organization`
- 가이드 상세: `Article`, `BreadcrumbList`
- 계산기 상세: `WebApplication`, `BreadcrumbList`

가이드의 `dateModified`는 frontmatter의 `updatedAt`을 사용한다. 작성자 개인 경력이 검증되지 않았으므로 개인 전문가를 만들지 않고 사이트 운영 조직을 publisher로 사용한다. 계산기 구조화 데이터에는 무료 웹 도구라는 성격과 현재 페이지 URL을 명시하되 금융상품이나 심사 결과를 제공한다고 표현하지 않는다.

JSON-LD 직렬화는 재사용 가능한 컴포넌트로 분리하고 `<` 문자를 이스케이프해 스크립트 문맥 삽입 위험을 줄인다.

### 크롤링과 발견

`robots.txt`는 전체 공개 페이지를 허용하고 sitemap URL을 제공한다. OAI-SearchBot은 명시적으로 허용한다. GPTBot의 학습 허용 여부는 검색 노출과 별개이므로 이번 변경에서는 기존 전체 허용 상태를 유지하며 운영자가 나중에 독립적으로 결정할 수 있도록 문서화한다.

sitemap에는 공개 정적 페이지와 `reviewStatus: reviewed` 가이드만 포함한다. 가이드는 각 `updatedAt`을 수정일로 사용하고, 정적 페이지는 코드에 관리되는 사이트 수정일을 사용한다.

### IndexNow

IndexNow 키는 저장소에 고정하지 않고 `INDEXNOW_KEY` 환경변수로 받는다. 키 파일은 요청 시 키 문자열만 반환하는 공개 경로로 제공한다. 제출 스크립트는 sitemap 기반 공개 URL 목록을 IndexNow API로 전송하되 명시적으로 실행했을 때만 네트워크 요청을 수행한다.

키가 없거나 형식이 잘못된 경우 제출하지 않고 명확한 오류로 종료한다. 배포 과정에서 자동 제출하지 않아 운영 변경과 사람의 검토 절차를 분리한다.

### 등록 절차

문서에는 다음 순서를 기록한다.

1. Netlify에 환경변수와 최종 빌드 반영
2. Google Search Console URL-prefix 속성 생성 및 메타태그 인증
3. 네이버 서치어드바이저 사이트 등록 및 메타태그 인증
4. Bing Webmaster Tools 사이트 등록 및 메타태그 인증
5. 각 서비스에 `/sitemap.xml` 제출
6. 대표 URL 색인 가능 여부 확인
7. IndexNow 키 설정 후 제출 스크립트 실행
8. Rich Results Test와 URL 검사 도구로 구조화 데이터 및 렌더링 확인

## 오류 처리

- 잘못된 사이트 URL은 구성 단계에서 명확히 실패시키거나 안전한 운영 기본값을 사용한다.
- 인증 환경변수가 없을 때 사이트 빌드는 정상 동작해야 한다.
- 존재하지 않는 가이드는 기존처럼 404를 반환하며 JSON-LD를 만들지 않는다.
- IndexNow 키가 없으면 외부 요청 없이 실패한다.
- 구조화 데이터 값은 canonical URL 생성 함수로 일관되게 구성한다.

## 테스트

- 운영 기본 도메인과 trailing slash 정규화 테스트
- 인증값이 있을 때와 없을 때 metadata 테스트
- robots와 sitemap이 운영 도메인을 사용하는지 테스트
- 가이드 Article/Breadcrumb JSON-LD 필드 테스트
- 계산기 WebApplication/Breadcrumb JSON-LD 필드 테스트
- JSON-LD 안전 직렬화 테스트
- IndexNow 키 검증과 요청 데이터 생성 테스트
- 기존 전체 테스트와 콘텐츠 검증, lint, typecheck, build 실행

## 완료 조건

- 콘텐츠와 계산식 변경이 없다.
- 인증값이 없어도 로컬 및 배포 빌드가 성공한다.
- 운영 도메인 기준 canonical, robots, sitemap, 구조화 데이터가 일관된다.
- 검색엔진 등록에 필요한 환경변수와 사람이 수행할 단계가 문서화된다.
- `npm test`, `npm run lint`, `npm run typecheck`, `npm run validate:content`, `npm run build`가 모두 통과한다.

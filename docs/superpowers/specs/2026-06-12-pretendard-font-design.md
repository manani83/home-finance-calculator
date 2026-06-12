# Pretendard 전역 폰트 적용 설계

## 목표

주거금융계산기의 모든 한글, 숫자, 입력 요소에 Pretendard Variable을 적용한다. 기존 색상, 크기, 굵기 계층은 유지하면서 숫자 가독성과 긴 금융 안내문의 읽기 편의성을 높인다.

## 적용 방식

- Pretendard Variable WOFF2 파일을 프로젝트 내부에 저장한다.
- Next.js `next/font/local`로 글꼴을 등록한다.
- 가변 굵기 범위는 Pretendard 공식 권장값인 `45 920`으로 지정한다.
- `display: swap`을 사용해 글꼴 다운로드 중에도 텍스트가 표시되게 한다.
- Root Layout의 `body`에 생성된 폰트 클래스를 적용한다.
- CSS의 전역 `font-family`는 Next.js가 생성한 CSS 변수와 시스템 폰트 대체 목록을 사용한다.

## 범위

- 본문, 페이지 제목, 섹션 제목, 내비게이션, 카드, 버튼, 입력창과 계산 결과에 동일한 Pretendard 패밀리를 적용한다.
- 기존 글자 크기, 색상, 줄 높이와 굵기 값은 변경하지 않는다.
- 콘텐츠, 계산식, 금융 안내 문구와 개인정보 처리 방식은 변경하지 않는다.

## 개인정보와 성능

- Google Fonts나 외부 CDN에 런타임 요청을 보내지 않는다.
- 글꼴 파일은 사이트와 함께 제공하며 방문자 정보가 폰트 제공업체로 전달되지 않게 한다.
- Next.js 폰트 최적화로 자체 호스팅하고 레이아웃 이동을 줄인다.

## 대체 글꼴

Pretendard를 불러오지 못한 경우 `-apple-system`, `BlinkMacSystemFont`, `system-ui`, `Noto Sans KR`, `Malgun Gothic`, `sans-serif` 순서로 대체한다.

## 검증

- 폰트 클래스와 전역 CSS 연결을 자동 테스트한다.
- 계산기, 가이드, 정책 페이지에서 Pretendard 적용 여부를 브라우저 계산 스타일로 확인한다.
- 데스크톱과 390px 모바일에서 제목 줄바꿈과 가로 넘침을 확인한다.
- `npm test`, `npm run lint`, `npm run typecheck`, `npm run validate:content`, `npm run build`를 실행한다.

## 출처

- Pretendard 공식 저장소: https://github.com/orioncactus/pretendard
- Next.js Font Optimization: https://nextjs.org/docs/app/getting-started/fonts

Pretendard는 SIL Open Font License로 배포되며 글꼴 단독 판매를 제외한 상업적 사용, 수정과 재배포가 가능하다. 확인일: 2026-06-12.

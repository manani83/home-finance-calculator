# 검색엔진 등록 절차

대상 운영 URL은 `https://shimmering-starship-236730.netlify.app`이다. 계정 생성, 소유권 인증, 운영 배포와 색인 요청은 사람이 직접 확인하고 수행한다.

## 1. Netlify 환경변수

Netlify 사이트 설정에서 다음 값을 등록한다. 검색엔진에서 인증 코드를 발급받기 전에는 빈 상태로 두어도 빌드된다.

| 환경변수 | 입력할 값 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://shimmering-starship-236730.netlify.app` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google HTML 태그의 `content` 값 |
| `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` | 네이버 HTML 태그의 `content` 값 |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing HTML 태그의 `content` 값 |
| `INDEXNOW_KEY` | 직접 생성한 8~128자 16진수 키 |

환경변수를 추가하거나 변경한 뒤 Netlify에서 사람이 Deploy를 실행하고 배포 결과를 검토한다. Codex는 운영 배포를 수행하지 않는다.

## 2. Google Search Console

1. [Google Search Console](https://search.google.com/search-console/about)에 접속한다.
2. `URL 접두어` 속성에 `https://shimmering-starship-236730.netlify.app`을 입력한다.
3. `HTML 태그` 인증 방법을 선택한다.
4. `<meta name="google-site-verification" content="...">`의 `content` 값만 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`에 등록한다.
5. Netlify 배포 후 페이지 소스에서 메타태그를 확인하고 Search Console에서 인증한다.
6. `Sitemaps`에서 `https://shimmering-starship-236730.netlify.app/sitemap.xml`을 제출한다.
7. URL 검사에서 홈, 계산기 1개, 가이드 1개의 색인 가능 여부를 확인한다.

## 3. 네이버 서치어드바이저

1. [네이버 서치어드바이저](https://searchadvisor.naver.com/)에서 사이트를 등록한다.
2. `HTML 태그` 소유확인을 선택한다.
3. `<meta name="naver-site-verification" content="...">`의 `content` 값만 `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`에 등록한다.
4. Netlify 배포 후 소유확인을 완료한다.
5. 요청 메뉴에서 `https://shimmering-starship-236730.netlify.app/sitemap.xml`을 제출한다.
6. robots.txt 수집과 사이트 진단 결과를 확인한다.

## 4. Bing Webmaster Tools

1. [Bing Webmaster Tools](https://www.bing.com/webmasters/about)에 사이트를 추가한다.
2. HTML 메타태그 인증을 선택한다.
3. `<meta name="msvalidate.01" content="...">`의 `content` 값만 `NEXT_PUBLIC_BING_SITE_VERIFICATION`에 등록한다.
4. Netlify 배포 후 인증을 완료한다.
5. `https://shimmering-starship-236730.netlify.app/sitemap.xml`을 제출한다.

## 5. IndexNow

`INDEXNOW_KEY`는 8~128자의 16진수 문자열로 설정한다. 예시는 실제 운영 키로 사용하지 않는다.

배포 후 다음 URL이 키 문자열만 반환하는지 확인한다.

```text
https://shimmering-starship-236730.netlify.app/<INDEXNOW_KEY>.txt
```

사람이 공개 URL과 배포 상태를 확인한 다음 명시적으로 제출한다.

```bash
INDEXNOW_KEY=<발급한-키> npm run indexnow:submit
```

이 명령은 sitemap과 동일한 공개 URL 목록을 `https://api.indexnow.org/indexnow`에 한 번 전송한다. Google은 IndexNow 제출 대상이 아니므로 Search Console의 sitemap과 URL 검사를 별도로 사용한다.

## 6. 배포 후 확인

- `/robots.txt`에 전체 허용, `OAI-SearchBot` 허용과 sitemap URL이 표시되는지 확인
- `/sitemap.xml`에 홈, 계산기, 정책 페이지와 검토 완료 가이드만 포함되는지 확인
- 페이지 소스에 canonical과 검색엔진 인증 메타태그가 있는지 확인
- [Google Rich Results Test](https://search.google.com/test/rich-results)에서 가이드와 계산기 URL 검사
- Open Graph 이미지 URL이 HTTP 200과 `image/png`으로 응답하는지 확인
- 금융 콘텐츠 또는 계산식 변경 없이 기술 메타데이터만 반영됐는지 PR에서 사람이 검토

## 크롤러 정책

`OAI-SearchBot`은 ChatGPT 검색 결과 노출을 위해 허용한다. `GPTBot`은 모델 학습용 크롤러로 검색 노출과 목적이 다르다. 현재는 일반 허용 규칙을 따르며, 학습 허용 여부를 변경할 경우 [OpenAI 크롤러 문서](https://developers.openai.com/api/docs/bots)를 확인해 별도 PR로 검토한다.

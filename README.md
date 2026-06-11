# 주거금융계산기

전세보증금과 전세대출 이자를 브라우저에서 계산하고, 공식 출처 기반 가이드를 제공하는 Next.js 프로젝트입니다. 계산 입력값은 저장하거나 서버로 전송하지 않습니다.

## 로컬 실행

```bash
npm install
cp .env.example .env.local
npm run dev
```

`http://localhost:3000`에서 확인합니다. 문의 이메일과 AdSense 값은 실제 운영 값이 준비된 경우에만 `.env.local`과 Vercel 환경변수에 설정합니다.

## 검증

```bash
npm test
npm run lint
npm run typecheck
npm run validate:content
npm run build
```

## 콘텐츠 운영

가이드는 `content/guides`의 MDX 파일이며 공식 출처는 `src/data/sources.ts`에 등록합니다. 새 문서는 검증 명령, PR, Vercel Preview와 사람의 출처 검토를 거쳐 병합합니다.

## Vercel

저장소를 Vercel에 연결하고 `main`을 Production 브랜치로 설정합니다. PR Preview에서 계산, 출처 링크, 정책 페이지를 확인합니다.

환경변수:

- `NEXT_PUBLIC_SITE_URL`: 실제 canonical 도메인
- `NEXT_PUBLIC_CONTACT_EMAIL`: 공개 문의 주소
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID`: 승인 후 발급된 AdSense 클라이언트 ID
- `NEXT_PUBLIC_ADSENSE_SLOT_ID`: 광고 슬롯 ID

광고 환경변수가 없으면 광고 스크립트와 슬롯은 렌더링되지 않습니다.


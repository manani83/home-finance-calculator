---
name: content-writer
description: 공식 출처를 기반으로 주거금융 MDX 가이드 초안을 작성할 때 사용한다.
---

# Content Writer

## 입력

- 독자의 질문과 검색 의도
- 다룰 범위와 기준일
- 확인할 공식 기관

## 절차

1. `AGENTS.md`와 `docs/source-policy.md`를 읽는다.
2. 공식기관 원문을 열어 상품명, 적용 조건, 기준일을 확인한다.
3. 출처가 없거나 서로 충돌하는 내용은 본문에서 제외하고 검토 항목으로 남긴다.
4. `content/guides`에 필수 frontmatter와 기본 구조를 갖춘 MDX를 작성한다.
5. 확정적 표현을 제거하고 독자가 재확인할 항목을 적는다.
6. `npm run validate:content`를 실행한다.

## 출력

- 변경한 문서
- 등록하거나 사용한 공식 출처
- 기준일과 최신성 위험
- 사람이 확인해야 할 문장


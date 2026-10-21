<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 응답 언어

- 모든 답변은 반드시 한국어로 작성한다. 도구 출력이 영어여도, 긴 보고서나 표를 쓸 때도 예외 없이 한국어로 쓴다.
- 코드, 명령어, 파일 경로, 커밋 메시지는 원문 그대로 둔다.

## 프로젝트 개요

- Next.js 16 App Router, React 19, Tailwind CSS 4, MDX로 만든 개인 블로그. Vercel에 배포한다.
- 패키지 매니저는 Yarn 4(`corepack yarn`)이고 `nodeLinker: node-modules`를 쓴다. Turbopack이 Yarn PnP를 지원하지 않기 때문이다.
- 글은 `contents/<category>/<id>.mdx`에 있고, 파일 안의 `export const metadata = { title, description, date }`를 읽는다. `date`는 한국 시간 기준 `'YYYY-MM-DD HH:mm:ss'` 형식이다(`utils/date.ts`의 `parseDate`).
- 글 이미지는 `contents/image/<category>/<id>/`에 두고 MDX에서 import 한다.
- 카테고리 목록은 `constants/header.ts`에서 관리한다. 글이 없는 카테고리는 페이지를 만들지 않는다.

## 지켜야 할 규칙

- 모든 페이지는 빌드할 때 정적으로 만든다. 루트 레이아웃의 `export const dynamic = 'error'` 때문에 `headers()`, `cookies()` 같은 요청 의존 코드를 쓰면 빌드가 실패한다. 이 설정을 지우지 않는다.
- `typedRoutes`가 켜져 있다. 내부 링크와 `router.push`는 실제 경로만 쓴다. MDX 본문 링크처럼 임의의 문자열만 `as Route`로 넘긴다.
- 본문 폰트는 `pretendard` 패키지의 dynamic subset CSS(`app/layout.tsx`)로 제공한다. `PretendardStd`는 한글이 없는 버전이므로 쓰지 않는다.
- 공유 이미지(`opengraph-image.tsx`)는 `utils/og.tsx`의 `createOgImage`로 만든다. `next/og`는 woff2를 읽지 못하므로 `pretendard` 패키지의 정적 woff를 쓰고, 외부 요청을 막기 위해 이미지 문구에서 이모지를 뺀다.
- `yarn build`는 `eslint .`를 먼저 실행한다. 빌드가 통과해야 배포된다.

## 확인 방법

- 폰트, 스타일, 공유 이미지처럼 화면에 보이는 변경은 빌드 통과만으로 끝내지 않는다. 브라우저에서 실제로 그려진 결과를 원본과 비교해 확인한다.
- 로컬 서버는 프로세스 이름이 `next-server`로 표시된다. 종료할 때는 포트 기준(`lsof -ti tcp:<port>`)으로 찾아서 끈다.

## 작업 흐름

- main에서 바로 작업하지 않고 브랜치를 만든다. 브랜치를 푸시해 Vercel Preview 배포에서 확인한 뒤 main에 반영한다.

## 초안 (비공개)

- 초안은 비공개 저장소 `seop-log-drafts`에 두고, 블로그 저장소 안의 `drafts/` 폴더로 내려받아 쓴다. `drafts/`는 `.gitignore`에 들어 있다.
- 블로그 저장소는 공개 저장소다. 초안 파일을 `contents/`에 직접 복사하거나 커밋하지 않는다. 발행할 때만 `yarn publish-draft <category> <id>`로 옮긴다.
- 초안은 개발 서버(`yarn dev`)에서만 보인다. `drafts/` 폴더의 글과 `draft: true`인 글은 배포 빌드에서 빠진다.

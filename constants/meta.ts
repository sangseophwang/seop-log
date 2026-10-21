export const site = {
  title: 'Seop-Log',
  description: '개발, 일상기를 담은 블로그입니다✨',
  keywords: 'seop,log,블로그,프론트엔드,개발,일상',
  url: 'https://seop-log.vercel.app/',
};

// 홈의 검색 결과 제목. 다른 페이지는 `%s | Seop-Log` 형식을 쓴다.
export const homeTitle = `${site.title} | 프론트엔드 개발 블로그`;

// 구조화 데이터(JSON-LD)의 작성자 정보
export const author = {
  '@type': 'Person',
  name: 'SangSeop Hwang',
  url: site.url,
  sameAs: [
    'https://github.com/sangseophwang',
    'https://www.linkedin.com/in/sangseophwang',
  ],
};

// 공유 이미지는 각 경로의 opengraph-image.tsx가 만든다.
export const openGraph = {
  type: 'website',
  title: homeTitle,
  description: site.description,
  url: site.url,
};

export const Meta = {
  ...site,
  // 글/카테고리 페이지의 상대 경로(canonical, og:url)를 절대 URL로 바꾸는 기준
  metadataBase: new URL(site.url),
  title: { default: homeTitle, template: `%s | ${site.title}` },
  openGraph,
  // Google Search Console 소유 확인 (URL 접두어 속성, HTML 태그 방식)
  verification: {
    google: 'rdRMrLAwcZnG_kh32i1mzcROhzisC3CPZ9yvIA7FXFE',
  },
};

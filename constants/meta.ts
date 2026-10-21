export const site = {
  title: 'Seop-Log',
  description: '개발, 일상기를 담은 블로그입니다✨',
  keywords: 'seop,log,블로그,프론트엔드,개발,일상',
  url: 'https://seop-log.vercel.app/',
};

// 공유 이미지는 각 경로의 opengraph-image.tsx가 만든다.
export const openGraph = {
  type: 'website',
  title: site.title,
  description: site.description,
  url: site.url,
};

export const Meta = {
  ...site,
  // 글/카테고리 페이지의 상대 경로(canonical, og:url)를 절대 URL로 바꾸는 기준
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.title}` },
  openGraph,
  // Google Search Console 소유 확인 (URL 접두어 속성, HTML 태그 방식)
  verification: {
    google: 'rdRMrLAwcZnG_kh32i1mzcROhzisC3CPZ9yvIA7FXFE',
  },
};

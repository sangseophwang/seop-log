import { site } from '@/constants/meta';

export default function robots() {
  // 막는 경로를 두지 않는다. 검색엔진이 페이지를 렌더링하려면 /_next/* 의 JS·CSS·이미지가,
  // 검색 결과에 아이콘을 보여 주려면 /favicon.ico 가 필요하다.
  const allAgent = {
    userAgent: '*',
    allow: '/',
  };

  const facebookAgent = {
    userAgent: 'FacebookBot',
    allow: '/',
    crawlDelay: 30,
  };

  return {
    rules: [allAgent, facebookAgent],
    sitemap: new URL('/sitemap.xml', site.url).href,
  };
}

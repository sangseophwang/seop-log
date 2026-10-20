import { site } from '@/constants/meta';

export default function robots() {
  // /_next/* 는 막지 않는다. 검색엔진이 페이지를 렌더링하려면 JS·CSS·이미지가 필요하다.
  const disallow = ['/public/*', '/favicon.*'];

  const allAgent = {
    userAgent: '*',
    allow: '/',
    disallow,
  };

  const facebookAgent = {
    userAgent: 'FacebookBot',
    disallow,
    crawlDelay: 30,
  };

  return {
    rules: [allAgent, facebookAgent],
    sitemap: new URL('/sitemap.xml', site.url).href,
  };
}

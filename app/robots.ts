import { site } from '@/constants/meta';

export default function robots() {
  const disallow = ['/_next/*', '/public/*', '/favicon.*'];

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
    sitemap: `${site.url}/sitemap.xml`,
  };
}

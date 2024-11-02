import { site } from '@/constants/meta';

const sitemaps = [
  {
    url: site.url,
    lastModified: new Date(),
  },
];

export default async function sitemap() {
  return [...sitemaps];
}

import type { MetadataRoute } from 'next';

import { headerMeta } from '@/constants/header';
import { site } from '@/constants/meta';
import { getSortedPostData } from '@/utils/post';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = Array.from(headerMeta.keys());
  const postsByCategory = await Promise.all(
    categories.map((category) => getSortedPostData({ category })),
  );

  // 글이 없는 카테고리는 제외하고, 가장 최근 글의 날짜를 수정일로 사용
  const categoryUrls = categories.flatMap((category, index) => {
    const [latestPost] = postsByCategory[index];
    if (!latestPost) return [];

    return {
      url: new URL(`/${category}`, site.url).href,
      lastModified: new Date(latestPost.date),
    };
  });

  const postUrls = postsByCategory.flat().map(({ category, id, date }) => ({
    url: new URL(`/post/${category}/${id}`, site.url).href,
    lastModified: new Date(date),
  }));

  return [
    { url: site.url, lastModified: new Date() },
    ...categoryUrls,
    ...postUrls,
  ];
}

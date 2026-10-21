import type { Metadata } from 'next';

import { Header, List } from '@/components';
import { PageLayout } from '@/components/Layouts';

import { headerMeta } from '@/constants/header';
import { site } from '@/constants/meta';
import { getSortedPostData } from '@/utils/post';

export async function generateStaticParams() {
  const categories = Array.from(headerMeta.keys());
  const posts = await Promise.all(
    categories.map((category) => getSortedPostData({ category })),
  );

  // 글이 없는 카테고리는 페이지를 만들지 않는다 (dynamicParams = false 라서 404)
  return categories
    .filter((_, index) => posts[index].length > 0)
    .map((category) => ({ slug: category }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[slug]'>): Promise<Metadata> {
  const { slug: category } = await params;
  const { title, subtitle } = headerMeta.get(category) ?? {};

  return {
    title,
    description: subtitle,
    alternates: { canonical: `/${category}` },
    openGraph: {
      title: `${title} | ${site.title}`,
      description: subtitle,
      url: `/${category}`,
    },
  };
}

const SlugPage = async ({ params }: PageProps<'/[slug]'>) => {
  const { slug: category } = await params;
  const { title, subtitle } = headerMeta.get(category) ?? {};

  const postData = await getSortedPostData({ category });

  return (
    <PageLayout minHeight>
      <Header title={title} subtitle={subtitle} />
      <List data={postData} />
    </PageLayout>
  );
};

export default SlugPage;

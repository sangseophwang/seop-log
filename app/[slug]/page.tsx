import type { Metadata } from 'next';

import { Header, List } from '@/components';
import { PageLayout } from '@/components/Layouts';

import { headerMeta } from '@/constants/header';
import { getSortedPostData } from '@/utils/post';

export function generateStaticParams() {
  const headerSlugs = Array.from(headerMeta.keys());
  return headerSlugs.map((key) => ({ slug: key }));
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

import { Header, List } from '@/components';
import { PageLayout } from '@/components/Layouts';

import { headerMeta } from '@/constants/header';
import { getSortedPostData } from '@/utils/post';

export function generateStaticParams() {
  const headerSlugs = Array.from(headerMeta.keys());
  return headerSlugs.map((key) => ({ slug: key }));
}

interface SlugPageProps {
  params: {
    slug: string;
  };
}

// TODO: 각 페이지 meta 정보
const SlugPage = ({ params: { slug: category } }: SlugPageProps) => {
  const { title, subtitle } = headerMeta.get(category) ?? {};

  const postData = getSortedPostData({ category });

  return (
    <PageLayout minHeight>
      <Header title={title} subtitle={subtitle} />
      <List data={postData} />
    </PageLayout>
  );
};

export default SlugPage;

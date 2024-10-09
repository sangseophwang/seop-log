import { headers } from 'next/headers';

import { Header, List } from '@/components';
import { PageLayout } from '@/components/Layouts';

import { headerMeta } from '@/constants/header';
import { getSortedPostData } from '@/utils/post';

export function generateStaticParams() {
  const headerSlugs = Array.from(headerMeta.keys());
  return headerSlugs.map((key) => ({ slug: key }));
}

// TODO: title 기본값 제거
// TODO: 각 페이지 meta 정보
const SlugPage = () => {
  const headersList = headers();
  const headerPathname = headersList.get('x-pathname') || '';
  const category = headerPathname.substring(1);

  const { title = '', subtitle } = headerMeta.get(category) ?? {};

  const postData = getSortedPostData({ category });

  return (
    <PageLayout minHeight>
      <Header title={title} subtitle={subtitle} />
      <List data={postData} />
    </PageLayout>
  );
};

export default SlugPage;

import type { Metadata } from 'next';

import { Header, Link } from '@/components';
import { PageLayout } from '@/components/Layouts';

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다',
};

const NotFoundPage = () => {
  return (
    <PageLayout minHeight>
      <Header title="404" subtitle="요청하신 페이지를 찾을 수 없습니다." />
      <p className="mt-10 text-slate-200" data-animate>
        <Link href="/">홈으로 돌아가기 →</Link>
      </p>
    </PageLayout>
  );
};

export default NotFoundPage;

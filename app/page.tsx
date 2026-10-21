import { Header, Introduction, JsonLd } from '@/components';
import { PageLayout } from '@/components/Layouts';

import { author, site } from '@/constants/meta';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.title,
  // 검색 결과의 사이트 이름 후보 (구글은 도메인을 소문자로 적은 이름도 후보로 본다)
  alternateName: ['seop-log', 'seop-log.vercel.app'],
  url: site.url,
  description: site.description,
  inLanguage: 'ko-KR',
  author,
};

const HomePage = () => {
  return (
    <PageLayout>
      <JsonLd data={websiteJsonLd} />
      <Header title="SangSeopHwang" />
      <Introduction />
    </PageLayout>
  );
};

export default HomePage;

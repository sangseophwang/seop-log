import { Header, Introduction, JsonLd } from '@/components';
import { PageLayout } from '@/components/Layouts';

import { author, site } from '@/constants/meta';

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.title,
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

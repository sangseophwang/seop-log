import { Header, Introduction } from '@/components';
import { PageLayout } from '@/components/Layouts';

const HomePage = () => {
  return (
    <PageLayout>
      <Header title="SangSeopHwang" />
      <Introduction />
    </PageLayout>
  );
};

export default HomePage;

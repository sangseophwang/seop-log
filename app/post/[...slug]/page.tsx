import { PageLayout } from '@/components/Layouts';

import { Post } from '@/components';
import Comment from '@/components/Comment';

interface PostPageProps {
  params: {
    slug: string[];
  };
}

const PostPage = ({
  params: {
    slug: [category, file],
  },
}: PostPageProps) => {
  return (
    <PageLayout minHeight>
      <div className="blur-layer" aria-hidden="true" />
      <article
        className="prose prose-invert"
        data-animate
        data-animate-speed="fast"
      >
        <Post category={category} file={file} />
        <Comment className="mx-auto mt-20" />
      </article>
    </PageLayout>
  );
};

export default PostPage;

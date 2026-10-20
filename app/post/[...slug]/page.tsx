import { PageLayout } from '@/components/Layouts';

import { Post } from '@/components';
import Comment from '@/components/Comment';

import { headerMeta } from '@/constants/header';
import { getSortedPostData } from '@/utils/post';

export function generateStaticParams() {
  const categories = Array.from(headerMeta.keys());
  return categories.flatMap((category) =>
    getSortedPostData({ category }).map(({ id }) => ({
      slug: [category, id],
    })),
  );
}

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

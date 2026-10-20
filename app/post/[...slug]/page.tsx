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

const PostPage = async ({ params }: PageProps<'/post/[...slug]'>) => {
  const {
    slug: [category, file],
  } = await params;

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

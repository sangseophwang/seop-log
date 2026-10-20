import type { Metadata } from 'next';

import { PageLayout } from '@/components/Layouts';

import { Post } from '@/components';
import Comment from '@/components/Comment';

import { headerMeta } from '@/constants/header';
import { parseDate } from '@/utils/date';
import { getPost, getSortedPostData } from '@/utils/post';

export async function generateStaticParams() {
  const categories = Array.from(headerMeta.keys());
  const posts = await Promise.all(
    categories.map((category) => getSortedPostData({ category })),
  );

  return posts.flat().map(({ category, id }) => ({ category, id }));
}

export async function generateMetadata({
  params,
}: PageProps<'/post/[category]/[id]'>): Promise<Metadata> {
  const { category, id } = await params;
  const { metadata } = await getPost(category, id);
  const url = `/post/${category}/${id}`;

  return {
    title: metadata.title,
    description: metadata.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: metadata.title,
      description: metadata.description,
      url,
      publishedTime: parseDate(metadata.date).toISOString(),
    },
  };
}

const PostPage = async ({ params }: PageProps<'/post/[category]/[id]'>) => {
  const { category, id } = await params;

  return (
    <PageLayout minHeight>
      <div className="blur-layer" aria-hidden="true" />
      <article
        className="prose prose-invert"
        data-animate
        data-animate-speed="fast"
      >
        <Post category={category} file={id} />
        <Comment className="mx-auto mt-20" />
      </article>
    </PageLayout>
  );
};

export default PostPage;

import type { Metadata } from 'next';

import { PageLayout } from '@/components/Layouts';

import { Post } from '@/components';
import Comment from '@/components/Comment';

import { headerMeta } from '@/constants/header';
import { openGraph } from '@/constants/meta';
import { parseDate } from '@/utils/date';
import { getPost, getSortedPostData } from '@/utils/post';

export async function generateStaticParams() {
  const categories = Array.from(headerMeta.keys());
  const posts = await Promise.all(
    categories.map((category) => getSortedPostData({ category })),
  );

  return posts.flat().map(({ category, id }) => ({
    slug: [category, id],
  }));
}

export async function generateMetadata({
  params,
}: PageProps<'/post/[...slug]'>): Promise<Metadata> {
  const {
    slug: [category, file],
  } = await params;
  const { metadata } = await getPost(category, file);
  const url = `/post/${category}/${file}`;

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
      images: openGraph.images,
    },
  };
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

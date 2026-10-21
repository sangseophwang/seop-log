import NextLink from 'next/link';

import { headerMeta } from '@/constants/header';
import { formatDate } from '@/utils/date';
import { getPost } from '@/utils/post';
import { components } from '@/constants/mdx';

interface PostProps {
  category: string;
  file: string;
}

const Post = async ({ category, file }: PostProps) => {
  const { Content, metadata } = await getPost(category, file);
  const categoryTitle = headerMeta.get(category)?.title ?? category;
  const categoryHref = `/${category}` as const;

  return (
    <>
      <header className="flex flex-col">
        <NextLink
          href={categoryHref}
          className="not-prose mb-2 w-fit text-sm text-slate-400 transition-colors hover:text-slate-200"
        >
          {categoryTitle}
        </NextLink>
        <h1 className="mb-0 text-2xl font-bold sm:text-3xl">
          {metadata.title}
        </h1>
        <i className="mt-2 mb-8">{formatDate(metadata.date)}</i>
      </header>
      <Content components={components} />
      <nav className="not-prose mt-16 border-t border-slate-800 pt-6">
        <NextLink
          href={categoryHref}
          className="text-sm text-slate-400 transition-colors hover:text-slate-200"
        >
          ← {categoryTitle} 목록으로
        </NextLink>
      </nav>
    </>
  );
};

export default Post;

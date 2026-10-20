'use client';

import { useEffect, useState } from 'react';
import { MDXContent } from 'mdx/types';
import { PostData } from '@/types/post';
import { formatDate } from '@/utils/date';
import { components } from '@/constants/mdx';

interface PostProps {
  category: string;
  file: string;
}

const Post = ({ category, file }: PostProps) => {
  const [MDX, setMDX] = useState<MDXContent | null>(null);
  const [metadata, setMetadata] = useState<PostData>();

  useEffect(() => {
    import(`../contents/${category}/${file}.mdx`).then((mod) => {
      setMDX(() => mod.default);
      setMetadata(() => mod.metadata);
    });
  }, [category, file]);

  if (!MDX || !metadata) return null;

  return (
    <>
      <header className="flex flex-col">
        <h1 className="mb-0 text-2xl font-bold sm:text-3xl">
          {metadata.title}
        </h1>
        <i className="mt-2 mb-8">{formatDate(metadata.date)}</i>
      </header>
      <MDX components={components} />
    </>
  );
};

export default Post;

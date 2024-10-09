'use client';

import { ComponentType, useEffect, useState } from 'react';
import { MDXComponents } from 'mdx/types';
import { PostData } from '@/types/post';
import { formatDate } from '@/utils/date';
import { components } from '@/constants/mdx';

interface PostProps {
  category: string;
  file: string;
}

const Post = ({ category, file }: PostProps) => {
  const [MDX, setMDX] = useState<ComponentType<MDXComponents> | null>(null);
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
        <i className="mb-8 mt-2">{formatDate(metadata.date)}</i>
      </header>
      <MDX components={components} />
    </>
  );
};

export default Post;

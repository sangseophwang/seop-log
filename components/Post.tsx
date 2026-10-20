import { formatDate } from '@/utils/date';
import { getPost } from '@/utils/post';
import { components } from '@/constants/mdx';

interface PostProps {
  category: string;
  file: string;
}

const Post = async ({ category, file }: PostProps) => {
  const { Content, metadata } = await getPost(category, file);

  return (
    <>
      <header className="flex flex-col">
        <h1 className="mb-0 text-2xl font-bold sm:text-3xl">
          {metadata.title}
        </h1>
        <i className="mt-2 mb-8">{formatDate(metadata.date)}</i>
      </header>
      <Content components={components} />
    </>
  );
};

export default Post;

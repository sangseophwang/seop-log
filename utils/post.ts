import fs from 'fs';
import path from 'path';
import type { MDXContent } from 'mdx/types';

import { PostData } from '@/types/post';

interface PostModule {
  default: MDXContent;
  metadata: PostData;
}

const getPostIds = (category: string) => {
  const postsDirectory = path.join(process.cwd(), `contents/${category}`); // Markdown 파일들이 있는 디렉토리 경로
  if (!fs.existsSync(postsDirectory)) return []; // 아직 글이 없는 카테고리

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, '')); // 파일 이름에서 확장자를 제거하여 id로 사용
};

// MDX 파일의 본문과 `export const metadata`를 모듈로 불러온다.
export const getPost = async (category: string, id: string) => {
  const { default: Content, metadata }: PostModule = await import(
    `../contents/${category}/${id}.mdx`
  );

  return { Content, metadata: { ...metadata, id, category } };
};

export const getSortedPostData = async ({ category }: { category: string }) => {
  const allPostsData = await Promise.all(
    getPostIds(category).map(
      async (id) => (await getPost(category, id)).metadata,
    ),
  );

  // 날짜를 기준으로 포스트 데이터를 정렬
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime(); // 날짜를 Date 객체로 변환하여 비교
  });
};

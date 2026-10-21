import fs from 'fs';
import path from 'path';
import type { MDXContent } from 'mdx/types';

import { PostData } from '@/types/post';
import { parseDate } from '@/utils/date';

interface PostModule {
  default: MDXContent;
  metadata: PostData;
}

// 초안은 개발 서버(yarn dev)에서만 보여 준다. 배포 빌드에서는 drafts/ 폴더도, draft: true인 글도 제외한다.
// drafts/ 는 비공개 저장소(seop-log-drafts)를 내려받는 폴더이며 .gitignore에 들어 있다.
const showDrafts = process.env.NODE_ENV === 'development';

const readPostIds = (directory: string) => {
  if (!fs.existsSync(directory)) return []; // 아직 글이 없는 카테고리

  return fs
    .readdirSync(directory)
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, '')); // 파일 이름에서 확장자를 제거하여 id로 사용
};

const postPath = (category: string, id: string) =>
  path.join(process.cwd(), 'contents', category, `${id}.mdx`);

const draftPath = (category: string, id: string) =>
  path.join(process.cwd(), 'drafts/contents', category, `${id}.mdx`);

const getPostIds = (category: string) => {
  const ids = readPostIds(path.join(process.cwd(), 'contents', category));
  if (!showDrafts) return ids;

  const draftIds = readPostIds(
    path.join(process.cwd(), 'drafts/contents', category),
  ).filter((id) => !ids.includes(id));

  return [...ids, ...draftIds];
};

const isDraftFile = (category: string, id: string) =>
  showDrafts &&
  !fs.existsSync(postPath(category, id)) &&
  fs.existsSync(draftPath(category, id));

// MDX 파일의 본문과 `export const metadata`를 모듈로 불러온다.
export const getPost = async (category: string, id: string) => {
  const fromDrafts = isDraftFile(category, id);
  const { default: Content, metadata }: PostModule = fromDrafts
    ? await import(`../drafts/contents/${category}/${id}.mdx`)
    : await import(`../contents/${category}/${id}.mdx`);

  return {
    Content,
    metadata: {
      ...metadata,
      id,
      category,
      draft: fromDrafts || metadata.draft === true,
    },
  };
};

export const getSortedPostData = async ({ category }: { category: string }) => {
  const allPostsData = await Promise.all(
    getPostIds(category).map(
      async (id) => (await getPost(category, id)).metadata,
    ),
  );

  // 날짜를 기준으로 포스트 데이터를 정렬
  return allPostsData
    .filter((post) => showDrafts || !post.draft)
    .sort((a, b) => {
      return parseDate(b.date).getTime() - parseDate(a.date).getTime(); // 날짜를 Date 객체로 변환하여 비교
    });
};

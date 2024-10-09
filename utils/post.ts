import fs from 'fs';
import path from 'path';

import { PostData } from '@/types/post';

// TODO: Return Type 정리
const extractMetadata = (fileContents: string): PostData | null => {
  // 정규표현식으로 metadata 부분 추출
  const metadataRegex = /export\s+const\s+metadata\s+=\s+({[\s\S]*?})/;
  const match = metadataRegex.exec(fileContents);

  if (match && match[1]) {
    const metadataString = match[1];
    // 추출된 문자열을 JavaScript 객체로 변환

    try {
      // Function 생성자를 사용하여 문자열을 객체로 변환
      return new Function(`return ${metadataString};`)();
      // return metadata as Metadata;
    } catch (error) {
      console.error('Metadata parsing error:', error);
      return null;
    }
  }

  return null;
};

export const getSortedPostData = ({ category }: { category: string }) => {
  const postsDirectory = path.join(process.cwd(), `contents/${category}`); // Markdown 파일들이 있는 디렉토리 경로
  const fileNames = fs.readdirSync(postsDirectory); // 해당 디렉토리 내 파일 목록을 동기적으로 읽어옵니다.

  const allPostsData = fileNames.reduce<PostData[]>((acc, fileName) => {
    const id = fileName.replace(/\.mdx$/, ''); // 파일 이름에서 확장자를 제거하여 id로 사용
    const fullPath = path.join(postsDirectory, fileName); // 전체 파일 경로
    const fileContents = fs.readFileSync(fullPath, 'utf8'); // 파일 내용을 UTF-8 형식으로 읽어옴
    const data = extractMetadata(fileContents);

    return [...acc, { ...data, id, category } as PostData];
  }, []);

  // 날짜를 기준으로 포스트 데이터를 정렬
  return allPostsData.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime(); // 날짜를 Date 객체로 변환하여 비교
  });
};

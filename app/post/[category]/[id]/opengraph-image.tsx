import { readFile } from 'fs/promises';
import path from 'path';
import { ImageResponse } from 'next/og';

import { headerMeta } from '@/constants/header';
import { site } from '@/constants/meta';
import { formatDate } from '@/utils/date';
import { getPost } from '@/utils/post';

// 페이지와 같은 경로 목록으로 빌드할 때 이미지를 미리 만든다 (요청마다 서버에서 만들지 않도록)
export { generateStaticParams } from './page';

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// next/og는 woff2를 읽지 못하므로, 공식 pretendard 패키지의 정적 woff를 빌드할 때 읽는다.
const loadFont = (fileName: string) =>
  readFile(
    path.join(
      process.cwd(),
      'node_modules/pretendard/dist/web/static/woff',
      fileName,
    ),
  );

const OpengraphImage = async ({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) => {
  const { category, id } = await params;
  const { metadata } = await getPost(category, id);
  const [bold, regular] = await Promise.all([
    loadFont('Pretendard-Bold.woff'),
    loadFont('Pretendard-Regular.woff'),
  ]);

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '80px',
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: 'Pretendard',
      }}
    >
      <div style={{ fontSize: 28, color: '#94a3b8' }}>
        {headerMeta.get(category)?.title ?? category}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.3 }}>
          {metadata.title}
        </div>
        <div style={{ marginTop: 24, fontSize: 32, color: '#9ca3af' }}>
          {metadata.description}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 28,
          color: '#94a3b8',
        }}
      >
        <span style={{ fontWeight: 700, color: '#fff' }}>{site.title}</span>
        <span>{formatDate(metadata.date)}</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: 'Pretendard', data: bold, weight: 700 },
        { name: 'Pretendard', data: regular, weight: 400 },
      ],
    },
  );
};

export default OpengraphImage;

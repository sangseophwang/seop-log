import { readFile } from 'fs/promises';
import path from 'path';
import { ImageResponse } from 'next/og';

import { site } from '@/constants/meta';

export const ogImageSize = { width: 1200, height: 630 };

// next/og는 woff2를 읽지 못하므로, 공식 pretendard 패키지의 정적 woff를 빌드할 때 읽는다.
const loadFont = (fileName: string) =>
  readFile(
    path.join(
      process.cwd(),
      'node_modules/pretendard/dist/web/static/woff',
      fileName,
    ),
  );

// next/og는 이모지를 그릴 때 외부에서 이미지를 받아 오므로 이미지 문구에서는 뺀다.
export const stripEmoji = (text: string) =>
  text.replace(/\p{Extended_Pictographic}/gu, '').trim();

interface OgImageProps {
  eyebrow?: string;
  title: string;
  description?: string;
  footnote?: string;
}

// 홈, 카테고리, 글의 공유 이미지(1200x630)를 같은 디자인으로 만든다.
export const createOgImage = async ({
  eyebrow,
  title,
  description,
  footnote,
}: OgImageProps) => {
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
      <div style={{ fontSize: 28, color: '#94a3b8' }}>{eyebrow ?? ''}</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.3 }}>
          {title}
        </div>
        {description && (
          <div style={{ marginTop: 24, fontSize: 32, color: '#9ca3af' }}>
            {description}
          </div>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 28,
          color: '#94a3b8',
        }}
      >
        {/* 제목이 사이트 이름이면(홈) 같은 이름을 두 번 쓰지 않는다 */}
        <span style={{ fontWeight: 700, color: '#fff' }}>
          {title === site.title ? '' : site.title}
        </span>
        <span>{footnote ?? ''}</span>
      </div>
    </div>,
    {
      ...ogImageSize,
      fonts: [
        { name: 'Pretendard', data: bold, weight: 700 },
        { name: 'Pretendard', data: regular, weight: 400 },
      ],
    },
  );
};

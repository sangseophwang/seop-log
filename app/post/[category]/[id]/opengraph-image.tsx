import { headerMeta } from '@/constants/header';
import { site } from '@/constants/meta';
import { formatDate } from '@/utils/date';
import { createOgImage, ogImageSize } from '@/utils/og';
import { getPost } from '@/utils/post';

// 페이지와 같은 경로 목록으로 빌드할 때 이미지를 미리 만든다 (요청마다 서버에서 만들지 않도록)
export { generateStaticParams } from './page';

export const alt = site.title;
export const size = ogImageSize;
export const contentType = 'image/png';

const OpengraphImage = async ({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) => {
  const { category, id } = await params;
  const { metadata } = await getPost(category, id);

  return createOgImage({
    eyebrow: headerMeta.get(category)?.title ?? category,
    title: metadata.title,
    description: metadata.description,
    footnote: formatDate(metadata.date),
  });
};

export default OpengraphImage;

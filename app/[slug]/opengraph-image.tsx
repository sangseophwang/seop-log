import { headerMeta } from '@/constants/header';
import { site } from '@/constants/meta';
import { createOgImage, ogImageSize } from '@/utils/og';
import { getSortedPostData } from '@/utils/post';

// 페이지와 같은 경로 목록으로 빌드할 때 이미지를 미리 만든다 (요청마다 서버에서 만들지 않도록)
export { generateStaticParams } from './page';

export const alt = site.title;
export const size = ogImageSize;
export const contentType = 'image/png';

const OpengraphImage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug: category } = await params;
  const { title, subtitle } = headerMeta.get(category) ?? {};
  const posts = await getSortedPostData({ category });

  return createOgImage({
    title: title ?? category,
    description: subtitle,
    footnote: `글 ${posts.length}개`,
  });
};

export default OpengraphImage;

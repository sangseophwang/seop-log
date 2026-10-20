import { site } from '@/constants/meta';
import { createOgImage, ogImageSize, stripEmoji } from '@/utils/og';

export const alt = site.title;
export const size = ogImageSize;
export const contentType = 'image/png';

const OpengraphImage = () => {
  return createOgImage({
    title: site.title,
    description: stripEmoji(site.description),
  });
};

export default OpengraphImage;

import { site, openGraph } from '@/constants/meta';
import { TypeSiteMeta } from '@/types/meta';

export const updateSiteMeta = ({
  title,
  description,
  keywords,
  url,
  image,
}: TypeSiteMeta) => {
  title = title || site.title;
  description = description || site.description;
  keywords = keywords || site.keywords;
  url = site.url;
  image = image || site.image;

  return {
    title,
    description,
    keywords,
    openGraph: {
      ...openGraph,
      title,
      description,
      url,
      images: {
        ...openGraph.images,
        url: image,
      },
    },
  };
};

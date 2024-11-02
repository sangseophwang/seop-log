export const site = {
  title: 'Seop-Log',
  description: '개발, 일상기를 담은 블로그입니다✨',
  keywords: 'seop,log,블로그,프론트엔드,개발,일상',
  image: '/opengraph.png',
  url: 'https://seop-log.vercel.app/',
};

export const openGraph = {
  type: 'website',
  title: site.title,
  description: site.description,
  url: site.url,
  images: {
    width: 600,
    height: 315,
    url: site.image,
  },
};

export const Meta = { ...site, openGraph };

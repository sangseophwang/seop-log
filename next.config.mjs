import nextMDX from '@next/mdx';

// Turbopack에서는 플러그인을 함수가 아닌 패키지 이름(문자열)으로 넘겨야 한다.
const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: ['rehype-code-titles', 'rehype-prism-plus', 'rehype-slug'],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

export default withMDX(nextConfig);

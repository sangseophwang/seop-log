import type { Route } from 'next';
import Link from '@/components/Link';
import Image, { ImageProps } from 'next/image';
import { AnchorHTMLAttributes, ReactNode } from 'react';

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
}

interface RoundedImageProps extends ImageProps {
  alt: string;
}

const customLink = (props: CustomLinkProps) => {
  return (
    // 글 본문(MDX)의 링크는 임의의 문자열이라 typedRoutes 검사 대상에서 뺀다.
    <Link href={props.href as Route}>
      {props.children}
      {props.href.startsWith('#') ? '' : '↗'}
    </Link>
  );
};

const RoundedImage = ({ alt, ...props }: RoundedImageProps) => {
  return <Image alt={alt} className="rounded-lg" {...props} />;
};

export const components = {
  a: customLink,
  img: RoundedImage,
};

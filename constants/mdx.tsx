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
    <Link href={props.href}>
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

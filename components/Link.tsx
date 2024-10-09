import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface LinkProps extends NextLinkProps {
  className?: string;
  children: ReactNode;
}

const Link = ({ className, href, children }: LinkProps) => {
  return (
    <NextLink
      className={clsx(
        className,
        'default-transition underline underline-offset-4 transition-opacity hover:opacity-80',
      )}
      href={href}
    >
      {children}
    </NextLink>
  );
};

export default Link;

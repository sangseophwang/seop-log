import type { Route } from 'next';
import NextLink from 'next/link';
import { ReactNode } from 'react';
import clsx from 'clsx';

// typedRoutes: 내부 경로는 실제 라우트와 맞는지 검사하고, 외부 주소(https://...)는 그대로 허용한다.
interface LinkProps<T extends string> {
  className?: string;
  href: Route<T>;
  children: ReactNode;
}

const Link = <T extends string>({
  className,
  href,
  children,
}: LinkProps<T>) => {
  return (
    <NextLink
      className={clsx(
        className,
        'underline underline-offset-4 default-transition transition-opacity hover:opacity-80',
      )}
      href={href}
    >
      {children}
    </NextLink>
  );
};

export default Link;

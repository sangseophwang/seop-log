'use client';

import type { Route } from 'next';
import NextLink from 'next/link';
import { Command } from 'cmdk';
import { ReactNode, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  CodeIcon,
  HomeIcon,
  LifeIcon,
  ExperimentIcon,
} from '@/components/Icons';

import { MenuContext } from '@/providers';

// 크롤러가 따라갈 수 있도록 <a href>로 그리되, 실제 이동은 Command.Item의 onSelect가 맡는다.
// (prefetch는 메뉴를 열 때 따로 하므로 끈다)
const MenuLink = <T extends string>({
  href,
  children,
}: {
  href: Route<T>;
  children: ReactNode;
}) => {
  return (
    <NextLink
      href={href}
      prefetch={false}
      tabIndex={-1}
      className="flex h-full w-full items-center gap-2"
      onClick={(event) => event.preventDefault()}
    >
      {children}
    </NextLink>
  );
};

const PageMenu = () => {
  const router = useRouter();
  const { isOpen, close } = useContext(MenuContext);

  // router.push는 <Link>와 달리 미리 받아 두지 않으므로, 메뉴가 열리면 이동할 페이지를 prefetch 한다.
  useEffect(() => {
    if (!isOpen) return;
    (['/', '/dev', '/life'] as const).forEach((href) => router.prefetch(href));
  }, [isOpen, router]);

  const route = <T extends string>(href: Route<T>) => {
    router.push(href);
    close();
  };
  return (
    <Command.Group heading="Pages">
      <Command.Item value="Home" onSelect={() => route('/')}>
        <MenuLink href="/">
          <HomeIcon className="h-4 w-4" />
          Home
        </MenuLink>
      </Command.Item>
      <Command.Item value="Dev" onSelect={() => route('/dev')}>
        <MenuLink href="/dev">
          <CodeIcon className="h-4 w-4" />
          Dev
        </MenuLink>
      </Command.Item>
      <Command.Item value="Life" onSelect={() => route('/life')}>
        <MenuLink href="/life">
          <LifeIcon className="h-4 w-4" />
          Life
        </MenuLink>
      </Command.Item>
      <Command.Item
        className="cursor-not-allowed select-none"
        value="Experiment"
        // onSelect={() => route('/experiment')}
      >
        <ExperimentIcon className="h-4 w-4" />
        Experiment (Coming Soon)
      </Command.Item>
    </Command.Group>
  );
};

export default PageMenu;

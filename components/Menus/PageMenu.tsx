'use client';

import { Command } from 'cmdk';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  CodeIcon,
  HomeIcon,
  LifeIcon,
  ExperimentIcon,
} from '@/components/Icons';

import { MenuContext } from '@/providers';

const PageMenu = () => {
  const router = useRouter();
  const { isOpen, close } = useContext(MenuContext);

  // router.push는 <Link>와 달리 미리 받아 두지 않으므로, 메뉴가 열리면 이동할 페이지를 prefetch 한다.
  useEffect(() => {
    if (!isOpen) return;
    ['/', '/dev', '/life'].forEach((href) => router.prefetch(href));
  }, [isOpen, router]);

  const route = (href: string) => {
    router.push(href);
    close();
  };
  return (
    <Command.Group heading="Pages">
      <Command.Item value="Home" onSelect={() => route('/')}>
        <HomeIcon className="h-4 w-4" />
        Home
      </Command.Item>
      <Command.Item value="Dev" onSelect={() => route('/dev')}>
        <CodeIcon className="h-4 w-4" />
        Dev
      </Command.Item>
      <Command.Item value="Life" onSelect={() => route('/life')}>
        <LifeIcon className="h-4 w-4" />
        Life
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

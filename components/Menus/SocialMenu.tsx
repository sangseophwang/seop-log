'use client';

import { Command } from 'cmdk';

import { GithubIcon, InstagramIcon, LinkedinIcon } from '@/components/Icons';

const SocialMenu = () => {
  const openLink = (href: string) => {
    window.open(href, '_blank');
    close();
  };

  return (
    <Command.Group heading="Social">
      <Command.Item
        value="LinkedIn"
        onSelect={() => openLink('https://www.linkedin.com/in/sangseophwang')}
      >
        <LinkedinIcon className="h-4 w-4 p-[1px]" />
        LinkedIn
      </Command.Item>
      <Command.Item
        value="Github"
        onSelect={() => openLink('https://github.com/sangseophwang')}
      >
        <GithubIcon className="h-4 w-4 p-[1px]" />
        Github
      </Command.Item>
      <Command.Item
        value="Instagram"
        onSelect={() => openLink('https://www.instagram.com/sangseophwang/')}
      >
        <InstagramIcon className="h-4 w-4 p-[1px]" />
        Instagram
      </Command.Item>
    </Command.Group>
  );
};

export default SocialMenu;

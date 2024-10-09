'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { Command } from 'cmdk';
import clsx from 'clsx';

import { PageMenu, SocialMenu } from '@/components/Menus';

import { MenuContext } from '@/providers';

const Menu = () => {
  const [value, setValue] = useState('');
  const { isOpen, open, close } = useContext(MenuContext);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (containerRef.current?.contains(event.target as Node)) return;
      close();
    };

    document.addEventListener('mousedown', onClickOutside);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [close]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isKKey = event.key === 'k' && event.metaKey;
      const isEscKey = event.key === 'Escape';

      if (isKKey) {
        event.preventDefault();
        return isOpen ? close() : open();
      }

      if (isEscKey) close();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, open, close]);

  useEffect(() => {
    const main = document.getElementById('main');
    if (isOpen) {
      inputRef.current?.focus();
      main?.classList.add('blur-bg');
    } else {
      main?.classList.remove('blur-bg');
    }
  }, [isOpen]);

  return (
    <div
      className={clsx('raycast absolute bottom-0 z-50 w-full sm:top-32', {
        hidden: !isOpen,
      })}
    >
      <Command
        ref={containerRef}
        value={value}
        onValueChange={(v) => setValue(v)}
      >
        <Command.Input
          ref={inputRef}
          autoFocus
          placeholder="검색어를 입력하세요."
        />
        <Command.List ref={listRef}>
          <Command.Empty>검색 결과를 찾을 수 없습니다.</Command.Empty>
          <PageMenu />
          <SocialMenu />
        </Command.List>
      </Command>
    </div>
  );
};

export default Menu;

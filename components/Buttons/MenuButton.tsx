'use client';

import { useContext } from 'react';

import { MenuIcon } from '@/components/Icons';

import { MenuContext } from '@/providers';

const MenuButton = () => {
  const { isOpen, open } = useContext(MenuContext);

  return (
    <nav className="absolute left-5 top-10 z-20 flex space-x-2 md:top-5">
      <button
        className="rounded-lg border border-slate-800 bg-black p-2 text-base text-white transition-all hover:bg-slate-900"
        onClick={() => !isOpen && open()}
      >
        <h3 className="sr-only">Open Menu</h3>
        <MenuIcon />
      </button>
    </nav>
  );
};

export default MenuButton;

'use client';

import { useContext } from 'react';

import { MenuContext } from '@/providers';

const CommandButton = () => {
  const { open } = useContext(MenuContext);
  return (
    <button
      className="group mt-10 flex items-center justify-center rounded-lg border border-slate-700 bg-black px-4 py-2 text-sm default-transition hover:border-slate-600 hover:bg-gray-950"
      onClick={() => open()}
    >
      Press
      <kbd className="mx-1 rounded-sm bg-slate-900 p-1 px-2 text-xs default-transition group-hover:bg-slate-800">
        ⌘
      </kbd>
      <kbd className="mr-1 rounded-sm bg-slate-900 p-1 px-2 text-xs default-transition group-hover:bg-slate-800">
        K
      </kbd>
      to browse →
    </button>
  );
};

export default CommandButton;

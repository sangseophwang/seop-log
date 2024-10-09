'use client';

import { createContext, useCallback, useState, PropsWithChildren } from 'react';

export const MenuContext = createContext({
  isOpen: true,
  open: () => {},
  close: () => {},
});

export const CommandMenuProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <MenuContext.Provider value={{ isOpen, open, close }}>
      {children}
    </MenuContext.Provider>
  );
};

import { useContext } from 'react';

import { Bars3Icon, XMarkIcon } from '@/components/Icons';

import { MenuContext } from '@/providers';

const MenuIcon = () => {
  const { isOpen } = useContext(MenuContext);

  return (
    <>
      {isOpen ? (
        <XMarkIcon className="h-5 w-5 stroke-2 text-white" />
      ) : (
        <Bars3Icon className="h-5 w-5 stroke-2 text-white" />
      )}
    </>
  );
};

export default MenuIcon;

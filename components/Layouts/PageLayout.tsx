import clsx from 'clsx';
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  minHeight?: boolean;
}

const PageLayout = ({ minHeight, children }: PageLayoutProps) => {
  return (
    <main
      id="main"
      className={clsx('default-transition w-full px-6 py-16', {
        ['min-h-[90vh]']: minHeight,
      })}
    >
      {children}
    </main>
  );
};

export default PageLayout;

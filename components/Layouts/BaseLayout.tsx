import { PropsWithChildren } from 'react';

const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative h-full w-full default-transition">
      <div className="relative mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-between">
        <div className="min-h-screen w-full items-center py-12 sm:flex">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;

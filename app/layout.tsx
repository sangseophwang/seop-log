import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Menu } from '@/components';
import { MenuButton } from '@/components/Buttons';
import { BaseLayout } from '@/components/Layouts';

import { Meta } from '@/constants/meta';

import { pretendard } from '@/fonts';

import { CommandMenuProvider } from '@/providers';

import '@/styles/globals.css';

export const metadata: Metadata = Meta;

export const dynamicParams = false;

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko" className={pretendard.className}>
      <body className="dark bg-black">
        <h1 className="sr-only">Seop Log</h1>
        <CommandMenuProvider>
          <BaseLayout>
            {children}
            <Analytics />
            <SpeedInsights />
            <Menu />
          </BaseLayout>
          <MenuButton />
        </CommandMenuProvider>
      </body>
    </html>
  );
};

export default RootLayout;

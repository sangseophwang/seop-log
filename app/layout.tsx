import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { Menu } from '@/components';
import { MenuButton } from '@/components/Buttons';
import { BaseLayout } from '@/components/Layouts';

import { Meta } from '@/constants/meta';

import { CommandMenuProvider } from '@/providers';

// 공식 Pretendard dynamic subset: 글자 범위별 92개 조각 중 페이지에 쓰인 글자의 조각만 받는다.
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import '@/styles/globals.css';

export const metadata: Metadata = Meta;

export const dynamicParams = false;

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body className="dark bg-black">
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

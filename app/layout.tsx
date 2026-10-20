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

// 모든 페이지를 빌드할 때 정적으로 만든다. headers()처럼 요청마다 달라지는 코드가 들어오면 빌드가 실패한다.
export const dynamic = 'error';

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

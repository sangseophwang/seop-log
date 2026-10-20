import localFont from 'next/font/local';

export const breathney = localFont({
  display: 'swap',
  src: './Breathney.woff2',
  variable: '--font-breathney',
});

export const pretendard = localFont({
  display: 'swap',
  // 자주 쓰는 한글 2,350자(KS X 1001)만 담은 Std 버전. 전체 버전(2MB)의 약 1/7 크기
  src: './PretendardStdVariable.woff2',
  variable: '--font-pretendard',
});

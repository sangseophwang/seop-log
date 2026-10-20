// 글의 date('YYYY-MM-DD HH:mm:ss')는 한국 시간으로 작성한다.
// 빌드 서버(Vercel은 UTC)의 시간대와 상관없이 같은 시각으로 해석되도록 오프셋을 붙인다.
export const parseDate = (dateString: string) => {
  return new Date(`${dateString.replace(' ', 'T')}+09:00`);
};

export const formatDate = (dateString: string) => {
  const date = parseDate(dateString);

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Seoul',
  });
};

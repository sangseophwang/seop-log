'use client';

import { useEffect, HTMLAttributes } from 'react';

const Comment = (props: HTMLAttributes<HTMLElement>) => {
  useEffect(() => {
    const giscusAttributes = {
      src: 'https://giscus.app/client.js',
      'data-repo': 'sangseophwang/seop-log',
      'data-repo-id': 'R_kgDOMsHmIA',
      'data-category': 'Comments',
      'data-category-id': 'DIC_kwDOMsHmIM4CjWEF',
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': 'https://giscus.app/themes/noborder_dark.css',
      'data-lang': 'ko',
      crossOrigin: 'anonymous',
      async: '',
    };

    const script = document.createElement('script');

    Object.entries(giscusAttributes).forEach(([key, value]) =>
      script.setAttribute(key, value),
    );

    document.querySelector('#giscus')?.appendChild(script);
  }, []);

  return (
    <section {...props} style={{ minHeight: '372px' }} id="giscus"></section>
  );
};

export default Comment;

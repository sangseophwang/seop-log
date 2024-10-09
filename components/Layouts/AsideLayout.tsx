import clsx from 'clsx';

const AsideLayout = () => {
  return (
    <aside
      className={clsx(
        'top-page fixed flex max-w-[220px] -translate-x-[230px] translate-y-[140px] flex-col',
        'transition-opacity lg:opacity-0',
        'md:relative md:top-0 md:-ml-2 md:mb-7 md:translate-x-0 md:opacity-100',
      )}
    >
      <slot />
    </aside>
  );
};

export default AsideLayout;

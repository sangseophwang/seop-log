import clsx from 'clsx';
import { breathney } from '@/fonts';
interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <header
      className="mb-4 mt-6 flex items-center justify-between md:mb-8"
      data-animate
      data-animate-speed="slow"
    >
      <div>
        <h2
          className={clsx(
            'text-2xl text-white md:text-3xl',
            breathney.className,
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="mt-5 text-sm font-medium text-slate-300">{subtitle}</p>
        )}
      </div>
    </header>
  );
};

export default Header;

import { Link } from '@/components';
import { CommandButton } from '@/components/Buttons';

// I’m a <em className="mr-0.5">Frontend Engineer</em> who enjoys tackling
// problems with a focus on simplicity, usability, and responsiveness, and
// I have a passion for creating intuitive and efficient user interfaces.

const Introduction = () => {
  return (
    <main
      className="max-w-none font-normal text-slate-200"
      data-animate
      data-animate-speed="slow"
    >
      <p>
        I&#39;m a <em className="mr-0.5">Frontend Engineer</em> who loves to
        solve issues with an emphasis on
      </p>
      <p>responsiveness, usability, and user interfaces.</p>

      <div className="mt-10">
        <strong className="text-sm font-medium text-slate-300">
          Currently,
        </strong>
        <hr className="mt-2 w-6 border-blue-600" />
        <p className="mt-4">
          <em>Frontend Engineer</em> at
          <Link className="ml-1" href="https://www.igaworks.com/">
            IGAWorks
          </Link>
          . Previously,
          <Link className="mx-1" href="https://day1company.co.kr/">
            Day1Company
          </Link>
          and
          <Link className="ml-1" href="https://www.soulcave.kr/">
            Studio SoulCave
          </Link>
          .
        </p>
      </div>

      <CommandButton />
    </main>
  );
};

export default Introduction;

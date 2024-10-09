import Link from 'next/link';

import { PostData } from '@/types/post';
import { formatDate } from '@/utils/date';
import { ArrowUpRightIcon } from '@/components/Icons';

interface ListProps {
  data: PostData[];
}

/** TODO
 *
 * 1. 텍스트 말줄임
 * 2. Link 클래스 정리
 * */
const List = ({ data }: ListProps) => {
  console.log('[data]', data);
  return (
    <ul
      className="mt-16 grid grid-cols-1 gap-6"
      data-animate
      data-animate-speed="slow"
    >
      {data.map(({ id, title, description, date, category }) => {
        return (
          <li key={id}>
            <Link
              className="group relative flex cursor-pointer flex-row items-center justify-between rounded-md before:absolute before:-inset-2.5 before:rounded-md before:bg-zinc-950 before:opacity-0 before:transition-opacity before:duration-500 before:content-[''] hover:before:opacity-100"
              href={`/post/${category}/${id}`}
            >
              <div className="z-10 flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium leading-4 text-white">{title}</h3>
                  <i className="text-[14px] text-gray-500">
                    {formatDate(date)}
                  </i>
                </div>
                <span className="text-gray-400">{description}</span>
              </div>
              <i className="w-3 text-gray-300 transition duration-500 group-hover:rotate-45">
                <ArrowUpRightIcon />
              </i>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default List;

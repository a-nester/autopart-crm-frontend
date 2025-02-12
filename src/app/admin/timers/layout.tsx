'use client';

import { ReactNode, useState } from 'react';
import clsx from 'clsx';
// import TimersSideBar from '@/components/TimersSideBar/TimersSideBar';

interface LayoutProps {
  children: ReactNode;
  select: ReactNode;
  categories: ReactNode;
}

export default function Layout({ children, select, categories }: LayoutProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="flex flex-row p-1 md:p-3 gap-2 relative">
      {/* Сайдбар */}
      <div
        className={clsx(
          ' top-0 left-0 h-screen w-64 bg-white shadow-md transition-transform duration-300 z-40 absolute',
          isOpen ? 'translate-x-0 ' : '-translate-x-[250px]  ',
        )}
      >
        <div className="p-4">
          {select}
          {categories}
          {/* Кнопка відкриття/закриття */}
          <button
            className="absolute top-5 right-[-24px] w-12 h-12 bg-white text-blue-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 "
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '<' : '>'}
          </button>
        </div>
      </div>
      {/* Контент сторінки */}
      <div className={clsx('flex-1', isOpen ? 'md:ml-64' : 'ml-0')}>
        {children}
      </div>
    </section>
  );
}

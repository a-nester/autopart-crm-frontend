'use client';

import { useState } from 'react';
import TimersSideBar from '@/components/TimersSideBar/TimersSideBar';
import clsx from 'clsx';

export default function Page({ children }: { children: React.ReactElement }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="flex flex-row p-3">
      {/* Бокове меню: фіксоване для мобільних, звичайне для планшетів і десктопів */}
      <div
        className={clsx(
          'md:relative md:block',
          isOpen ? 'fixed inset-0 z-50 bg-white' : 'hidden',
        )}
      >
        <TimersSideBar />
      </div>

      {/* Контент сторінки */}
      <div className="flex-1">{children}</div>

      {/* Кнопка відкриття сайдбара на мобільних */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-500 text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        Меню
      </button>
    </section>
  );
}

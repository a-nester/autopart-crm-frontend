'use client';

import React, { useState } from 'react';
import Sidebar from '../../components/sidebar';
import clsx from 'clsx';
import MobileMenu from '@/components/MobileMenu/MobileMenu';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isActive, setIsActive] = useState(true);

  return (
    <section className="flex">
      {/* Сайдбар для планшетів і десктопів */}
      <div className="hidden md:block z-50">
        <Sidebar isActive={isActive} setIsActive={setIsActive} />
      </div>
      {/* Контент */}
      <div
        className={clsx(
          'flex-1 transition-all min-h-screen pb-16 ', // Враховуємо моб. меню
          isActive ? 'md:ml-60' : 'md:ml-14',
        )}
      >
        {children}
      </div>
      {/* Мобільне меню */}
      <div className="fixed bottom-0 left-0 w-full md:hidden z-50">
        <MobileMenu />
      </div>
    </section>
  );
}

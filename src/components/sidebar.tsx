'use client';

import React from 'react';
import Image from 'next/image';
import SidebarItem from '@/components/sidebar-item';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import {
  HiShoppingCart,
  HiOutlineBriefcase,
  HiOutlineSquares2X2,
  HiOutlineClock,
  HiOutlineArrowLeftOnRectangle,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2';

export type SidebarProps = {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
};

export default function Sidebar({ isActive, setIsActive }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const handleExitClick = () => {
    router.push('/');
  };
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <aside
      className={clsx(
        'fixed top-0 left-0 z-40 h-screen transition-width duration-300 flex flex-col bg-gray-900 overflow-hidden',
        isActive ? 'w-60' : 'w-16',
      )}
    >
      {/* Логотип */}
      <div className="h-48 flex items-center justify-center w-full min-w-0">
        <Image width={122} height={25} src="/icons/logo.svg" alt="logo" />
      </div>

      {/* Основне меню (з вертикальним скролом) */}
      <div className="flex-1 overflow-y-auto w-full min-w-0">
        <ul className="space-y-7">
          <SidebarItem
            current={pathname === '/admin/dashboard'}
            pathname="/admin/dashboard"
            icon={<HiOutlineSquares2X2 className="w-6 h-6" />}
            alt="dashboard icon"
          >
            Dashboard
          </SidebarItem>
          <SidebarItem
            current={pathname === '/admin/companies'}
            pathname="/admin/companies"
            icon={<HiOutlineBriefcase className="w-6 h-6" />}
            alt="companies icon"
          >
            Companies
          </SidebarItem>
          <SidebarItem
            current={pathname === '/admin/orders'}
            pathname="/admin/orders"
            icon={<HiShoppingCart className="w-6 h-6" />}
            alt="orders icon"
          >
            Orders
          </SidebarItem>
          <SidebarItem
            current={pathname === '/admin/timers'}
            pathname="/admin/timers"
            icon={<HiOutlineClock className="w-6 h-6" />}
            alt="timers icon"
          >
            Timers
          </SidebarItem>
          <button
            className="flex items-center h-9 mx-1 gap-4"
            onClick={handleExitClick}
          >
            <SidebarItem
              pathname="/timers"
              icon={<HiOutlineArrowLeftOnRectangle className="w-6 h-6" />}
              alt="exit icon"
            >
              Exit
            </SidebarItem>
          </button>
        </ul>
      </div>

      {/* Кнопка "Згорнути" (ФІКСОВАНА ВНИЗУ) */}
      <div className="absolute bottom-0 w-full p-3 bg-gray-800">
        <button
          className="flex items-center h-9 w-full pl-4 text-white hover:bg-gray-700 rounded-lg"
          onClick={handleToggle}
        >
          {isActive ? (
            <HiChevronLeft className="w-6 h-6" />
          ) : (
            <HiChevronRight className="w-6 h-6" />
          )}
          <span className={clsx({ hidden: !isActive, 'ml-3': isActive })}>
            Згорнути
          </span>
        </button>
      </div>
    </aside>
  );
}

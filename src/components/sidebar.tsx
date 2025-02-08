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
        'fixed top-0 left-0 z-40 h-screen transition-width duration-300 flex flex-col',
        isActive ? 'w-60' : 'w-16',
      )}
    >
      <div className="flex flex-col h-full overflow-y-auto bg-gray-900">
        <div className="h-48">
          <Image
            className="py-8 mb-11 mx-auto"
            width={122}
            height={25}
            src="/icons/logo.svg"
            alt="logo"
          />
        </div>
        <ul className="space-y-7 flex-1">
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
          <SidebarItem
            pathname="/timers"
            icon={<HiOutlineArrowLeftOnRectangle className="w-6 h-6" />}
            alt="exit icon"
            onClick={handleExitClick}
          >
            Exit
          </SidebarItem>
        </ul>

        {/* Кнопка "Згорнути" закріплена внизу */}
        <div className="mt-auto p-3">
          <button
            className="flex items-center h-9 w-full pl-4 text-white hover:bg-gray-800 rounded-lg"
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
      </div>
    </aside>
  );
}

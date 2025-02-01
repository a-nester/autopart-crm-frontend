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
        'fixed top-0 left-0 z-40 h-screen transition-width duration-300',
        isActive ? 'w-60' : 'w-16',
      )}
    >
      <div className="flex flex-col h-full overflow-y-auto bg-gray-900">
        <Image
          className="py-8 mb-11 mx-auto"
          width={122}
          height={25}
          src="/icons/logo.svg"
          alt="logo"
        />
        <ul className="space-y-7">
          <SidebarItem
            current={pathname === '/admin/dashboard'}
            pathname="/admin/dashboard"
            icon={<HiOutlineSquares2X2 className="w-6 h-6" />}
            // src="/icons/squares.svg"
            alt="dashboard icon"
          >
            Dashboard
          </SidebarItem>
          <SidebarItem
            current={pathname === '/admin/companies'}
            pathname="/admin/companies"
            icon={<HiOutlineBriefcase className="w-6 h-6" />}
            // src="/icons/briefcase.svg"
            alt="companies icon"
          >
            Companies
          </SidebarItem>
          <SidebarItem
            current={pathname === '/admin/orders'}
            pathname="/admin/orders"
            icon={<HiShoppingCart className="w-6 h-6" />}
            // src="/icons/briefcase.svg"
            alt="companies icon"
          >
            Orders
          </SidebarItem>
          <SidebarItem
            current={pathname === '/admin/timers'}
            pathname="/admin/timers"
            // src="/icons/briefcase.svg"
            icon={<HiOutlineClock className="w-6 h-6" />}
            alt="companies icon"
            onClick={handleToggle}
          >
            Timers
          </SidebarItem>
        </ul>
        <button
          className="flex flex-row gap-2 p-6 mt-auto "
          onClick={handleExitClick}
        >
          <SidebarItem
            // current={pathname === '/timers'}
            pathname="/timers"
            // src="/icons/briefcase.svg"
            icon={<HiOutlineArrowLeftOnRectangle className="w-6 h-6" />}
            alt="companies icon"
            onClick={handleToggle}
          >
            Exit
          </SidebarItem>
          {/* <HiOutlineArrowLeftOnRectangle className="w-6 h-6" />
          <span className="font-medium text-white">Exit</span> */}
        </button>
      </div>
    </aside>
  );
}

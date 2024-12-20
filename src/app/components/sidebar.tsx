'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import SidebarItem from '@/app/components/sidebar-item';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';

export type SidebarProps = {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
};

export default function Sidebar({ isActive, setIsActive }: SidebarProps) {
  // const [isActive, setActive] = useState(true);
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
        isActive ? 'w-60' : 'w-12',
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
            current={pathname === '/dashboard'}
            pathname="/dashboard"
            src="/icons/squares.svg"
            alt="dashboard icon"
          >
            Dashboard
          </SidebarItem>
          <SidebarItem
            current={pathname === '/companies'}
            pathname="/companies"
            src="/icons/briefcase.svg"
            alt="companies icon"
          >
            Companies
          </SidebarItem>
          <SidebarItem
            current={pathname === '/orders'}
            pathname="/orders"
            src="/icons/briefcase.svg"
            alt="companies icon"
          >
            Orders
          </SidebarItem>
          <SidebarItem
            current={pathname === '/timers'}
            pathname="/timers"
            src="/icons/briefcase.svg"
            alt="companies icon"
            onClick={handleToggle}
          >
            Timers
          </SidebarItem>
        </ul>
        <button
          className="flex items-center gap-2 p-6 mt-auto mx-auto"
          onClick={handleExitClick}
        >
          <Image
            width={18}
            height={18}
            src="/icons/arrow-left-on-rectangle.svg"
            alt="exit icon"
          />
          <span className="font-medium text-white">Exit</span>
        </button>
      </div>
    </aside>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import SidebarItem from '@/components/sidebar-item';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import {
  // HiShoppingCart,
  // HiOutlineBriefcase,
  // HiOutlineSquares2X2,
  // HiOutlineClock,
  HiOutlineArrowLeftOnRectangle,
  HiChevronLeft,
  HiChevronRight,
} from 'react-icons/hi2';
import CommonAccordion from '@/ui/CommonAccordion/CommonAccordion';
import Link from 'next/link';

export type SidebarProps = {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
};

// const sidebarItems = [
//   {
//     id: 1,
//     name: 'Dashboard',
//     path: '/admin/dashboard',
//     icon: HiOutlineSquares2X2,
//     alt: 'dashboard icon',
//   },
//   {
//     id: 2,
//     name: 'Companies',
//     path: '/admin/companies',
//     icon: HiOutlineBriefcase,
//     alt: 'companies icon',
//   },
//   {
//     id: 3,
//     name: 'Orders',
//     path: '/admin/orders',
//     icon: HiShoppingCart,
//     alt: 'orders icon',
//   },
//   {
//     id: 4,
//     name: 'Timers',
//     path: '/admin/timers',
//     icon: HiOutlineClock,
//     alt: 'timers icon',
//   },
// ];

const sidebarItems = [
  {
    title: 'Автопарт',
    path: '/admin',
    submenu: [
      {
        title: 'Замовлення',
        path: '/admin/orders',
      },
      {
        title: 'Таймери',
        path: '/admin/timers/set',
      },
      {
        title: 'Встановлені таймери',
        path: '/admin/timers/setted',
      },
      {
        title: 'Вигрузка категорій Storm',
        path: '/admin/storm',
      },
    ],
  },

  {
    title: 'Amega Trans',
    path: '/admin',
    submenu: [
      {
        title: 'Рейси',
        path: '/admin/trips/',
      },
      {
        title: 'Ремонти',
        path: '/admin/repairs',
      },
    ],
  },
  {
    title: 'Налаштування',
    path: '/admin',
    submenu: [
      {
        title: 'Магазини',
        path: '/admin/shops/',
      },
    ],
  },
];

export default function Sidebar({ isActive, setIsActive }: SidebarProps) {
  const router = useRouter();
  // const pathname = usePathname();
  const handleExitClick = () => {
    router.push('/');
  };
  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <aside
      className={clsx(
        'fixed top-0 left-0 z-40 h-screen transition-width duration-300 flex flex-col bg-gray-900 overflow-hidden px-3',
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
          {sidebarItems.map(
            (elem, idx) =>
              elem.submenu ? (
                <li key={idx}>
                  <CommonAccordion
                    title={elem.title}
                    settings={{
                      root: 'text-blue-600',
                      title: 'py-0 px-0',
                      content: 'pl-0',
                    }}
                  >
                    <ul>
                      {elem.submenu.map((el, id) => (
                        <li key={id}>
                          <Link
                            href={el.path}
                            className="block py-1 text-left text-blue-600"
                            // onClick={onClose}
                          >
                            {el.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CommonAccordion>
                </li>
              ) : (
                <li key={idx}>
                  <Link
                    href={elem.path}
                    className="block py-1 text-left text-blue-600"
                    // onClick={onClose}
                  >
                    {elem.title}
                  </Link>
                </li>
              ),

            // <li key={id}>
            //   <SidebarItem
            //     current={pathname === elem.path}
            //     pathname={elem.path}
            //     icon={React.createElement(elem.icon, { className: 'w-6 h-6' })}
            //     alt={elem.alt}
            //   >
            //     {elem.name}
            //   </SidebarItem>
            // </li>
          )}

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

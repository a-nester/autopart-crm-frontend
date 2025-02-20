'use client';

import { HomeIcon, UserIcon } from '@heroicons/react/24/outline';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import Link from 'next/link';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import MobileDropMenu from '../MobileDropMenu/MobileDropMenu';

export default function MobileMenu() {
  const [isActiveMenu, setIsActiveMenu] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-md border-t fixed bottom-0 left-0 w-full flex justify-around py-3">
        <Link
          href={'/'}
          className="flex flex-col items-center text-gray-600 hover:text-blue-500"
        >
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs">Головна</span>
        </Link>
        <button
          className="flex flex-col items-center text-gray-600 hover:text-blue-500"
          onClick={() => {
            setIsActiveMenu(true);
          }}
        >
          <BsFillMenuButtonWideFill className="w-6 h-6" />
          <span className="text-xs">Menu</span>
        </button>
        <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <UserIcon className="w-6 h-6" />
          <span className="text-xs">Профіль</span>
        </button>
      </nav>

      {/* Виклик моддалки */}
      <Modal
        className={'w-full'}
        isOpen={isActiveMenu}
        onClose={() => {
          setIsActiveMenu(false);
        }}
      >
        <MobileDropMenu
          onClose={() => {
            setIsActiveMenu(false);
          }}
        />
      </Modal>
    </>
  );
}

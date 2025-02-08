'use client';

import {
  HomeIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

export default function MobileMenu() {
  return (
    <nav className="bg-white shadow-md border-t fixed bottom-0 left-0 w-full flex justify-around py-3">
      <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <HomeIcon className="w-6 h-6" />
        <span className="text-xs">Головна</span>
      </button>
      <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <ShoppingCartIcon className="w-6 h-6" />
        <span className="text-xs">Замовлення</span>
      </button>
      <button className="flex flex-col items-center text-gray-600 hover:text-blue-500">
        <UserIcon className="w-6 h-6" />
        <span className="text-xs">Профіль</span>
      </button>
    </nav>
  );
}

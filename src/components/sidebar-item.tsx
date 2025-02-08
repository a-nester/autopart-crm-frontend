import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
export interface SidebarItemProps {
  current?: boolean;
  pathname: string;

  icon: React.ReactNode;
  alt: string;
  children: React.ReactNode;
  onClick?: () => void;
}
export default function SidebarItem({
  current,
  pathname,
  icon,
  // alt,
  children,
  onClick,
}: SidebarItemProps) {
  return (
    <li>
      <Link
        href={pathname}
        onClick={onClick}
        className={clsx(
          'flex items-center h-9 mx-1 gap-4',
          current &&
            'after:h-full after:ml-auto after:border-2 after:border-purple-200 after:rounded-sm',
        )}
      >
        <div className="ml-5 text-zinc-50">{icon}</div> {/* Виводимо іконку */}
        <span className="font-medium text-zinc-50">{children}</span>
      </Link>
    </li>
  );
}

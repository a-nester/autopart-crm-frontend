'use client';

import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import clsx from 'clsx';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isActive, setIsActive] = useState(true);

  console.log('rendering');

  return (
    <>
      <Sidebar isActive={isActive} setIsActive={setIsActive} />
      <div className={clsx(isActive ? 'ml-60' : 'ml-14')}>{children}</div>;
    </>
  );
}

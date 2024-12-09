'use client';

import OrdersList from '@/app/components/orders/ordersList/ordersList';

export default function Page({}) {
  return (
    <div className="flex-col">
      <p>Product Timers. Bears </p>
      <OrdersList />
    </div>
  );
}

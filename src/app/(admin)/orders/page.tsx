'use client';

import OrdersList from '@/components/orders/ordersList/ordersList';

export default function Page({}) {
  return (
    <section className="flex flex-col p-3 gap-2">
      <p>Product Timers. Bears </p>
      <OrdersList />
    </section>
  );
}

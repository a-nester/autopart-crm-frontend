'use client';

import OrdersList from '@/components/orders/ordersList/ordersList';

export default function Page({}) {
  return (
    <section className="flex flex-col p-1 md:p-3 gap-2">
      <p className="m-auto">Замовлення</p>
      <OrdersList />
    </section>
  );
}

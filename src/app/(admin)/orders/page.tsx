'use client';

import { useEffect } from 'react';
import { useStore } from '../../../globalState/store';
import OrdersList from '@/app/components/orders/ordersList/ordersList';

export default function Page({}) {
  const fetchOrders = useStore((state) => state.fetchOrders);
  const orders = useStore((state) => state.orders);

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log('orders', orders);
  return (
    <div className="flex-col">
      <p>Product Timers. Bears </p>
      <OrdersList />
    </div>
  );
}

'use client';

import OrdersList from '@/components/orders/ordersList/ordersList';
import OrdersListSkeleton from '@/components/orders/OrdersListSkeleton/OrdersListSkeleton';
import ShopSelector from '@/components/orders/ShopSelector/ShopSelector';
import { useStore } from '@/globalState/store';
import { useEffect, useState } from 'react';

export default function Page({}) {
  const { shops, getAllStores } = useStore();
  const orders = useStore((state) => state.orders);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await getAllStores();
      setLoading(false);
    })();
  }, []);

  return (
    <section className="flex flex-col p-1 md:p-0 gap-2">
      <p className="m-auto">Замовлення</p>

      {loading ? (
        <OrdersListSkeleton />
      ) : (
        shops.length > 0 && (
          <>
            <ShopSelector shops={shops} />
            <OrdersList orders={orders} />
          </>
        )
      )}
    </section>
  );
}

'use client';

import { useEffect } from 'react';
import Order from '../order/order';
import { Order as OrderType } from '@/types/types';
import { useStore } from '@/globalState/store';

const DateSeparator = ({
  date,
  orderCount,
}: {
  date: string;
  orderCount: number;
}) => (
  <div className="flex items-center my-4">
    <div className="flex-grow border-t border-gray-700"></div>
    <span className="px-3 py-1 text-sm font-semibold bg-gray-800 text-gray-300 rounded-full mx-2">
      {date} {'к-ть зам:'} {orderCount}
    </span>
    <div className="flex-grow border-t border-gray-700"></div>
  </div>
);

export default function OrdersList() {
  const { orders, storesToFetch, fetchOrders } = useStore();

  useEffect(() => {
    if (storesToFetch.length > 0) {
      fetchOrders();
      const interval = setInterval(() => {
        fetchOrders();
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [storesToFetch, fetchOrders]);

  const formatDate = (dateCreated: string) => {
    return new Date(dateCreated).toLocaleDateString('uk-UA');
  };

  const ordersGroupedByDates = orders.reduce<Record<string, OrderType[]>>(
    (acc, order) => {
      const date = formatDate(order.date_created);
      acc[date] = acc[date] || [];
      acc[date].push(order);
      return acc;
    },
    {},
  );

  return (
    <section className="flex flex-col gap-2 bg-gray-100">
      <div className="flex flex-col gap-2">
        {Object.entries(ordersGroupedByDates).map(([date, orders]) => (
          <div key={date}>
            <DateSeparator date={date} orderCount={orders.length} />
            <ul>
              {orders.map((elem) => (
                <li key={elem.id}>
                  <Order elem={elem} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

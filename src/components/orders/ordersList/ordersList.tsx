'use client';

import { useStore } from '@/globalState/store';
// import CommonMultiSelect from '../../CommonComponents/CommonMultiSelect/CommonMultiSelect';
import { useEffect, useState } from 'react';
import Order from '../order/order';
import { Order as OrderType } from '@/types/types';

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

import dynamic from 'next/dynamic';
const CommonMultiSelect = dynamic(
  () =>
    import('../../CommonComponents/CommonMultiSelect/CommonMultiSelect.jsx'),
  {
    ssr: false,
  },
);

export default function OrdersList() {
  const { shops, addStores, fetchOrders } = useStore();
  const STORE_IDS = ['AvtoKlan', 'AutoAx', 'iDoAuto', 'ToAuto'];
  const [storesList, setStoresList] = useState<string[]>(shops);
  const orders = useStore((state) => state.orders);

  useEffect(() => {
    addStores(storesList);
  }, [storesList, addStores]);

  useEffect(() => {
    if (storesList.length > 0) fetchOrders();

    const interval = setInterval(() => {
      if (storesList.length > 0) fetchOrders();
    }, 60000);
    return () => clearInterval(interval);
  }, [storesList, fetchOrders]);

  const uniqueDates = [
    ...new Set(orders.map((order) => order.date_created.split('T')[0])),
  ];

  const formatDate = (dateCreated: string) => {
    return dateCreated.split('T')[0];
  };

  const ordersByDate = (elems: OrderType[], date: string) => {
    return elems.filter((elem) => formatDate(elem.date_created) === date);
  };

  return (
    <section className="flex flex-col gap-2 bg-gray-100">
      <CommonMultiSelect
        values={storesList}
        setValues={setStoresList}
        label={'Магазин'}
        multiple
      >
        {STORE_IDS}
      </CommonMultiSelect>
      <div className="flex flex-col gap-2">
        {uniqueDates.map((date) => (
          <div key={date}>
            {' '}
            <DateSeparator
              date={date}
              orderCount={ordersByDate(orders, date).length}
            />
            <ul>
              {ordersByDate(orders, date).map((elem) => (
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

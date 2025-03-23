'use client';

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

export default function OrdersList({ orders }: { orders: OrderType[] }) {
  const uniqueDates = [
    ...new Set(
      orders.map((order) =>
        new Date(order.date_created).toLocaleDateString('uk-UA'),
      ),
    ),
  ];

  const formatDate = (dateCreated: string) => {
    return new Date(dateCreated).toLocaleDateString('uk-UA');
  };

  const ordersByDate = (elems: OrderType[], date: string) => {
    return elems.filter((elem) => formatDate(elem.date_created) === date);
  };

  return (
    <section className="flex flex-col gap-2 bg-gray-100">
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

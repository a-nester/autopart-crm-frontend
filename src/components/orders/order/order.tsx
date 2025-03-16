'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import styles from './order.module.css';
import { Order as OrderType } from '@/types/types';
import { HiOutlinePercentBadge, HiOutlineShoppingCart } from 'react-icons/hi2';
import { FiUser } from 'react-icons/fi';
import CommonAccordion from '@/ui/CommonAccordion/CommonAccordion';
import OrderDetails from '../OrderDetails/OrderDetails';

export default function Order({
  elem,
}: {
  elem: OrderType;
}): JSX.Element | undefined {
  const order = elem;
  const statusStyle = (status: string) => {
    if (status === 'pending') return 'bg-green-200 text-green-700';
    if (status === 'delivered') return 'bg-gray-200 text-gray-700';
    if (status === 'canceled') return 'bg-red-200 text-red-700';
    if (status === 'received') return 'bg-yellow-200 text-yellow-700';
    if (status === 'paid') return 'bg-purple-200 text-purplu-700';
  };

  // const accordionSettings = {
  //   // root: 'm-0',
  //   content: 'max-h-full',
  //   // title: 'm-0',
  // };

  return (
    order && (
      <section className="w-full  flex flex-col flex-wrap md:flex-nowrap bg-white gap-3 border-[1px] rounded-lg p-2 text-sm md:text-lg">
        <div className="flex flex-row justify-between">
          <p className="flex justify-center">{order.promStoreId}</p>
          <div className="flex flex-row justify-between gap-2">
            <Link href={''} className="text-blue-700 hover:underline">
              № {order.id}
            </Link>
            <div>
              <span
                className={clsx(
                  'px-3 py-1 text-sm font-semibold rounded-full ',
                  statusStyle(order.status),
                )}
              >
                {order.status_name}
              </span>
            </div>
          </div>
          <p className="text-gray-500">
            {new Date(order.date_created).toLocaleString('uk-UA', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        {/*Block image and shop name */}
        <div className="flex flex-row p-1">
          <div className="max-w-28 min-w-16 max-h-28 min-h-16 object-contain p-1">
            <Image
              className="rounded-lg object-contain w-full h-full"
              src={order.products[0].image}
              alt="product image"
              width={100}
              height={100}
            />
          </div>
          {/*Block info */}
          <div className="flex flex-col justify-between gap-3 md:flex-row w-full p-1">
            <p
              className={clsx(
                styles.productText,
                'overflow-hidden overflow-ellipsis flex-1 min-w-0',
              )}
            >
              {order.products[0].name_multilang.uk}
            </p>

            {/*Price block */}
            <div className="flex justify-between md:flex-col">
              <p>
                <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 ">
                  <HiOutlineShoppingCart />
                  {order.full_price}
                </span>
              </p>

              <p>
                <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-full bg-slate-100">
                  <HiOutlinePercentBadge />
                  {order.cpa_commission.amount} грн
                </span>
              </p>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <FiUser /> {'  '}
              <p>
                {order.client_first_name} {order.client_last_name}
              </p>
            </div>
          </div>
        </div>

        <CommonAccordion title="Деталі Замовлення">
          <OrderDetails order={order}></OrderDetails>
        </CommonAccordion>
      </section>
    )
  );
}

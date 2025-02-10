import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import styles from './order.module.css';
import { Order as OrderType } from '@/types/types';

export default function Order({
  elem,
}: {
  elem: OrderType;
}): JSX.Element | undefined {
  // const orderId = id;
  const order = elem;

  const handleDetails = () => {
    console.log(elem);
  };

  const statusStyle = (status: string) => {
    if (status === 'pending') return 'bg-green-200 text-green-700';
    if (status === 'delivered') return 'bg-gray-200 text-gray-700';
    if (status === 'canceled') return 'bg-red-200 text-red-700';
    if (status === 'received') return 'bg-yellow-200 text-yellow-700';
  };

  return (
    order && (
      <section className="w-full md:h-36 flex flex-row flex-wrap md:flex-nowrap bg-white gap-3 border-[1px] rounded-lg p-1">
        {/*Block image and shop name */}
        <div className="p-1">
          <p className="flex justify-center">{order.promStoreId}</p>
          <div className="max-w-28 min-w-16 max-h-28 min-h-16 object-contain">
            <Image
              className="rounded-lg object-contain w-full h-full"
              src={order.products[0].image}
              alt="product image"
              width={100}
              height={100}
            />
          </div>
        </div>
        {/*Block info */}
        <div className="flex flex-col md:flex-row w-[265px] md:w-64 p-1">
          <div>
            <div className="flex flex-row justify-between">
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
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
            <p
              className={clsx(
                styles.productText,
                'overflow-hidden overflow-ellipsis',
              )}
            >
              {order.products[0].name_multilang.uk}
            </p>
          </div>
          {/*Price block */}
          <div className="flex justify-between md:flex-col">
            <p>{order.full_price}</p>
            <p>{order.products.length}шт.</p>
            <p>{order.cpa_commission.amount}</p>
          </div>
        </div>
        <button className="m-auto" onClick={handleDetails}>
          Log details
        </button>
      </section>
    )
  );
}

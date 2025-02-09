import { useStore } from '@/globalState/store';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import styles from './order.module.css';
import { Order } from '@/types/types';

export default function Order({
  elem,
}: {
  elem: Order;
}): JSX.Element | undefined {
  // const orderId = id;
  const order = elem;

  //   useStore((state) =>
  //   state.orders.find((elem) => elem.id === orderId),
  // );

  const handleDetails = () => {
    console.log(elem);
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
        <div className="flex flex-col md:flex-row w-64 md:w-56 p-1">
          <div>
            <Link href={''} className="text-blue-700 hover:underline">
              № {order.id}
            </Link>
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

import { useStore } from '@/globalState/store';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import styles from './order.module.css';

export default function Order({ id }: number) {
  const orderId = id;
  const order = useStore((state) =>
    state.orders.find((elem) => elem.id === orderId),
  );
  // console.log('order', order);

  return (
    order && (
      <section className="w-full h-36 flex flex-row bg-gray-100 gap-3 border-[1px] rounded-lg p-1">
        <div>
          <p className="flex justify-center">{order.promStoreId}</p>
          <div className="w-28 h-28 object-contain">
            <Image
              className="rounded-lg border-[1px] border-solid border-gray-400 object-contain w-full h-full"
              src={order.products[0].image}
              alt="product image"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="flex-col w-56">
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
        <div>
          <p>{order.full_price}</p>
          <p>{order.products.length}шт.</p>
          <p>{order.cpa_commission.amount}</p>
        </div>
      </section>
    )
  );
}

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
  console.log('order', order);

  return (
    order && (
      <section className="w-full flex flex-row bg-gray-50 gap-3 border-[1px] rounded-lg p-1">
        <Image
          className="rounded-lg border-[1px] border-solid border-gray-100"
          src={order.products[0].image}
          alt="product image"
          width={80}
          height={80}
        />
        <div className="flex-col w-56">
          <Link href={''}>№ {order.id}</Link>
          <p>
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
      </section>
    )
  );
}

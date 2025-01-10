'use client';

import { useStore } from '../../../globalState/store';
import { useEffect } from 'react';
import TimersProductItem from '@/app/components/TimersProductItem/TimersProductItem';

export default function Page({}) {
  const { products } = useStore();

  useEffect(() => {
    console.log('Products', products);
  }, [products]);

  return (
    <section className="flex-col p-4 gap-2">
      <p>Product Timers</p>
      <ul>
        {products.map((elem) => (
          <li key={elem.id} className="m-1">
            <TimersProductItem product={elem} />
          </li>
        ))}
      </ul>
    </section>
  );
}

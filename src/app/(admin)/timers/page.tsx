'use client';

import CommonMultiSelect from '@/app/components/CommonComponents/CommonMultiSelect/CommonMultiSelect';
import { useStore } from '../../../globalState/store';
import { useEffect, useState } from 'react';
import { getRootCategories } from '@/app/helpers/getCategories';
import Link from 'next/link';
import { Accordion } from '@mui/material';
import { CategoriesNav } from '@/app/components/CategoriesNav/CategoriesNav';
import TimersProductItem from '@/app/components/TimersProductItem/TimersProductItem';

export default function Page({}) {
  const { products } = useStore();

  useEffect(() => {
    console.log('Products', products);
  }, [products]);

  return (
    <section className="flex-col">
      <p>Product Timers</p>
      <ul>
        {products.map((elem) => (
          <li key={elem.id}>
            <TimersProductItem product={elem} />
          </li>
        ))}
      </ul>
    </section>
  );
}

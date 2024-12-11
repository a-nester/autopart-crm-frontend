'use client';

import CommonMultiSelect from '@/app/components/CommonComponents/CommonMultiSelect/CommonMultiSelect';
import { useStore } from '../../../globalState/store';
import { useEffect, useState } from 'react';
import { getRootCategories } from '@/app/helpers/getCategories';
import Link from 'next/link';
import { Accordion } from '@mui/material';
import { CategoriesNav } from '@/app/components/CategoriesNav/CategoriesNav';

export default function Page({}) {
  const {
    store,
    addStore,
    storeCategories,
    getStoreCategories,
    products,
    getProductsByCategoryId,
  } = useStore();
  const [fetchStore, setFetchStore] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const STORE_IDS = ['AvtoKlan', 'AutoAx', 'iDoAuto', 'ToAuto'];

  useEffect(() => {
    console.log('Products', products);
  }, [products]);

  return (
    <section className="flex-col">
      <p>Product Timers</p>
      {products.map((elem) => elem.name)}
    </section>
  );
}

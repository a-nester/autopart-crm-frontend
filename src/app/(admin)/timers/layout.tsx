'use client';

import CommonMultiSelect from '@/app/components/CommonComponents/CommonMultiSelect/CommonMultiSelect';
import { useStore } from '../../../globalState/store';
import { useEffect, useState } from 'react';
import { getRootCategories } from '@/app/helpers/getCategories';
import Link from 'next/link';
import { Accordion } from '@mui/material';
import { CategoriesNav } from '@/app/components/CategoriesNav/CategoriesNav';
import TimersSideBar from '@/app/components/TimersSideBar/TimersSideBar';

export default function Page({ children }) {
  //   const {
  //     store,
  //     addStore,
  //     storeCategories,
  //     getStoreCategories,
  //     products,
  //     getProductsByCategoryId,
  //   } = useStore();
  //   const [fetchStore, setFetchStore] = useState([]);
  //   const [subCategory, setSubCategory] = useState([]);
  //   const [categoryId, setCategoryId] = useState(null);
  //   const STORE_IDS = ['AvtoKlan', 'AutoAx', 'iDoAuto', 'ToAuto'];

  return (
    <section className="flex flex-row p-3">
      <TimersSideBar />
      {children}
    </section>
  );
}

'use client';

import CommonMultiSelect from '@/components/CommonComponents/CommonMultiSelect/CommonMultiSelect';
import { useStore } from '../../globalState/store';
import { useEffect, useState } from 'react';
import { getRootCategories } from '@/helpers/getCategories';
import { CategoriesNav } from '@/components/CategoriesNav/CategoriesNav';

export default function TimersSideBar() {
  const { addStore, storeCategories, getStoreCategories } = useStore();
  const [fetchStore, setFetchStore] = useState('');
  // const [subCategory, setSubCategory] = useState([]);
  // const [categoryId, setCategoryId] = useState(null);
  const STORE_IDS = ['AvtoKlan', 'AutoAx', 'iDoAuto', 'ToAuto'];

  useEffect(() => {
    if (fetchStore) {
      addStore(fetchStore);
      getStoreCategories();
    }
  }, [fetchStore, addStore, getStoreCategories]);
  //   console.log(storeCategories);
  const rootCategories = getRootCategories(storeCategories);
  //   console.log(rootCategories);

  return (
    <section className="h-screen flex flex-col gap-3 ">
      <CommonMultiSelect
        values={fetchStore}
        setValues={setFetchStore}
        label={'Store'}
      >
        {STORE_IDS}
      </CommonMultiSelect>
      <CategoriesNav>{rootCategories}</CategoriesNav>
    </section>
  );
}

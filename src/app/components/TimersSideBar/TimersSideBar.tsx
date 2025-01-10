'use client';

import CommonMultiSelect from '@/app/components/CommonComponents/CommonMultiSelect/CommonMultiSelect';
import { useStore } from '../../../globalState/store';
import { useEffect, useState } from 'react';
import { getRootCategories } from '@/app/helpers/getCategories';
import { CategoriesNav } from '@/app/components/CategoriesNav/CategoriesNav';

export default function TimersSideBar() {
  const { addStore, storeCategories, getStoreCategories } = useStore();
  const [fetchStore, setFetchStore] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const STORE_IDS = ['AvtoKlan', 'AutoAx', 'iDoAuto', 'ToAuto'];

  useEffect(() => {
    if (fetchStore) {
      addStore(fetchStore);
      getStoreCategories();
    }
  }, [fetchStore]);

  //   console.log(storeCategories);
  const rootCategories = getRootCategories(storeCategories);
  //   console.log(rootCategories);

  return (
    <section className="flex flex-col min-w-72 ">
      <CommonMultiSelect values={fetchStore} setValues={setFetchStore}>
        {STORE_IDS}
      </CommonMultiSelect>
      <CategoriesNav className="w-auto">{rootCategories}</CategoriesNav>
    </section>
  );
}

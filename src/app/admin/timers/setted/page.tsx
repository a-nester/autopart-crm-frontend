'use client';

import { useEffect, useState } from 'react';

import CommonMultiSelect from '@/components/CommonComponents/CommonMultiSelect/CommonMultiSelect';
import { STORE_IDS } from '@/constants/constants';
import { useStore } from '@/globalState/store';
import TimersProductItem from '@/components/TimersProductItem/TimersProductItem';

export default function Page() {
  const {
    addStore,
    getProductDiscountTimer,
    shop,
    products,
    productsWithTimer,
    getProductsByIdList,
  } = useStore();
  const [fetchStore, setFetchStore] = useState('');

  useEffect(() => {
    if (fetchStore) {
      addStore(fetchStore);
      getProductDiscountTimer(fetchStore);
    }
  }, [fetchStore, addStore]);

  useEffect(() => {
    if (productsWithTimer) getProductsByIdList(productsWithTimer);
  }, [productsWithTimer]);

  return (
    <section className="flex flex-col gap-3 min-w-52 max-w-32 ">
      <CommonMultiSelect values={fetchStore} setValues={setFetchStore}>
        {STORE_IDS}
      </CommonMultiSelect>

      <ul className="max-w-[600px] min-w-[360px]">
        {products.map((elem) => (
          <li key={elem.id} className="m-1">
            <TimersProductItem product={elem} shop={shop} />
          </li>
        ))}
      </ul>
    </section>
  );
}

'use client';

import { useStore } from '@/globalState/store';
import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { Store } from '@/types/types.js';
const CommonMultiSelect = dynamic(
  () =>
    import('../../CommonComponents/CommonMultiSelect/CommonMultiSelect.jsx'),
  {
    ssr: false,
  },
);

export default function ShopSelector({ shops }: { shops: Store[] }) {
  const { addStores } = useStore();
  const [storesList, setStoresList] = useState<Store[]>(shops);

  useEffect(() => {
    addStores(storesList);
  }, [storesList]);

  return (
    <>
      <CommonMultiSelect
        values={storesList}
        setValues={setStoresList}
        label={'Магазин'}
        multiple
      >
        {shops}
      </CommonMultiSelect>
    </>
  );
}

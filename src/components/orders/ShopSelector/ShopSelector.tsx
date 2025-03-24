'use client';

import { useStore } from '@/globalState/store';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const CommonMultiSelect = dynamic(
  () =>
    import('../../CommonComponents/CommonMultiSelect/CommonMultiSelect.jsx'),
  {
    ssr: false,
  },
);

export default function ShopSelector({ shops }: { shops: string[] }) {
  const { addStores } = useStore();
  const [storesList, setStoresList] = useState<string[]>(shops);

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

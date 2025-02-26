'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/globalState/store';
import CommonMultiSelect from '@/components/CommonComponents/CommonMultiSelect/CommonMultiSelect';

// export type PageProps = object;

export default function Page() {
  const { addStore, getStoreCategories } = useStore();
  const [fetchStore, setFetchStore] = useState('');
  const STORE_IDS = ['AvtoKlan', 'AutoAx', 'iDoAuto', 'ToAuto'];

  useEffect(() => {
    if (fetchStore) {
      addStore(fetchStore);
      //   getStoreCategories();
    }
  }, [fetchStore, addStore, getStoreCategories]);

  return (
    <section className="flex flex-col gap-3 min-w-52 max-w-32 ">
      <CommonMultiSelect
        values={fetchStore}
        setValues={setFetchStore}
        label={'Store'}
      >
        {STORE_IDS}
      </CommonMultiSelect>
    </section>
  );
}

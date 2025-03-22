'use client';

import Button from '@/components/CommonComponents/Button/Button';
import CommonMultiSelect from '@/components/CommonComponents/CommonMultiSelect/CommonMultiSelect';
import CategoriesListElement from '@/components/storm/CategoriesListElement/CategoriesListElement';
import { useStore } from '@/globalState/store';
import { getRootCategories } from '@/helpers/getCategories';
import { ExcellGroup } from '@/types/types';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

// type Group = {
//   _id: string;
//   name: string;
//   code: number;
// };

export default function Page() {
  const { excellGroups, getExcellGroups } = useStore();
  const [checkedItems, setChecked] = useState<{ [id: string]: boolean }>({});
  const { shop, addStore, storeCategories, getStoreCategories } = useStore();
  const [fetchStore, setFetchStore] = useState('');

  const STORE_IDS = ['AvtoKlan', 'AutoAx', 'iDoAuto', 'ToAuto'];

  const groupFilter = {};

  useEffect(() => {
    if (fetchStore) {
      addStore(fetchStore);
      if (shop) getStoreCategories();
    }
  }, [fetchStore]);

  const rootCategories = getRootCategories(storeCategories);

  useEffect(() => {
    getExcellGroups(groupFilter);
  }, [getExcellGroups]);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt);

    const { name, checked } = evt.target;
    setChecked((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSave = () => {
    console.log(
      Object.keys(checkedItems)
        .filter((key) => checkedItems[key] === true)
        .map((elem) =>
          Object({
            _id: elem,
            code: excellGroups.filter((el) => el._id === elem)[0].code,
            name: excellGroups.filter((el) => el._id === elem)[0].name,
            promData: {},
          }),
        ),
    );
  };

  console.log(excellGroups);

  return (
    <section className="p-2">
      <Box className="flex flex-row items-center gap-3 min-w-52 max-w-96 mb-3">
        <CommonMultiSelect
          values={fetchStore}
          setValues={setFetchStore}
          label={'Store'}
        >
          {STORE_IDS}
        </CommonMultiSelect>
        <Button onClick={handleSave} disabled={fetchStore ? false : true}>
          Save
        </Button>
      </Box>
      {excellGroups.map((group: ExcellGroup) => (
        <CategoriesListElement
          key={group._id}
          group={group}
          checkedItems={checkedItems}
          setChecked={handleChange}
          promRootCategories={rootCategories}
        />
      ))}
    </section>
  );
}

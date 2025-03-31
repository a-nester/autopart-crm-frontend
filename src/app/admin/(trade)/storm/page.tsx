'use client';

import Button from '@/components/CommonComponents/Button/Button';
import CommonMultiSelect from '@/components/CommonComponents/CommonMultiSelect/CommonMultiSelect';
import CategoriesListElement from '@/components/storm/CategoriesListElement/CategoriesListElement';
import { useStore } from '@/globalState/store';
import { getRootCategories } from '@/helpers/getCategories';
import { ExcellGroup } from '@/types/types';
import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

// type Group = {
//   _id: string;
//   name: string;
//   code: number;
// };

export default function Page() {
  const { excellGroups, getExcellGroups } = useStore();
  const { shop, addStore, storeCategories, getStoreCategories } = useStore();
  const [checkedItems, setChecked] = useState<{ [id: string]: boolean }>({});
  const [fetchStore, setFetchStore] = useState('');
  const [filter, setFilter] = useState('');
  const [filtered, setFiltered] = useState(excellGroups);
  const [perPage, setPerPage] = useState('');

  const STORE_IDS = ['AvtoKlan', 'AutoAx', 'iDoAuto', 'ToAuto'];
  const PERPAGE_IDS = ['20', '50', '100', '200', '500'];
  const page = 1;
  const groupFilter = {
    page,
    perPage: Number(perPage),
  };
  // console.log(excellGroups);

  useEffect(() => {
    setFiltered(excellGroups);
  }, [excellGroups]);

  useEffect(() => {
    const filtered = excellGroups.filter((elem) =>
      elem.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
    );
    setFiltered(filtered);
  }, [filter]);

  useEffect(() => {
    if (fetchStore) {
      addStore(fetchStore);
    }
  }, [fetchStore]);

  useEffect(() => {
    if (shop) getStoreCategories();
  }, [shop]);

  const rootCategories = getRootCategories(storeCategories);

  useEffect(() => {
    getExcellGroups(groupFilter);
  }, [getExcellGroups, page, perPage]);

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

  return (
    <section className="p-2">
      <Box className="flex flex-row items-center gap-3 min-w-52 max-w-96 mb-3">
        <CommonMultiSelect
          values={fetchStore || ''}
          setValues={setFetchStore}
          label={'Магазин'}
        >
          {STORE_IDS}
        </CommonMultiSelect>
        <Button onClick={handleSave} disabled={fetchStore ? false : true}>
          Save
        </Button>
        <TextField
          label={'Фільтр'}
          value={filter || ''}
          onChange={(evt) => setFilter(evt.target.value)}
        ></TextField>
        <CommonMultiSelect
          values={perPage}
          setValues={setPerPage}
          label={'На сторінці'}
        >
          {PERPAGE_IDS}
        </CommonMultiSelect>
      </Box>
      {filtered.map((group: ExcellGroup) => (
        <CategoriesListElement
          key={group._id}
          group={group}
          checkedItems={checkedItems}
          setChecked={handleChange}
          promRootCategories={rootCategories}
          fieldDisabled={fetchStore === ''}
          shop={shop}
          promStoreCategories={storeCategories}
        />
      ))}
    </section>
  );
}

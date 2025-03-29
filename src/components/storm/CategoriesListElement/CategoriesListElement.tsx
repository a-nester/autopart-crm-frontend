'use client';

import Button from '@/components/CommonComponents/Button/Button';
import GroupPicker from '@/components/storm/GroupPicker/GroupPicker';
import { useStore } from '@/globalState/store';
import { PromGroup } from '@/types/types';
import { Box, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

type Group = {
  _id: string;
  name: string;
  code: number;
  promGroup?: {
    [shop: string]: {
      id: number;
      discountValue: number;
    };
  };
};

type PropTypes = {
  group: Group;
  checkedItems: { [id: string]: boolean };
  setChecked: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  promRootCategories: PromGroup[];
  fieldDisabled: boolean;
  shop: string;
  promStoreCategories: PromGroup[];
};

export default function CategoriesListElement({
  group,
  checkedItems,
  setChecked,
  promRootCategories,
  fieldDisabled,
  shop,
  promStoreCategories,
}: PropTypes) {
  const { setGroupConnections } = useStore();
  const [promGroup, setPromGroup] = useState<PromGroup | undefined>();
  const [discount, setDiscount] = useState<number | undefined>();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setDiscount(group?.promGroup?.[shop]?.discountValue);
    const filteredCatName = promStoreCategories.filter(
      (elem) => elem.id === group?.promGroup?.[shop]?.id,
    );
    console.log('filteredCatName', filteredCatName);

    setPromGroup(filteredCatName[0]);
  }, [shop, group, promStoreCategories]);

  const handleGroupSave = (elem: PromGroup) => {
    setPromGroup(elem);
    setIsFocused(false);
  };

  const handleConnect = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    if (promGroup) {
      const groupData = {
        excellGroupId: group.code,
        promGroup: {
          id: promGroup.id,
          name: promGroup.name,
          discountValue: discount,
          discountType: 'percent',
        },
        promShop: shop[0],
      };
      setGroupConnections(groupData);
    }
  };

  return (
    <section key={group._id} className="p-2">
      <form className="flex flex-col gap-4">
        <label>
          <Box className="flex flex-col md:flex-row gap-4 justify-between items-left">
            <Box className="flex gap-2">
              <p className="min-w-14">{group.code}</p>
              <input
                className="w-4"
                type="checkbox"
                name={group._id}
                checked={!!checkedItems[group._id] || false}
                onChange={setChecked}
              />
              <Typography textAlign={'center'} className="max-w-52">
                {group.name}
              </Typography>
            </Box>

            <Box className="flex gap-2 ">
              <TextField
                className="relative"
                size="small"
                label="Prom Group"
                value={promGroup?.name || ''}
                onFocus={() => setIsFocused(true)}
                // onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                InputLabelProps={{ shrink: true }} //  фіксація label
                disabled={fieldDisabled}
              ></TextField>

              <Button onClick={handleConnect}>+</Button>
              <TextField
                value={discount}
                onChange={(evt) => setDiscount(Number(evt.target.value))}
                size="small"
                className="w-24"
                label="Знижка,%"
              ></TextField>
            </Box>
          </Box>
        </label>
      </form>
      {isFocused && (
        <GroupPicker
          className="absolute top-14 w-full shadow-lg rounded-lg z-100"
          searchName={''}
          onSave={handleGroupSave}
          onClose={() => setIsFocused(false)}
        >
          {promRootCategories}
        </GroupPicker>
      )}
    </section>
  );
}

'use client';

import Button from '@/components/CommonComponents/Button/Button';
import GroupPicker from '@/components/storm/GroupPicker/GroupPicker';
import { PromGroup } from '@/types/types';
import { Box, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

type Group = {
  _id: string;
  name: string;
  code: number;
};

type PropTypes = {
  group: Group;
  checkedItems: { [id: string]: boolean };
  setChecked: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  promRootCategories: PromGroup[];
};

export default function CategoriesListElement({
  group,
  checkedItems,
  setChecked,
  promRootCategories,
}: PropTypes) {
  const [promGroup, setPromGroup] = useState<PromGroup>();
  const [isFocused, setIsFocused] = useState(false);

  const handleGroupSave = (elem: PromGroup) => {
    setPromGroup(elem);
    setIsFocused(false);
  };

  useEffect(() => {
    console.log(promGroup);
  }, [promGroup]);
  return (
    <section key={group._id} className="p-2">
      <form className="flex flex-col gap-4">
        <label>
          <Box className="flex flex-row gap-4 justify-between items-center">
            <Box className="flex gap-2">
              <p className="min-w-14">{group.code}</p>
              <input
                className="w-4"
                type="checkbox"
                name={group._id}
                checked={!!checkedItems[group._id] || false}
                onChange={setChecked}
              />
            </Box>
            <Typography textAlign={'center'} className="max-w-52">
              {group.name}
            </Typography>
            <Box className="flex gap-2 ">
              <TextField
                className="relative"
                size="small"
                label="Prom Group"
                value={promGroup?.name || ''}
                onFocus={() => setIsFocused(true)}
                // onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                InputLabelProps={{ shrink: true }} //  фіксація label
              ></TextField>

              <Button>+</Button>
              <TextField
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

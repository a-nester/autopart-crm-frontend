'use client';

import Button from '@/components/CommonComponents/Button/Button';
import GroupPicker from '@/components/storm/GroupPicker/GroupPicker';
import { useStore } from '@/globalState/store';
import { PromGroup } from '@/types/types';
import CommonAccordion from '@/ui/CommonAccordion/CommonAccordion';
import { Box, TextField, Typography } from '@mui/material';
import clsx from 'clsx';
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
  const { setGroupConnections, setDataToProm } = useStore();
  const [promGroup, setPromGroup] = useState<PromGroup | undefined>(undefined);
  const [discount, setDiscount] = useState<number | undefined>(0);
  const [isFocused, setIsFocused] = useState(false);
  const [accordionState, setAccordionState] = useState(false);

  useEffect(() => {
    setDiscount(group?.promGroup?.[shop]?.discountValue);
    const filteredCatName = promStoreCategories.filter(
      (elem) => elem.id === group?.promGroup?.[shop]?.id,
    );

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

  const handleSet = () => {
    setDataToProm({ group: group.code, store: shop });
  };

  const handleSetAccordionState = () => {
    setAccordionState((prev) => !prev);
  };
  return (
    <section
      key={group._id}
      className={clsx(
        'p-2 w-full',
        promGroup !== undefined
          ? 'p-2  border-[2px] border-solid border-purple-500 rounded-lg'
          : '',
      )}
    >
      <form className="flex flex-col w-full gap-4">
        <label>
          <Box className="flex flex-col w-full md:flex-row gap-2 justify-between items-left">
            <Box className="flex gap-2 w-full justify-between">
              <Box className="flex items-center">
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
              <Button
                type="button"
                className="rounded-full"
                onClick={() => {
                  setAccordionState((prev) => !prev);
                }}
              >
                +
              </Button>
            </Box>

            <CommonAccordion
              externalBtn
              externalState={accordionState}
              title="Деталі"
              settings={{ content: 'flex flex-col gap-2' }}
            >
              <>
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
                    value={discount ?? 0}
                    onChange={(evt) => setDiscount(Number(evt.target.value))}
                    size="small"
                    className="w-24"
                    label="Знижка,%"
                  ></TextField>
                </Box>
                <Box className="flex gap-1">
                  <TextField
                    label={'Link'}
                    size="small"
                    className="w-full"
                  ></TextField>
                  <Button>Parse</Button>
                  <Button onClick={handleSet}>SetData</Button>
                </Box>
              </>
            </CommonAccordion>
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

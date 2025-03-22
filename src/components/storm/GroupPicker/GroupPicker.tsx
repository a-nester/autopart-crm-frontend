'use client';

import { PromGroup } from '@/types/types';
import clsx from 'clsx';
import CategoriesSelector from '../CategoriesSelector/CategoriesSelector';
import Button from '@/components/CommonComponents/Button/Button';
import { Box } from '@mui/material';

type Props = {
  children: PromGroup[];
  className: string;
  searchName: string;
  onClose: () => void;
  onSave: (elem: PromGroup) => void;
};

export default function GroupPicker({
  children,
  className,
  searchName,
  onClose,
  onSave,
}: Props) {
  const filtered =
    searchName.trim() === ''
      ? children
      : children.filter((elem) =>
          elem.name.toLowerCase().includes(searchName.toLowerCase()),
        );
  console.log('Entries', children);

  return (
    <section
      className={clsx(
        'absolute bg-white p-4 shadow-lg rounded-lg z-50  overflow-auto',
        className,
      )}
    >
      <Box className="flex justify-between">
        <h2>Список </h2>
        <Button onClick={onClose}>x</Button>
      </Box>
      <CategoriesSelector onSave={onSave}>{filtered}</CategoriesSelector>
    </section>
  );
}

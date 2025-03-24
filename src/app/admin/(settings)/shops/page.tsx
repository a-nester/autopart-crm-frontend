'use client';

import Button from '@/components/CommonComponents/Button/Button';
import { useStore } from '@/globalState/store';
import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Page() {
  const { shops, getAllStores, createStore } = useStore();
  const [newStore, setNewStore] = useState('');

  useEffect(() => {
    getAllStores();
  }, [getAllStores]);

  const handleClick = () => {
    console.log(newStore);
    createStore(newStore);
  };

  return (
    <section className="p-2">
      <Box className="flex gap-2">
        <TextField
          size={'small'}
          label={'Новий магазин'}
          onChange={(evt) => setNewStore(evt.target.value)}
        ></TextField>
        <Button onClick={handleClick}>Додати</Button>
      </Box>
      <ul>
        {shops.map((shop, idx) => (
          <li key={idx}>
            <p>{shop}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

'use client';

import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';

import { useState } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function CommonMultiSelect({ children, values, setValues }) {
  const STORE_IDS = children;

  const handleChange = (evt) => {
    const {
      target: { value },
    } = evt;
    // console.log(target);

    setValues(typeof value === 'string' ? value.split(',') : value);
    // addStores();
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Store</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        multiple
        value={values}
        onChange={handleChange}
        input={<OutlinedInput label="Store" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
        {STORE_IDS.map((elem) => (
          <MenuItem key={elem} value={elem}>
            <Checkbox checked={values.includes(elem)} />
            <ListItemText primary={elem} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CommonMultiSelect;

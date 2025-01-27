'use client';

import { useStore } from '../../../globalState/store';
import { useEffect, useState } from 'react';
import TimersProductItem from '@/components/TimersProductItem/TimersProductItem';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

export default function Page({}) {
  const { products } = useStore();
  const { store } = useStore();
  const [isAvailable, setIsAvailable] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (isAvailable) {
      setFilteredProducts(
        products.filter(
          (el) => el.quantity_in_stock !== null && el.quantity_in_stock > 0,
        ),
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, isAvailable]);

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    checked: boolean,
  ) => {
    setIsAvailable(checked);
  };

  return (
    <section className="flex-col p-4 gap-2">
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={isAvailable} />}
          label="В наявності"
          onChange={handleChange}
        />
        {/* <FormControlLabel required control={<Checkbox />} label="Required" /> */}
        {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
      </FormGroup>

      <ul>
        {filteredProducts.map((elem) => (
          <li key={elem.id} className="m-1">
            <TimersProductItem product={elem} shop={store} />
          </li>
        ))}
      </ul>
    </section>
  );
}

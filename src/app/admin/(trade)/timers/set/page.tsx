'use client';

import { useEffect, useState } from 'react';
import TimersProductItem from '@/components/TimersProductItem/TimersProductItem';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material';
import { useStore } from '@/globalState/store';
import CommonPagination from '@/components/CommonComponents/CommonPagination/CommonPagination';

export default function Page({}) {
  const { products } = useStore();
  const { shop } = useStore();

  const { getProductDiscountTimer } = useStore();
  const [isAvailable, setIsAvailable] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(20);

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (shop.length !== 0) {
      getProductDiscountTimer(shop[0]);
    }
  }, [shop, getProductDiscountTimer]);

  useEffect(() => {
    let filtered = products;

    if (isAvailable) {
      filtered = filtered.filter((el) => el.presence !== 'not_available');
    }

    if (search.trim() !== '') {
      filtered = filtered.filter((el) =>
        el.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    // console.log(filtered);

    setFilteredProducts(filtered);
  }, [products, isAvailable, search]);

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    checked: boolean,
  ) => {
    setIsAvailable(checked);
  };

  // const handleSetPerPage = () => {
  //   setPerPage(perPage);
  // };

  return (
    <section className="flex flex-col items-center p-1 md:p-4 gap-2">
      <p>Встановити цінові таймери</p>
      <FormGroup>
        <TextField
          onChange={(evt) => {
            setSearch(evt.target.value);
          }}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
        />
        <FormControlLabel
          control={<Checkbox checked={isAvailable} />}
          label="В наявності"
          onChange={handleChange}
        />
        {/* <FormControlLabel required control={<Checkbox />} label="Required" /> */}
        {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
      </FormGroup>
      <CommonPagination
        elements={filteredProducts.length}
        perPage={perPage}
        page={page}
        setPage={setPage}
      ></CommonPagination>

      <ul className="max-w-[600px] min-w-[360px]">
        {filteredProducts
          .slice((page - 1) * perPage, page * perPage)
          .map((elem) => (
            <li key={elem.id} className="m-1">
              <TimersProductItem product={elem} shop={shop} />
            </li>
          ))}
      </ul>
    </section>
  );
}

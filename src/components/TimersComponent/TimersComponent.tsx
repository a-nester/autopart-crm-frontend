import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { SelectChangeEvent } from '@mui/material/Select';
import { TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { priceWithDiscountCalc } from '@/helpers/priceWithDiscountCalc';

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

const types = ['percent', 'amount'];

export const TimersComponent = ({
  price,
  discount,
  setDiscount,
  discountType,
  setDiscountType,
  name,
}: {
  price: number | null;
  discount: number | undefined;
  setDiscount: (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  discountType: string | undefined;
  setDiscountType: (evt: SelectChangeEvent<string>) => void;
  name: string;
}) => {
  // const theme = useTheme();

  // Локальне збереження типу знижки (уникнення uncontrolled to controlled)
  const [localDiscountType, setLocalDiscountType] = useState(
    discountType ?? 'percent',
  );

  useEffect(() => {
    if (discountType) {
      setLocalDiscountType(discountType);
    }
  }, [discountType]);

  return (
    <section>
      <div className="flex flex-row gap-1 h-10">
        {/* Поле введення знижки */}
        <TextField
          label={name}
          variant="outlined"
          value={discount ?? ''}
          onChange={setDiscount}
          fullWidth
          slotProps={{
            input: {
              sx: {
                height: 40,
              },
            },
          }}
        />

        {/* Вибір типу знижки */}
        <Select
          labelId="Type"
          id="dayDiscountType"
          value={localDiscountType}
          onChange={(evt) => {
            setLocalDiscountType(evt.target.value);
            setDiscountType(evt);
          }}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          sx={{ width: 200 }}
        >
          {types.map((type) => (
            <MenuItem key={type} value={type}>
              {type === 'percent' ? '%' : 'грн'}
            </MenuItem>
          ))}
        </Select>

        {/* Поле відображення ціни зі знижкою */}
        <TextField
          label="Price"
          variant="outlined"
          value={
            priceWithDiscountCalc(price, {
              type: localDiscountType,
              value: discount,
            }) ?? ''
          }
          fullWidth
          slotProps={{
            input: {
              sx: {
                height: 40,
              },
            },
          }}
        />
      </div>
    </section>
  );
};

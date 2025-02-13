import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { SelectChangeEvent } from '@mui/material/Select';
import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { priceWithDiscountCalc } from '@/helpers/priceWithDiscountCalc';

// const BootstrapInput = styled(InputBase)(({ theme }) => ({
//   'label + &': {
//     marginTop: theme.spacing(2),
//   },
//   '& .MuiInputBase-input': {
//     borderRadius: 10,
//     position: 'relative',
//     backgroundColor: theme.palette.background.paper,
//     border: '1px solid #ced4da',
//     fontSize: 16,
//     padding: '10px 26px 10px 12px',
//     transition: theme.transitions.create(['border-color', 'box-shadow']),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       '-apple-system',
//       'BlinkMacSystemFont',
//       '"Segoe UI"',
//       'Roboto',
//       '"Helvetica Neue"',
//       'Arial',
//       'sans-serif',
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(','),
//     '&:focus': {
//       borderRadius: 10,
//       borderColor: '#80bdff',
//       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
//     },
//   },
// }));

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
      //   borderRadius: 10,
    },
  },
};

const types = ['percent', 'amount'];

function getStyles(name: string, personName: string, theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

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
  const theme = useTheme();

  return (
    <section>
      <div className="flex flex-row gap-1 h-10">
        <TextField
          label={name}
          variant="outlined"
          value={discount ?? ''} // Прив'язка до стану
          onChange={(evt) => {
            setDiscount(evt);
          }} // Обробка змін
          fullWidth
          slotProps={{
            input: {
              sx: {
                height: 40, // Висота елемента
              },
            },
          }}
        />
        <Select
          labelId="Type"
          id="dayDiscountType"
          value={discountType}
          onChange={(evt) => {
            setDiscountType(evt);
          }}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          sx={{
            width: 200,
          }}
        >
          {types.map((type) => (
            <MenuItem
              key={type}
              value={type}
              style={getStyles(type, discountType ?? '', theme)}
            >
              {type === 'percent' ? '%' : 'грн'}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Price"
          variant="outlined"
          value={
            priceWithDiscountCalc(price, {
              type: discountType,
              value: discount,
            }) ?? ''
          } // Прив'язка до стану
          //   onChange={handleChangeDayDiscount}
          fullWidth
          slotProps={{
            input: {
              sx: {
                height: 40, // Висота елемента
              },
            },
          }}
        />
      </div>
    </section>
  );
};

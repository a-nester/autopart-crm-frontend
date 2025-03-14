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

function CommonMultiSelect({ children, values, setValues, label, ...props }) {
  const SELECT_LIST = children;

  const handleChange = (evt) => {
    const {
      target: { value },
    } = evt;

    setValues(typeof value === 'string' ? value.split(',') : value);
  };
  return (
    <FormControl fullWidth {...props}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={values}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
        {...props}
      >
        {SELECT_LIST.map((elem) => (
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

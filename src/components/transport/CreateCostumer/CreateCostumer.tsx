import Button from '@/components/CommonComponents/Button/Button';
import { Customer } from '@/types/types';
import { Box, TextField } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';

type Props = {
  onClose: () => void;
  className: string;
  customer: string;
  onChangeName: ({ name }: Customer) => void;
};

export default function CreateCostumer({
  onClose,
  className,
  customer,
  onChangeName,
}: Props) {
  const [phone, setPhone] = useState('+38');
  const [error, setError] = useState(false);

  const handleChangeTel = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(evt.target.value);
    setError(!/^\+380\d{9}$/.test(evt.target.value));
  };
  return (
    <section
      className={clsx(
        'fixed bottom-0 left-0 bg-white p-4 shadow-lg rounded-lg z-50 ',
        className,
      )}
    >
      <Box className="flex flex-col gap-0 pt-2 overflow-y-auto">
        <TextField
          className="w-full"
          label="Назва контрагента"
          id="name"
          variant="outlined"
          value={customer}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
            onChangeName({ name: evt.target.value })
          }
          helperText=" "
        ></TextField>
        <TextField
          className="w-full"
          label="Номер телефону"
          id="tel"
          type="tel"
          value={phone}
          onChange={handleChangeTel}
          helperText={error ? 'Формат: +380 123456789' : ' '}
        ></TextField>
        <TextField
          className="w-full"
          label="email"
          id="email"
          helperText=" "
        ></TextField>
        <Box className="flex flex-row gap-2 justify-end">
          <Button onClick={onClose}>Cancel</Button>
          <Button>Save</Button>
        </Box>
      </Box>
    </section>
  );
}

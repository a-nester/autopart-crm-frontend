import Button from '@/components/CommonComponents/Button/Button';
import { useStore } from '@/globalState/store';
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
  const { setTripCustomer } = useStore();
  //   const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('+38');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const handleChangeTel = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(evt.target.value);
    setError(!/^\+380\d{9}$/.test(evt.target.value));
  };

  const handleChangeEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
    setError(
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        evt.target.value,
      ),
    );
  };

  const handleSubmit = () => {
    const customerData = {
      name: customer,
      //   company,
      phone,
      email,
    };
    console.log(customerData);
    setTripCustomer(customerData);
  };

  return (
    <section
      className={clsx(
        'fixed bottom-0 left-0 bg-white border-[1px] border-[solid] border-[black] p-2 shadow-lg rounded-md z-50 w-full min-h-[40vh] ',
        className,
      )}
    >
      <Box className="flex flex-col gap-1 pt-2 max-h-[70vh] overflow-y-auto">
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
          helperText={
            error ? (
              <span className="text-red-500">Формат: +380 123456789</span>
            ) : (
              ' '
            )
          }
        ></TextField>
        <TextField
          className="w-full"
          label="email"
          id="email"
          onChange={handleChangeEmail}
          helperText={
            error ? (
              <span className="text-red-500">Перевірте формат email</span>
            ) : (
              ' '
            )
          }
        ></TextField>
        <Box className="flex flex-row gap-2 justify-end">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </Box>
      </Box>
    </section>
  );
}

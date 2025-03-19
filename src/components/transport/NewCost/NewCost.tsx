import Button from '@/components/CommonComponents/Button/Button';
import CommonMultiSelect from '@/components/CommonComponents/CommonMultiSelect/CommonMultiSelect';
import { Box, TextField } from '@mui/material';
import { useState } from 'react';
import { drivers, trucks, COST_TYPES } from '@/constants/mockdata';

import dayjs, { Dayjs } from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CURRENCY } from '@/constants/constants';
import { useStore } from '@/globalState/store';

interface NewCostProps {
  onClose: () => void;
  tripId?: string;
}

export default function NewCost({ onClose, tripId }: NewCostProps) {
  const { setCost } = useStore();
  const [name, setName] = useState<string>('');
  const [costType, setCostType] = useState<string>('');
  const [date, setDate] = useState<Dayjs | number | null | undefined>();
  const [odometr, setOdometr] = useState<number | null>();
  const [driver, setDriver] = useState([]);
  const [truck, setTruck] = useState([]);
  const [price, setPrice] = useState<number>(0);
  const [currency, setCurrency] = useState<string[]>(['']);

  const handleSave = async () => {
    const newCost = {
      name,
      costType: costType[0],
      date: dayjs(date).valueOf(),
      odometr,
      truck: truck[0],
      driver: driver[0],
      price,
      currency: currency[0],
      tripId,
    };

    setCost(newCost);

    // onClose();
  };

  return (
    <section className="flex flex-col gap-2 w-[95vw] min-h-[80vh] max-h-[100vh] overflow-y-auto self-center">
      <h2>Створення нової витрати</h2>
      <Box className="flex gap-2">
        <Box className="w-full">
          <TextField
            className="flex-[3]"
            id="type"
            value={name}
            label="Опис витрати"
            variant="outlined"
            onChange={(evt) => setName(evt.target.value)}
          />
        </Box>
      </Box>
      <Box className="flex flex-row gap-2">
        <CommonMultiSelect
          values={driver}
          setValues={setDriver}
          label={'Водій'}
        >
          {drivers}
        </CommonMultiSelect>
        <CommonMultiSelect values={truck} setValues={setTruck} label={'Авто'}>
          {trucks}
        </CommonMultiSelect>
      </Box>
      <Box className="flex flex-row gap-2">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="flex-[2]"
            label="Дата"
            value={date ? dayjs(date) : null}
            format="DD-MM-YYYY"
            onChange={(newValue) => setDate(newValue)}
          />
        </LocalizationProvider>

        <CommonMultiSelect
          className="flex-[4]"
          values={costType}
          setValues={setCostType}
          label={'Тип витрати'}
        >
          {COST_TYPES}
        </CommonMultiSelect>
      </Box>
      <Box className="flex flex-row gap-2">
        <TextField
          className="flex-[1]"
          id="range"
          value={odometr}
          label="Пробіг, км"
          variant="outlined"
          onChange={(evt) => setOdometr(Number(evt.target.value))}
        />
      </Box>
      <Box className="flex flex-row gap-2">
        <TextField
          className="w-full"
          id="price"
          value={price}
          label="Ціна"
          variant="outlined"
          onChange={(evt) => setPrice(Number(evt.target.value))}
        />
        <CommonMultiSelect
          values={currency}
          setValues={setCurrency}
          label={'Валюта'}
        >
          {Object.keys(CURRENCY)}
        </CommonMultiSelect>
      </Box>

      <Box className="flex flex-row gap-2 justify-end">
        <Button onClick={onClose}>Відміна</Button>
        <Button onClick={handleSave}>Записати</Button>
      </Box>
    </section>
  );
}

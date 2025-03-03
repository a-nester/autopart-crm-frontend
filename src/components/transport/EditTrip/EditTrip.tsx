import Button from '@/components/CommonComponents/Button/Button';
import CommonMultiSelect from '@/components/CommonComponents/CommonMultiSelect/CommonMultiSelect';
import { Box, TextField } from '@mui/material';
import { useState } from 'react';
import { drivers, trucks } from '@/constants/mockdata';
import { useStore } from '@/globalState/store';
import dayjs, { Dayjs } from 'dayjs';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CURRENCY } from '@/constants/constants';
import { Customer, Trip } from '@/types/types';

import CreateCostumer from '../CreateCostumer/CreateCostumer';
import PickCostumer from '../PickCostumer/PickCostumer';
import { customersList } from '@/constants/mockdata';

interface EditTripProps {
  onClose: () => void;
}

export default function EditTrip({ onClose }: EditTripProps) {
  const { setTrip } = useStore();
  const [id, setId] = useState<string>();
  const [driver, setDriver] = useState([]);
  const [truck, setTruck] = useState([]);
  const [loadDate, setLoadDate] = useState<Dayjs | null | undefined>();
  const [unloadDate, setUnloadDate] = useState<Dayjs | null | undefined>();
  const [load, setLoad] = useState<string>('');
  const [unload, setUnload] = useState<string>('');
  const [rangeTo, setRangeTo] = useState<number>();
  const [range, setRange] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [currency, setCurrency] = useState<string>('');
  const [paymentForm, setPaymentForm] = useState<string>('');
  const [dispetcher, setDispetcher] = useState<Customer>({ name: '' });
  const [dispFee, setDispFee] = useState<number>();
  const [dispFeeCurrency, setDispFeeCurrency] = useState<string>('');
  const [isActiveCreateDispModal, setIsActiveCreateDispModal] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSave = async () => {
    const newTrip: Trip = {
      id,
      driver: driver[0],
      truck: truck[0],
      loadingPlace: load,
      loadDate: loadDate ? dayjs(loadDate).valueOf() : null,
      unloadingPlace: unload,
      rangeTo: rangeTo,
      range: range,
      price: price,
      currency: currency[0],
      payment_Form: paymentForm[0],
      dispetcher_id: dispetcher._id,
      dispetcher_fee: dispFee,
      dispetcher_Currency: dispFeeCurrency[0],
    };
    if (unloadDate && dayjs(unloadDate).isValid()) {
      newTrip.unloadDate = dayjs(unloadDate).valueOf();
    }
    console.log(newTrip);

    await setTrip(newTrip);
    useStore.setState((state) => ({
      tripsList: [...state.tripsList, newTrip],
    }));
    // onClose();
  };

  const handleCreateDisp = () => {
    setIsActiveCreateDispModal(true);
  };

  return (
    <section className="flex flex-col gap-2">
      <h2>Створення нового рейсу</h2>
      <Box className="flex gap-2">
        <TextField
          className="flex w-full"
          id="id"
          label="id"
          variant="outlined"
          onChange={(evt) => setId(evt.target.value)}
        />
        <Box className="w-full"></Box>
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
            className="flex-[1.5]"
            label="Дата"
            value={loadDate ? dayjs(loadDate) : null}
            format="DD-MM-YYYY"
            onChange={(newValue) => setLoadDate(newValue)}
          />
        </LocalizationProvider>
        <TextField
          className="flex-[3]"
          id="load"
          label="Завантаження"
          variant="outlined"
          onChange={(evt) => setLoad(evt.target.value)}
        />
        <TextField
          className="flex-[1]"
          id="rangeTo"
          label="Доїзд, км"
          variant="outlined"
          onChange={(evt) => setRangeTo(Number(evt.target.value))}
        />
      </Box>
      <Box className="flex flex-row gap-2">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="flex-[1.5]"
            label="Дата"
            value={unloadDate ? dayjs(unloadDate) : null}
            format="DD-MM-YYYY"
            onChange={(newValue) => setUnloadDate(newValue)}
          />
        </LocalizationProvider>
        <TextField
          className="flex-[3]"
          id="unload"
          label="Вивантаження"
          variant="outlined"
          onChange={(evt) => setUnload(evt.target.value)}
        />
        <TextField
          className="flex-[1]"
          id="range"
          label="Від-нь, км"
          variant="outlined"
          onChange={(evt) => setRange(Number(evt.target.value))}
        />
      </Box>
      <Box className="flex flex-row gap-2">
        <TextField
          className="w-full"
          id="price"
          label="Ціна"
          variant="outlined"
          onChange={(evt) => setPrice(Number(evt.target.value))}
        />
        <CommonMultiSelect
          // className="flex"
          values={currency}
          setValues={setCurrency}
          label={'Валюта'}
        >
          {Object.keys(CURRENCY)}
        </CommonMultiSelect>
        <CommonMultiSelect
          // className="flex"
          values={paymentForm}
          setValues={setPaymentForm}
          label={'Форма'}
        >
          {['Готівка', 'Безнал']}
        </CommonMultiSelect>
      </Box>
      <Box className="w-full relative">
        <TextField
          id="dispetcher"
          label="Диспетчер"
          variant="outlined"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          value={dispetcher.name}
          onChange={(evt) =>
            setDispetcher({
              name: evt.target.value,
            })
          }
          className="w-full pr-10"
        />
        <Button
          className="absolute right-2 top-7 -translate-y-1/2 rounded-full bg-blue-500 text-white w-8 h-8 flex items-center justify-center hover:bg-blue-400 leading-none"
          onClick={handleCreateDisp}
        >
          <span className="relative -top-[2px]">+</span>
        </Button>

        {isActiveCreateDispModal && (
          <CreateCostumer
            className=" absolute top-14 w-full h-80 shadow-lg  rounded-lg z-100"
            onClose={() => setIsActiveCreateDispModal(false)}
            customer={dispetcher.name}
            onChangeName={setDispetcher}
          />
        )}
        {isFocused && (
          <PickCostumer
            className="absolute top-14 w-full  shadow-lg  rounded-lg z-100"
            searchName={dispetcher.name}
            setSelectedCustomer={setDispetcher}
          >
            {customersList}
          </PickCostumer>
        )}
      </Box>
      <Box className="flex flex-row gap-2">
        <TextField
          className="w-full"
          id="dispFee"
          label="Диспетч."
          variant="outlined"
          onChange={(evt) => setDispFee(Number(evt.target.value))}
        />
        <CommonMultiSelect
          // className="flex"
          values={dispFeeCurrency}
          setValues={setDispFeeCurrency}
          label={'Валюта'}
        >
          {Object.keys(CURRENCY)}
        </CommonMultiSelect>
        <Box className="w-full"></Box>
      </Box>

      <Box className="flex flex-row gap-2 justify-end">
        <Button onClick={onClose}>Відміна</Button>
        <Button onClick={handleSave}>Записати</Button>
      </Box>
    </section>
  );
}

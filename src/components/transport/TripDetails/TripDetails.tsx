import Button from '@/components/CommonComponents/Button/Button';
import { Trip } from '@/types/types';
import { Box, TextField } from '@mui/material';
import { useState } from 'react';
import EditTrip from '../EditTrip/EditTrip';
import Modal from '@/components/Modal/Modal';
import tripCalc from '@/helpers/tripCalc';

//  _id,
//       driver: driver[0],
//       truck: truck[0],
//       loadingPlace: load,
//       loadDate: loadDate ? dayjs(loadDate).valueOf() : null,
//       unloadingPlace: unload,
//       rangeTo: rangeTo,
//       range: range,
//       price: price,
//       currency: currency[0],
//       payment_Form: paymentForm[0],
//       dispetcher_id: dispetcher._id,
//       dispetcher_fee: dispFee,
//       dispetcher_Currency: dispFeeCurrency[0],

export default function TripDetails({ children }: { children: Trip }) {
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [fuelPrice, setFuelPrice] = useState(52);
  const [usdPrice, setUsdPrice] = useState(41.5);

  const { weight, loadingPlace, unloadingPlace } = children;

  const calculatedData = tripCalc(children, usdPrice, fuelPrice);
  const { totalFuel, totalDistance, driverSalary, totalEarnings } =
    calculatedData;

  const handleEdit = () => {
    setEditIsOpen(true);
  };
  return (
    <section>
      <Button onClick={handleEdit}>Edit</Button>
      <Box className="flex flex-row justify-between">
        <p>Напрямок</p>
        <p>{loadingPlace}</p>
        <p>-</p>
        <p>{unloadingPlace}</p>
        <p>Відстань = </p>
        <p>{totalDistance}</p>
      </Box>
      <Box>Вага:{weight}, кг</Box>
      <p>
        USD price:{' '}
        {
          <TextField
            // className="h-4"
            value={usdPrice}
            type="number"
            sx={{
              '& .MuiInputBase-root': { width: 80, height: 24, p: 0 },
              '& .MuiInputBase-input': { p: 1 },
            }}
            // inputProps={{ step: '0.01' }}
            onChange={(evt) => setUsdPrice(Number(evt.target.value))}
            variant="outlined"
          ></TextField>
        }{' '}
        uah
      </p>

      <Box>
        <p>Витрата пального = {totalFuel} літрів</p>
        <p>
          Ціна палива:{' '}
          {
            <TextField
              // className="h-4"
              value={fuelPrice}
              sx={{
                '& .MuiInputBase-root': { width: 60, height: 24, p: 0 },
              }}
              onChange={(evt) => setFuelPrice(Number(evt.target.value))}
              variant="outlined"
            ></TextField>
          }{' '}
          uah
        </p>

        <p>В грошах: {totalFuel * fuelPrice} uah</p>
        <p>
          З.п. водія: {driverSalary.value} {driverSalary.currency}
        </p>
      </Box>
      <Box>Заробіток: {totalEarnings}</Box>
      {editIsOpen && (
        <Modal
          isOpen={editIsOpen}
          onClose={() => {
            setEditIsOpen(false);
          }}
        >
          <EditTrip
            onClose={() => {
              setEditIsOpen(false);
            }}
          >
            {children}
          </EditTrip>
        </Modal>
      )}
    </section>
  );
}

import Button from '@/components/CommonComponents/Button/Button';
import { useStore } from '@/globalState/store';
import tripCalc from '@/helpers/tripCalc';
import { Trip } from '@/types/types';
import { Box, TextField } from '@mui/material';
import clsx from 'clsx';
import { useState } from 'react';

export default function TripDetailsInfo({
  trip,
  onEdit,
}: {
  trip: Trip;
  onEdit: (isEditing: boolean) => void;
}) {
  const { costsByParam } = useStore();
  const [fuelPrice, setFuelPrice] = useState(52);
  const [usdPrice, setUsdPrice] = useState(41.5);
  const [eurPrice, setEurPrice] = useState(45);

  const { weight, loadingPlace, unloadingPlace } = trip;

  const calculatedData = tripCalc(
    trip,
    usdPrice,
    eurPrice,
    fuelPrice,
    costsByParam,
  );

  const {
    totalFuel,
    totalDistance,
    driverSalary,
    totalEarnings,
    totalEaringsCurrency,
    totalCostsInTrip,
  } = calculatedData;

  return (
    <section className="p-2">
      <Box className="flex flex-row justify-between">
        <div>Напрямок</div>
        <div>{loadingPlace}</div>
        <div>-</div>
        <div>{unloadingPlace}</div>
        <div>Відстань = </div>
        <div>{totalDistance}</div>
      </Box>
      <Box>Вага:{weight}, кг</Box>
      <div>
        USD price:{' '}
        {
          <TextField
            value={usdPrice}
            type="number"
            sx={{
              '& .MuiInputBase-root': { width: 80, height: 24, p: 0 },
              '& .MuiInputBase-input': { p: 1 },
            }}
            onChange={(evt) => setUsdPrice(Number(evt.target.value))}
            variant="outlined"
          ></TextField>
        }{' '}
        uah
      </div>
      <div>
        USD price:{' '}
        {
          <TextField
            value={eurPrice}
            type="number"
            sx={{
              '& .MuiInputBase-root': { width: 80, height: 24, p: 0 },
              '& .MuiInputBase-input': { p: 1 },
            }}
            onChange={(evt) => setEurPrice(Number(evt.target.value))}
            variant="outlined"
          ></TextField>
        }{' '}
        uah
      </div>

      <Box>
        <div>Витрата пального = {totalFuel} літрів</div>
        <div>
          Ціна палива:{' '}
          {
            <TextField
              value={fuelPrice}
              sx={{
                '& .MuiInputBase-root': { width: 60, height: 24, p: 0 },
              }}
              onChange={(evt) => setFuelPrice(Number(evt.target.value))}
              variant="outlined"
            ></TextField>
          }{' '}
          uah
        </div>

        <div>В грошах: {totalFuel * fuelPrice} uah</div>
        <div>
          З.п. водія: {driverSalary.value} {driverSalary.currency}
        </div>
      </Box>
      <Box className="flex flex-row justify-between">
        <Box>
          <div>
            Витрати в рейсі: {totalCostsInTrip} {'ГРН'}
          </div>
          <div
            className={clsx(
              totalEarnings > 0 ? 'text-green-500' : 'text-red-500',
            )}
          >
            Заробіток: {totalEarnings} {totalEaringsCurrency}
          </div>
        </Box>
        <Button onClick={() => onEdit(true)}>Edit</Button>
      </Box>
    </section>
  );
}

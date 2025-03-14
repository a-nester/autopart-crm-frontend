import Button from '@/components/CommonComponents/Button/Button';
import tripCalc from '@/helpers/tripCalc';
import { Trip } from '@/types/types';
import { Box, TextField } from '@mui/material';
import { useState } from 'react';

export default function TripDetailsInfo({
  trip,
  onEdit,
}: {
  trip: Trip;
  onEdit: (isEditing: boolean) => void;
}) {
  const [fuelPrice, setFuelPrice] = useState(52);
  const [usdPrice, setUsdPrice] = useState(41.5);

  const { weight, loadingPlace, unloadingPlace } = trip;
  const calculatedData = tripCalc(trip, usdPrice, fuelPrice);
  const {
    totalFuel,
    totalDistance,
    driverSalary,
    totalEarnings,
    totalEaringsCurrency,
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
        Заробіток: {totalEarnings} {totalEaringsCurrency}
        <Button onClick={() => onEdit(true)}>Edit</Button>
      </Box>
    </section>
  );
}

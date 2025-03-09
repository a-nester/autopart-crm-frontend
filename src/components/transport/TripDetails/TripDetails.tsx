import Button from '@/components/CommonComponents/Button/Button';
import { Trip } from '@/types/types';
import { Box } from '@mui/material';
import { useState } from 'react';
import EditTrip from '../EditTrip/EditTrip';
import Modal from '@/components/Modal/Modal';

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

  const handleEdit = () => {
    setEditIsOpen(true);
  };
  const { loadingPlace, unloadingPlace, rangeTo, range } = children;
  const totalDistance = rangeTo + range;
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
      <Box>
        <p>Витрата пального = </p>
        <p></p>
      </Box>
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

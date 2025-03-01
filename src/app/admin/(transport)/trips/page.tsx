'use client';

import Button from '@/components/CommonComponents/Button/Button';
import Modal from '@/components/Modal/Modal';
import EditTrip from '@/components/transport/EditTrip/EditTrip';
import TripsList from '@/components/transport/TripsList/TripsList';
import { useEffect, useState } from 'react';
// import { trips } from '@/constants/mockdata';
import { useStore } from '@/globalState/store';

export default function Page() {
  const { tripsList, getTrips } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  // console.log(tripsList);

  useEffect(() => {
    // const page = 1;
    getTrips();
  }, []);

  return (
    <>
      <section className="flex relative h-[calc(75vh)]">
        {tripsList && <TripsList trips={tripsList}></TripsList>}
      </section>
      <Button
        type="button"
        className="bg-blue-700 flex fixed top-auto right-4 shadow-lg z-50"
        onClick={() => setIsOpen(true)}
      >
        Додати рейс
      </Button>
      <Modal
        className="top-[4px] left-[4px] right-[4px] bottom-[4px] rounded-lg"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <EditTrip onClose={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}

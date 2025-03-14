'use client';

import Button from '@/components/CommonComponents/Button/Button';
import Modal from '@/components/Modal/Modal';
import EditTrip from '@/components/transport/EditTrip/EditTrip';
import TripsList from '@/components/transport/TripsList/TripsList';
import { useEffect, useState } from 'react';
import { useStore } from '@/globalState/store';

export default function Page() {
  const { tripsList, getTrips } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <>
      <section className="flex relative h-[calc(75vh)] flex-col ">
        {tripsList && <TripsList trips={tripsList} />}
        <div className="sticky bottom-0 bg-white py-2">
          <Button
            type="button"
            className="bg-blue-700 flex mx-auto shadow-lg z-50"
            onClick={() => setIsOpen(true)}
          >
            Додати рейс
          </Button>
        </div>
      </section>

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

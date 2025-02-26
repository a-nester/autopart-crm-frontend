'use client';

import Button from '@/components/CommonComponents/Button/Button';
import Modal from '@/components/Modal/Modal';
import EditTrip from '@/components/transport/EditTrip/EditTrip';
import TripsList from '@/components/transport/TripsList/TripsList';
import { useState } from 'react';
import { trips } from '@/constants/mockdata';

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="flex relative h-[calc(75vh)]">
        <TripsList trips={trips}></TripsList>
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

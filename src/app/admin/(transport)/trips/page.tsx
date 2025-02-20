'use client';

import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import TripsList from '@/components/transport/TripsList/TripsList';
import { useState } from 'react';

const trips = [
  {
    id: '1802_1',
    driver: 'Петровець',
    truck: ['BK6443HI', 'BK4112XP'],
    startDate: '14.02.2025',
    endDate: '15.02.2025',
    startPoints: ['Березне'],
    endPoints: ['Кременчук'],
    rangeToStart: 25,
    range: 750,
    price: 25000,
  },
  {
    id: '1802_1',
    driver: 'Петровець',
    truck: ['BK6443HI', 'BK4112XP'],
    startDate: '18.02.2025',
    endDate: '19.02.2025',
    startPoints: ['Кременчуг'],
    endPoints: ['Черкаси', 'Тальне'],
    rangeToStart: 15,
    range: 300,
    price: 9500,
  },
];

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="flex relative">
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
        New trip
      </Modal>
    </>
  );
}

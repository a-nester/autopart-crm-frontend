'use client';

import FixesFilter from '@/components/transport/FixesFilter/FixesFilter';
import TripCosts from '@/components/transport/TripCosts/TripCosts';
import { useEffect, useState } from 'react';

export default function Page() {
  const [truck, setTruck] = useState([]);

  useEffect(() => {
    console.log(truck);
  }, [truck]);
  return (
    <section className="p-2">
      <FixesFilter truck={truck} setTruck={setTruck} />
      <TripCosts repairs={'ремонт'} truck={truck}></TripCosts>
    </section>
  );
}

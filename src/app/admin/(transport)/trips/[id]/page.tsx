'use client';

import { useStore } from '@/globalState/store';
import { Trip } from '@/types/types';
import { use, useEffect, useState } from 'react';

interface TripPageProps {
  params: { id: string };
}

export default function TripPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { trip, getTripById } = useStore();
  //   const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    async function fetchTrip() {
      try {
        const fetchedTrip = await getTripById(id);
        // setTrip(fetchedTrip);
      } catch (error) {
        console.error('Error fetching trip:', error);
      }
    }
    if (id) {
      fetchTrip();
    }
  }, [id, getTripById]);
  console.log('Trip', trip);

  return <p>{id}</p>;
}

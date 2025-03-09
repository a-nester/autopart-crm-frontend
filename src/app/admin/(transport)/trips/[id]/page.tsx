'use client';

import TripDetails from '@/components/transport/TripDetails/TripDetails';
import { useStore } from '@/globalState/store';

import { use, useEffect } from 'react';

interface TripPageProps {
  params: Promise<{ id: string }>;
}

export default function TripPage({ params }: TripPageProps) {
  const { id } = use(params);

  const { trip, getTripById } = useStore();

  useEffect(() => {
    async function fetchTrip() {
      try {
        await getTripById(id);
      } catch (error) {
        console.error('Error fetching trip:', error);
      }
    }
    if (id) {
      fetchTrip();
    }
  }, [id, getTripById]);
  console.log('Trip', trip);

  return <section>{trip && <TripDetails>{trip}</TripDetails>}</section>;
}

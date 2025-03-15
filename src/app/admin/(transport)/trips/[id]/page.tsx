'use client';

import TripDetails from '@/components/transport/TripDetails/TripDetails';
import { useStore } from '@/globalState/store';
import { use, useEffect } from 'react';

interface TripPageProps {
  params: Promise<{ id: string }>;
}

export default function TripPage({ params }: TripPageProps) {
  const { id } = use(params);
  const { trip, getTripById, getCosts } = useStore();

  useEffect(() => {
    async function fetchTrip() {
      try {
        getTripById(id);
      } catch (error) {
        console.error('Error fetching trip:', error);
      }
    }
    if (id) {
      fetchTrip();
    }
  }, [id, getTripById, getCosts]);

  return (
    <section className="p-1">
      {trip && <TripDetails>{trip}</TripDetails>}
    </section>
  );
}

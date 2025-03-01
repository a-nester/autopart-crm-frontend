import { Trip } from '@/types/types';
import TripRow from '../TripRow/TripRow';
import TripsTable from '../TripsTable/TripsTable';

export default function TripsList({ trips }: { trips: Trip[] }) {
  return (
    <section>
      <TripsTable>
        {trips.map((trip, idx) => (
          <TripRow key={idx} trip={trip} />
        ))}
      </TripsTable>
    </section>
  );
}

import { TripRowProps } from '@/types/types';
import TripRow from '../TripRow/TripRow';
import TripsTable from '../TripsTable/TripsTable';

export default function TripsList({ trips }: { trips: TripRowProps[] }) {
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

import { CURRENCY } from '@/constants/constants';
import { Trip } from '@/types/types';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

export default function TripRow({ trip }: { trip: Trip }) {
  const router = useRouter();
  return (
    <>
      <tr
        onClick={() => router.push(`/admin/trips/${trip._id}`)}
        className="h-14 text-[10px] md:text-base font-medium text-center text-gray-800 bg-white hover:bg-gray-200 transition"
      >
        <td className="p-1 text-blue-700 rounded-l border-l-4 border-blue-700">
          {trip.loadDate ? dayjs(trip.loadDate).format('DD.MM.YY') : '-'}
        </td>
        <td className="px-1">{trip.driver}</td>
        <td className="  text-blue-700 ">{trip.truck}</td>
        <td className="  text-blue-700 ">
          {trip.unloadDate ? dayjs(trip.unloadDate).format('DD.MM.YY') : '-'}
        </td>
        <td className="  ">{trip.loadingPlace}</td>
        <td className="  ">{trip.unloadingPlace}</td>
        <td className="  ">
          {trip.price}
          {CURRENCY[trip.currency]}
        </td>
      </tr>
    </>
  );
}

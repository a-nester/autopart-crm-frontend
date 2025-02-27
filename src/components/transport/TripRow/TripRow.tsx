import { TripRowProps } from '@/types/types';

export default function TripRow({ trip }: { trip: TripRowProps }) {
  return (
    <>
      <tr className="h-14 text-[10px] md:text-base font-medium text-center text-gray-800 bg-white">
        <td className="p-1 text-blue-700 rounded-l border-l-4 border-blue-700">
          {trip.id}
        </td>
        <td className="px-1">{trip.driver}</td>
        <td className="  text-blue-700 ">
          {trip.truck.map((plate, idx) => (
            <span key={idx}>
              {plate}
              <br />
            </span>
          ))}
        </td>
        <td className="  text-blue-700 ">{trip.endDate}</td>
        <td className="  ">{trip.startPoints}</td>
        <td className="  ">
          {trip.endPoints.map((elem, idx) => (
            <span key={idx}>
              {elem}
              <br />
            </span>
          ))}
        </td>
        <td className="  ">{trip.price}</td>
      </tr>
    </>
  );
}

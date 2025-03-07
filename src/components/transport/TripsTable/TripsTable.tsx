export interface TripsTableProps {
  children?:
    | React.ReactElement<HTMLTableRowElement>[]
    | React.ReactElement<HTMLTableRowElement>;
}

const headers = [
  'Завант',
  //   'startDate',
  'Водій',
  'Авто',
  'Дата вивант',
  'Пункт зав.',
  'Пункт вив.',
  //   'rangeToStart',
  //   'range',
  'Фрахт',
];

export default function TripsTable({ children }: TripsTableProps) {
  return (
    <div className="w-full max-h-[65vh] overflow-y-auto bg-gray-100">
      <table className="table-fixed w-full border-separate border-spacing-y-2">
        <thead className="sticky top-0 bg-gray-200 z-10 shadow-md">
          <tr>
            {headers.map((header, idx) => (
              <th
                key={idx}
                scope="col"
                className="w-full p-2 text-sm font-medium text-gray-900"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

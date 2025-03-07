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
    <div className="w-full py-1 px-1 bg-gray-100">
      <table className="table-fixed w-full border-separate border-spacing-y-2 ">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th
                key={idx}
                scope="col"
                className="w-full pb-5 text-sm font-light text-gray-900"
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

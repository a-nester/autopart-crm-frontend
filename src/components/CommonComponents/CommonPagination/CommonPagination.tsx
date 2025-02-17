import clsx from 'clsx';

export default function CommonPagination({
  elements,
  perPage,
  page,
  setPage,
}: {
  elements: number;
  perPage: number;
  page: number;
  setPage: (elem: number) => void;
}) {
  const count = Math.ceil(elements / perPage);
  //   const [page, setPage] = useState<number>(1);
  const pagination = Array.from({ length: count }, (_, i) => ++i);
  console.log(pagination);

  return (
    <section className="flex flex-row gap-1 w-48 overflow-hidden">
      {pagination.map((elem, idx) => (
        <p
          className={clsx('flex flex-col', elem === page && 'font-bold')}
          key={idx}
          onClick={() => setPage(elem)}
        >
          {elem}
          <span
            className={clsx(
              elem === page && 'w-full h-[2px] bg-purple-500 rounded-full',
            )}
          ></span>
        </p>
      ))}
    </section>
  );
}

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
  const visiblePages = 5; // Кількість сторінок у пагінації

  let pagination: number[] = [];

  if (count <= visiblePages) {
    pagination = Array.from({ length: count }, (_, i) => i + 1);
  } else if (page <= 3) {
    pagination = [1, 2, 3, 4, 5];
  } else if (page >= count - 2) {
    pagination = [count - 4, count - 3, count - 2, count - 1, count];
  } else {
    pagination = [page - 2, page - 1, page, page + 1, page + 2];
  }

  return (
    <section className="flex flex-row gap-2">
      {pagination.map((elem) => (
        <p
          className={clsx(
            'flex flex-col items-center cursor-pointer px-3 py-1 transition-all duration-300',
            elem === page
              ? 'font-bold text-purple-500 scale-110'
              : 'text-gray-700 hover:text-purple-400 hover:scale-105',
          )}
          key={elem}
          onClick={() => setPage(elem)}
        >
          {elem}
          <span
            className={clsx(
              'w-0 h-[2px] bg-purple-500 rounded-full transition-all duration-300',
              elem === page && 'w-full',
            )}
          ></span>
        </p>
      ))}
    </section>
  );
}

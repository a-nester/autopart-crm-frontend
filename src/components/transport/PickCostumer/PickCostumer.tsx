import Button from '@/components/CommonComponents/Button/Button';
import { Customer } from '@/types/types';
import clsx from 'clsx';

type Props = {
  children: Customer[];
  className: string;
  searchName: string;
  setSelectedCustomer: (customer: Customer) => void;
};

export default function PickCustomer({
  children,
  className,
  searchName,
  setSelectedCustomer,
}: Props) {
  const filtered =
    searchName.trim() === ''
      ? children
      : children.filter((elem) =>
          elem.name.toLowerCase().includes(searchName.toLowerCase()),
        );

  return (
    <section
      className={clsx(
        'absolute bg-white p-4 shadow-lg rounded-lg z-50 max-h-80 overflow-auto',
        className,
      )}
    >
      <h2>Список контрагентів</h2>
      <ul>
        {filtered.map((customer) => (
          <li key={customer._id}>
            <Button
              className="border-[1px] border-[solid] border-[black]"
              onClick={() => setSelectedCustomer(customer)}
            >
              {customer.name}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}

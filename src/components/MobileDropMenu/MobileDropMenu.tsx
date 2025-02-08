import Link from 'next/link';

interface MobileDropMenuProps {
  onClose: () => void;
}

export default function MobileDropMenu({ onClose }: MobileDropMenuProps) {
  return (
    <>
      <h2 className="text-lg font-semibold text-center mb-2">Меню</h2>
      <ul className="flex flex-col gap-3">
        <li>
          <Link
            href="/admin/orders"
            className="block py-2 text-center text-blue-600"
            onClick={onClose}
          >
            Замовлення
          </Link>
        </li>
        <li>
          <Link
            href="/admin/timers"
            className="block py-2 text-center text-blue-600"
            onClick={onClose}
          >
            Цінові таймери
          </Link>
        </li>
        <li>
          <Link
            href="/admin/settings"
            className="block py-2 text-center text-blue-600"
            onClick={onClose}
          >
            Налаштування
          </Link>
        </li>
      </ul>
    </>
  );
}

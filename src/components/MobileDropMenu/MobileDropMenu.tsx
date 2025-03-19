import CommonAccordion from '@/ui/CommonAccordion/CommonAccordion';
import Link from 'next/link';

const menuItems = [
  {
    title: 'Замовлення',
    path: '/admin/orders',
  },
  {
    title: 'Цінові таймери',
    submenu: [
      {
        title: 'Таймери',
        path: '/admin/timers/set',
      },
      {
        title: 'Встановлені таймери',
        path: '/admin/timers/setted',
      },
    ],
  },

  {
    title: 'Amega Trans',
    submenu: [
      {
        title: 'Рейси',
        path: '/admin/trips/',
      },
      {
        title: 'Ремонти',
        path: '/admin/repairs',
      },
    ],
  },
  {
    title: 'Налаштування',
    path: '/admin/settings',
  },
];
interface MobileDropMenuProps {
  onClose: () => void;
}

export default function MobileDropMenu({ onClose }: MobileDropMenuProps) {
  return (
    <>
      <h2 className="text-lg font-semibold text-center mb-2">Меню</h2>
      <ul className="flex flex-col gap-3">
        {menuItems.map((item, idx) =>
          item.submenu ? (
            <li key={idx}>
              <CommonAccordion
                title={item.title}
                settings={{
                  root: 'text-blue-600',
                  title: 'py-0 px-0',
                  content: 'pl-0',
                }}
              >
                <ul className="list-disc pl-36">
                  {item.submenu.map((el, id) => (
                    <li key={id}>
                      <Link
                        href={el.path}
                        className="block py-1 text-left text-blue-600"
                        onClick={onClose}
                      >
                        {el.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CommonAccordion>
            </li>
          ) : (
            <li key={idx}>
              <Link
                href="/admin/orders"
                className="block py-1 text-center text-blue-600"
                onClick={onClose}
              >
                {item.title}
              </Link>
            </li>
          ),
        )}
      </ul>
    </>
  );
}

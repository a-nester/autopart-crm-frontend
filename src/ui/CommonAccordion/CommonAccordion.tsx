import clsx from 'clsx';
import { ReactElement, useState } from 'react';

type SettingsProp = {
  root?: string;
  title?: string;
  content?: string;
};

// const settings = {
//   root: '',
//   title: '',
//   content: '',
// };

export default function CommonAccordion({
  title,
  settings = {},
  children,
}: {
  title: string;
  settings?: Partial<SettingsProp>;
  children: ReactElement;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={clsx('w-full max-w-md mx-auto space-y-2', settings?.root)}>
      <button
        className={clsx('w-full transition', settings?.title)}
        type="button"
        onClick={
          () => {
            setIsOpen((prev) => !prev);
          }
          // aria-expanded={isOpen}
        }
      >
        {title}
      </button>
      <div
        className={clsx(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-40' : 'max-h-0 p-0',
          settings?.content,
        )}
      >
        {children}
      </div>
    </div>
  );
}

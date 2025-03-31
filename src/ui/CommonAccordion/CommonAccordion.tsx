import clsx from 'clsx';
import { ReactElement, useEffect, useState } from 'react';

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
  externalBtn,
  externalState,
}: {
  title: string;
  settings?: Partial<SettingsProp>;
  children: ReactElement;
  externalState?: ReactElement;
  setExternelState: () => void;
}) {
  const [isOpen, setIsOpen] = useState(externalState || false);

  useEffect(() => {}, [externalState]);

  return (
    <div
      className={clsx(
        'p-1 w-full max-w-md mx-auto space-y-2 border-[1px] rounded-md',
        settings?.root,
      )}
    >
      {!externalBtn && (
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
      )}
      <div
        className={
          externalBtn
            ? clsx(
                ' overflow-hidden transition-all duration-300',
                externalState ? 'max-h-40 p-2' : 'max-h-0 p-0',
                settings?.content,
              )
            : clsx(
                'overflow-hidden transition-all duration-300',
                isOpen ? 'max-h-40 p-2' : 'max-h-0 p-0',
                settings?.content,
              )
        }
      >
        {children}
      </div>
    </div>
  );
}

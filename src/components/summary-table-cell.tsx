import clsx from 'clsx';
import React from 'react';

export interface SummuryTableCellProps {
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

export default function SummuryTableCell({
  align = 'left',
  children,
}: SummuryTableCellProps) {
  return (
    <td
      className={clsx(
        'py-2 px-5 text-sm border-gray-100 border-r first-of-type:border-l',
        `text-${align}`,
      )}
    >
      {children}
    </td>
  );
}

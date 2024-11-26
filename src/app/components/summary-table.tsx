import React from 'react';

export interface SummuryTableProps {
  headers: React.ReactNode;
  children: React.ReactNode;
}

export default function SummuryTable({ headers, children }: SummuryTableProps) {
  return (
    <table className="table-auto w-full border-separate border-spacing-0">
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody className="[&>tr:nth-child(2n)]:bg-gray-100 [&>tr:nth-child(2n+1)]:bg-white">
        {children}
      </tbody>
    </table>
  );
}

import React from 'react';
import { getSummarySales } from '@/lib/api';
import SummaryTable from '@/components/summary-table';
import SummaryTableHeader from '@/components/summary-table-header';
import SummaryTableCell from '@/components/summary-table-cell';
import DashboardCard from '@/components/dashboard-card';
import MagicButton from '@/components/magic-button';

// Тип даних для кожного елемента
type SummarySale = {
  companyId: number;
  companyTitle: string;
  sold: number;
  income: number;
};

export type PageProps = object;

export default async function Page({}: PageProps) {
  // Очікується, що getSummarySales повертає масив SummarySale
  const data: SummarySale[] = await new Promise((res) => {
    setTimeout(() => {
      res(getSummarySales());
    }, 4000);
  });

  return (
    <DashboardCard
      label={
        <>
          Sales details
          <MagicButton />
        </>
      }
    >
      <SummaryTable
        headers={
          <>
            <SummaryTableHeader>Company</SummaryTableHeader>
            <SummaryTableHeader align="center">Sold</SummaryTableHeader>
            <SummaryTableHeader align="center">Income</SummaryTableHeader>
          </>
        }
      >
        {data.map(({ companyId, companyTitle, sold, income }) => (
          <tr key={companyId}>
            <SummaryTableCell>{companyTitle}</SummaryTableCell>
            <SummaryTableCell align="center">{sold}</SummaryTableCell>
            <SummaryTableCell align="center">{`$${income}`}</SummaryTableCell>
          </tr>
        ))}
      </SummaryTable>
    </DashboardCard>
  );
}

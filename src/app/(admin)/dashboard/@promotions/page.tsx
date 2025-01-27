import React from 'react';
import { getSummaryPromotions } from '@/lib/api';
import SummaryTable from '@/components/summary-table';
import SummaryTableHeader from '@/components/summary-table-header';
import SummaryTableCell from '@/components/summary-table-cell';
import DashboardCard from '@/components/dashboard-card';

export type PageProps = object;

export default async function Page({}: PageProps) {
  const data = await getSummaryPromotions();
  console.log(data);

  return (
    <DashboardCard label="Promotions">
      <SummaryTable
        headers={
          <>
            <SummaryTableHeader>Company</SummaryTableHeader>
            <SummaryTableHeader>Name</SummaryTableHeader>
            <SummaryTableHeader align="center">%</SummaryTableHeader>
          </>
        }
      >
        {data.map(({ promotionId, promotionName, companyTitle, discount }) => (
          <tr key={promotionId}>
            <SummaryTableCell>{companyTitle}</SummaryTableCell>
            <SummaryTableCell>{promotionName}</SummaryTableCell>
            <SummaryTableCell align="center">{`-${discount}%`}</SummaryTableCell>
          </tr>
        ))}
      </SummaryTable>
    </DashboardCard>
  );
}

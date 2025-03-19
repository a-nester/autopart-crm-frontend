'use client';

import CommonMultiSelect from '@/components/CommonComponents/CommonMultiSelect/CommonMultiSelect';

import { trucks } from '@/constants/mockdata.js';
import { Dispatch, SetStateAction } from 'react';

export default function FixesFilter({
  truck,
  setTruck,
}: {
  truck: string[];
  setTruck: Dispatch<SetStateAction<never[]>>;
}) {
  return (
    <>
      <CommonMultiSelect label="Truck" values={truck} setValues={setTruck}>
        {trucks}
      </CommonMultiSelect>
    </>
  );
}

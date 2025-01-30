'use client';

import { useStore } from '@/globalState/store';
import Order from '../order/order';
import CommonMultiSelect from '../../CommonComponents/CommonMultiSelect/CommonMultiSelect';
import { useEffect, useState } from 'react';

export default function OrdersList() {
  const { shops, addStores, fetchOrders } = useStore();
  const STORE_IDS = ['AvtoKlan', 'AutoAx', 'iDoAuto', 'ToAuto'];
  const [storesList, setStoresList] = useState<string[]>(shops);
  const orders = useStore((state) => state.orders);

  useEffect(() => {
    addStores(storesList);
  }, [storesList, addStores]);

  useEffect(() => {
    if (storesList.length > 0) fetchOrders();
  }, [storesList, fetchOrders]);

  return (
    <section className="flex flex-col gap-2">
      <CommonMultiSelect values={storesList} setValues={setStoresList} multiple>
        {STORE_IDS}
      </CommonMultiSelect>
      <ul className="flex flex-col gap-2">
        {orders.map((elem) => (
          <li key={elem.id}>
            <Order id={elem.id} />
          </li>
        ))}
      </ul>
    </section>
  );
}

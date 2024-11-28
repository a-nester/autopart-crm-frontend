import { useStore } from '@/globalState/store';
import Order from '../order/order';

export default function OrdersList() {
  const orders = useStore((state) => state.orders);
  return (
    <ul className="flex flex-col gap-2">
      {orders.map((elem) => (
        <li key={elem.id}>
          <Order id={elem.id} />
        </li>
      ))}
    </ul>
  );
}

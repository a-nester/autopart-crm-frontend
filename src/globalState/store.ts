
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchAndSetOrders, getProductsByCategoryIdOperation, getStoreCategoriesOperation, setProductDiscountTimerOperation } from './operations';
import { OrdersStore } from '@/types/types';

// export const STORE_IDS = ['AvtoKlan', 'AutoAx', 'iDoAuto', 'ToAuto'];

const useStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],
      storeCategories: [],
      store: '',
      products: [],
      isLoading: false,
      error: null,
      stores: [
    'AvtoKlan',
    'AutoAx',
    'iDoAuto',
    'ToAuto',
  ],
      addStores: (newStores: string[]) => { set({ stores: [...newStores] }) },
      fetchOrders: async () => {
        const { stores } = get();
        await fetchAndSetOrders(stores, set);
      },
      clearOrders: () => set({ orders: [] }),
      addStore: (newStore: string) => {
        return set({ store: newStore });
      },
      getStoreCategories: async () => {
        const { store } = get();
        await getStoreCategoriesOperation(store, set);
      },
      getProductsByCategoryId: async (group_id: number) => {
        const { store } = get();
        await getProductsByCategoryIdOperation(store, set, group_id);
      },
      setProductDiscountTimer: async (timerParams) => {
        const { store } = get();
        await setProductDiscountTimerOperation(store, set, timerParams);
      }
    }),

    {
      name: 'orders-storage', // localstorage key
      partialize: (state) => ({ orders: state.orders }),
    },
  ),
);

export { useStore };

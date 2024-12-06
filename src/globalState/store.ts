import { PROM_URL } from '@/app/constants/constants';
import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Order = {
  id: number;
  promStoreId: number;
};

type State = {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
};

type Actions = {
  fetchOrders: () => Promise<void>;
  clearOrders: () => void;
};

type OrdersStore = State & Actions;

// export const API = axios.create({
//   baseURL: PROM_URL,
//   headers: {"Authorization": `Bearer ${token}`},

// })

const STORE_IDS = ['AvtoKlan', 'AutoAx', 'iDoAuto', 'ToAuto',];

const useStore = create<OrdersStore>()(
  persist(
    (set) => ({
      orders: [],
      isLoading: false,
      error: null,

      fetchOrders: async () => {
        set({ isLoading: true, error: null });
        try { 
          const responses = await Promise.all(
            STORE_IDS.map((storeId) => axios.get('/api/proxy', {
              params: { storeId },
            }).then((response) => ({ storeId, data: response.data}))
            ),
          );
            
          const orders = responses.flatMap(({storeId, data}) => data.orders.map((order)=>({...order, promStoreId: storeId})))
            .sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
          
          set({orders, isLoading: false})
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Unknown error',
            isLoading: false,
          })
        }
      },
      clearOrders: () => set({ orders: [] }),
    }),
    {
      name: 'orders-storage', // localstorage key
      partialize: (state) => ({ orders: state.orders }),
    },
  ),
);

export { useStore };

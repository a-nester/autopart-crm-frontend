import { PROM_URL } from '@/app/constants/constants';
import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const token = process.env.NEXT_PUBLIC_AVTOKLAN_TOKEN;

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
  removeAllBears: () => void;
};

type OrdersStore = State & Actions;

export const API = axios.create({
  baseURL: PROM_URL,
  headers: {"Authorization": `Bearer ${token}`},

})

const useStore = create<OrdersStore>()(
  persist(
    (set) => ({
      orders: [],
      isLoading: false,
      error: null,

      fetchOrders: async () => {
        set({ isLoading: true, error: null });
        try { 
          const response = await axios.get('/api/proxy');
          console.log(response);
          
          set({orders: response.data.orders, isLoading: false})
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Unknown error',
            isLoading: false,
          })
        }
      },
      removeAllBears: () => set({ orders: [] }),
    }),
    {
      name: 'orders-storage', // localstorage key
      partialize: (state) => ({ orders: state.orders }),
    },
  ),
);

export { useStore };

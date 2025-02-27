import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  fetchAndSetOrders,
  getProductDiscountTimerOperation,
  getProductsByCategoryIdOperation,
  getProductsByIdListOperation,
  getStoreCategoriesOperation,
  setProductDiscountTimerOperation,
  setTripOperation,
  userLoginOperation,
} from './operations';
import { OrdersStore, TimerParams, Trip } from '@/types/types';

// export const STORE_IDS = ['AvtoKlan', 'AutoAx', 'iDoAuto', 'ToAuto'];

const useStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      token: '',
      orders: [],
      storeCategories: [],
      shop: '',
      products: [],
      isLoading: false,
      error: null,
      shops: ['AvtoKlan', 'AutoAx', 'iDoAuto', 'ToAuto'],
      productsWithTimer: [],
      userLogin: async (email: string, password: string) => {
        try {
          await userLoginOperation( email, password);
          console.log('User logged in successfully');
        } catch (error) {
          console.error('Error during login', error);
        }
      },
      addStores: (newShops: string[]) => {
        set({ shops: [...newShops] });
      },
      fetchOrders: async () => {
        const { shops } = get();
        await fetchAndSetOrders(shops, set);
      },
      clearOrders: () => set({ orders: [] }),
      addStore: (newShop: string) => {
        return set({ shop: newShop });
      },
      getStoreCategories: async () => {
        const { shop } = get();
        await getStoreCategoriesOperation(shop, set);
      },
      getProductsByCategoryId: async (group_id: number) => {
        const { shop } = get();
        await getProductsByCategoryIdOperation(shop, set, group_id);
      },
      getProductsByIdList: async (products: TimerParams[]) => {
        const { shop } = get();
        await getProductsByIdListOperation(shop, set, products);
      },
      setProductDiscountTimer: async (timerParams) => {
        const { shop } = get();
        await setProductDiscountTimerOperation(shop, set, timerParams);
      },
      getProductDiscountTimer: async (getTimerParams) => {
        await getProductDiscountTimerOperation(set, getTimerParams);
      },
      setTrip: async (tripParams: Trip) => {
        await setTripOperation(set, tripParams);
      }
    }),

    {
      name: 'orders-storage', // localstorage key
      partialize: (state) => ({ orders: state.orders }),
    },
  ),
);

export { useStore };

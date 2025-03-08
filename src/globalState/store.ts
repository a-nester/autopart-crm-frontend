import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import {
  fetchAndSetOrders,
  getProductDiscountTimerOperation,
  getProductsByCategoryIdOperation,
  getProductsByIdListOperation,
  getStoreCategoriesOperation,
  getTripByIdOperation,
  getTripCustomersOperation,
  getTripsOperation,
  setProductDiscountTimerOperation,
  setTripCustomerOperation,
  setTripOperation,
  userLoginOperation,
} from './operations';
import { Customer, OrdersStore, TimerParams, Trip } from '@/types/types';

type OrdersPersist = Pick<OrdersStore, 'orders'>;

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
      tripsList: [],
      trip: {},
      customers: [],
      userLogin: async (email: string, password: string) => {
        try {
          await userLoginOperation(email, password);
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
        set({ shop: newShop });
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
      },
      getTrips: async () => {
        await getTripsOperation(set);
      },
      getTripById: async (tripId: string) => {
        await getTripByIdOperation(set, tripId);
      },
      setTripCustomer: async (customer: Customer) => {
        await setTripCustomerOperation(set, customer);
      },
      getTripCustomers: async () => {
        await getTripCustomersOperation(set);
  },

    }),
    
    {
      name: 'orders-storage',
      partialize: (state) => ({
        orders: state.orders,
      }),
    } satisfies PersistOptions<OrdersStore, OrdersPersist>
  )
);

export { useStore };

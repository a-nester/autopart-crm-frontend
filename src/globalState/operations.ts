import {  CategoryElement, Order, Product, TimerParams, Token } from "@/types/types";
import axios from "axios";



// type Order = {
//     id: number;
//     promStoreId: number;
// };

type SetFunction_fetchAndSetOrders = (partial: Partial<{
  orders: Order[];
  
    isLoading: boolean;
    error: string | null;
}>) => void;

type SetFunction_getStoreCategoriesOperation = (partial: Partial<{
  storeCategories: CategoryElement[];
  
    isLoading: boolean;
    error: string | null;
}>) => void;

type SetFunction_getProductsByCategoryIdOperation = (partial: Partial<{
  products: Product[];
  
    isLoading: boolean;
    error: string | null;
}>) => void;

type SetFunction_setProductDiscountTimerOperation = (partial: Partial<{
  response: {data: string};
    isLoading: boolean;
    error: string | null;
}>) => void;

type SetFunction_userLoginOperation = (partial: Partial<{
  token: string;
    isLoading: boolean;
    error: string | null;
}>) => void;

// storeCategories?: string[];
//   products: Product[];
//   response: {
//     data: string
//   }
// type SetFunction = Parameters<StateCreator<OrdersStore>>[1];

export const userLoginOperation = async (email: string, password: string) => {
  const URL = '/auth/login';
  const service = 'myApp';
  
  try {
    const response = await axios.post('/api/proxy', { email, password }, { params: { service } });
    const user = response.data;
    if (!user) {
      throw new Error('Invalid response: no user received');
    }
    return user;
} catch (error: any) {
  console.error('Login failed:', error);
}
}

export const fetchAndSetOrders = async (stores: string[], set: SetFunction_fetchAndSetOrders) => {
  set({ isLoading: true, error: null });
  
    const service = 'prom';
    const URL = 'orders/list/';
        try { 
          const responses = await Promise.all(
            stores.map((storeId) => axios
              .get('/api/proxy', { params: { service, storeId, URL } })
              .then((response) => ({ storeId, data: response.data }))
            ),
          );
            
          const orders = responses.flatMap(({storeId, data}) => data.orders.map((order: Order)=>({...order, promStoreId: storeId})))
            .sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
          
          set({orders, isLoading: false})
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Unknown error',
            isLoading: false,
          })
        }
}

export const getStoreCategoriesOperation = async (store: string, set: SetFunction_getStoreCategoriesOperation) => {
    const storeId = store[0];
const service = 'prom';
    set({ isLoading: true, error: null });
    const URL = 'groups/list';

    let last_id = null; 
    const storeCategories = []; 
    let shouldContinue = true;
  const params = {
      service,
                storeId,
                URL,
                limit: 100,
                last_id: null
    };
  
    try {
        while (shouldContinue) {
            

            if (last_id !== null) {
                params.last_id = last_id;
            }
            const response = await axios.get('/api/proxy', {
                params,
                headers: { 'Cache-Control': 'no-cache' },
            });
            const groups = response.data.groups; 
            if (groups && groups.length > 0) {
                storeCategories.push(...groups); 
                const lastGroup = groups[groups.length - 1];
                if (lastGroup && lastGroup.id) {
                    last_id = lastGroup.id;
                } else {
                    console.error("Помилка: останній елемент не має `id`");
                    shouldContinue = false;
                }
                if (groups.length < 100) {
                    shouldContinue = false;
                }
            } else {
                // Якщо `groups` порожній, завершуємо цикл
                console.warn("Відповідь порожня, завершення циклу");
                shouldContinue = false;
            }
        }

        console.log("Отримані категорії:", storeCategories);

        set({ storeCategories, isLoading: false });
    } catch (error) {
        // Обробка помилок
        set({
            error: error instanceof Error ? error.message : "Unknown error",
            isLoading: false,
        });
        console.error("Помилка при отриманні категорій:", error);
    }
};


export const getProductsByCategoryIdOperation = async (store: string, set: SetFunction_getProductsByCategoryIdOperation, group_id: number) => {
  const storeId = store[0];
  const service = 'prom';
  set({ isLoading: true, error: null });
  const URL = 'products/list/';
  try {
    const response = await axios
      .get('/api/proxy', { params: { service, storeId, URL, limit: 100, group_id } });
    
    const products = response.data.products;
    set({products, isLoading: false})
  } catch (error) {
    set({
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

export const setProductDiscountTimerOperation = async (store: string, set: SetFunction_setProductDiscountTimerOperation, timerParams: TimerParams) => {
  const storeId = store[0];
  const service = 'myApp';
  const URL = 'timers/';
  set({ isLoading: true, error: null });

  try {
    const response = await axios.post('/api/proxy',
      timerParams, {
      params: { service, storeId, URL },
    });
    set({ isLoading: false, response: response.data})
  } catch (error) {
    set({
      error: error instanceof Error ? error.message : 'Unkown error',
    })
  }

}


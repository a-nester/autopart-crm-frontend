import {  CategoryElement, Order, Product, TimerParams } from "@/types/types";
import axios from "axios";
import toast from "react-hot-toast";

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

type SetFunction_getProductsByIdListOperation = (partial: Partial<{
  products: Product[];
  isLoading: boolean;
  error: string | null;
}>) => void;

type SetFunction_setProductDiscountTimerOperation = (partial: Partial<{
  response: {data: string};
    isLoading: boolean;
    error: string | null;
}>) => void;

type SetFunction_getProductDiscountTimerOperation = (partial: Partial<{
  productsWithTimer: TimerParams[];
  isLoading: boolean;
  error: string | null;
}>) => void;

export const userLoginOperation = async (email: string, password: string) => {
  // const storeId = 'AvtoKlan';
  const service = 'myApp';
  const URL = 'auth/login';
  
  try {
    const loginParams = { email, password };
    
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/proxy`, 
  loginParams, { params: { service, URL } });

    console.log("1", response.data);
    const user = response.data;
    if (!user) {
      throw new Error('Invalid response: no user received');
    }
    return user;
} catch (error: unknown ) {
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


  
  let last_id = null;
  const products = [];
    let shouldContinue = true;
    const params = {
      service,
      storeId,
      URL,
      limit: 100,
      last_id: null,
      group_id
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
            
            // console.log("Response", response);
            const newProducts = response.data.products; 
          if (newProducts && newProducts.length > 0) {
              
                products.push(...newProducts); 
                const lastProduct = newProducts[newProducts.length - 1];
                if (lastProduct && lastProduct.id) {
                    last_id = lastProduct.id;
                } else {
                    console.error("Помилка: останній елемент не має `id`");
                    shouldContinue = false;
                }
                if (newProducts.length < 100) {
                    shouldContinue = false;
                }
            } else {
                // Якщо `groups` порожній, завершуємо цикл
                console.warn("Відповідь порожня, завершення циклу");
                shouldContinue = false;
            }
        }
      
        set({ products, isLoading: false });
    } catch (error) {
        // Обробка помилок
        set({
            error: error instanceof Error ? error.message : "Unknown error",
            isLoading: false,
        });
        console.error("Помилка при отриманні категорій:", error);
    }
  
}

export const getProductsByIdListOperation = async (store: string, set: SetFunction_getProductsByIdListOperation, productsList: TimerParams[]) => {
  const storeId = store[0];
  const service = 'prom';
  
  try {
    const responses = await Promise.all(
      productsList.map(product => axios
        .get('/api/proxy', {
          params: {
            service, storeId, URL: `/products/${product.
              productId
              }`
          }
        })
        // .then((response)=> ({response.data}))
      )
    );
    const products = responses.map(response => response.data.product);
    console.log('Products:', products);
    set({products, isLoading: false});
  } catch (error) {
    console.error('Error fetching products:', error);
    
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
    set({ isLoading: false, response: response.data })
    toast.success('Ціновий таймер успішно додано!')
  } catch (error) {
    set({
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    toast.error('Виникла помилка з встановленням таймера!')
  }

}

export const getProductDiscountTimerOperation = async (set: SetFunction_getProductDiscountTimerOperation, getTimerParams: string) => {
  set({ isLoading: true, error: null });

  const service = 'myApp';
  const storeId = getTimerParams;
  // const id = getTimerParams.productId;
  const URL = `timers/?shop=${storeId}`;
  
  
  try {
    const response = await axios.get('/api/proxy', {
      params: {
        service,
        storeId,
        URL,
      }
    });
    set({productsWithTimer: response.data.data, isLoading: false})
  } catch (error) {
    set({error: error instanceof Error ? error.message : 'Unknown error'})
  }
}


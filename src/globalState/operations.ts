import {  CategoryElement, Cost, CostsFilter, Customer, Order, OrdersStore, Product, TimerParams, Trip } from "@/types/types";
import axios from "axios";
import toast from "react-hot-toast";
import { useStore } from "./store";

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

type GetFunction_getProductDiscountTimerOperation = (partial: Partial<{
  productsWithTimer: TimerParams[];
  isLoading: boolean;
  error: string | null;
}>) => void;

// type SetFunction_setTripOperation = (partial: Partial<{
//   tripsList: { data: string };
//   isLoading: boolean;
//   error: string | null;
// }>) => void;

type SetFunction_setTripOperation = (partial: Partial<OrdersStore> | ((state: OrdersStore) => Partial<OrdersStore>)) => void;

type SetFunction_getTrips = (partial: Partial<{
  tripsList: Trip[];
  isLoading: boolean;
  error: string | null;
}>) => void;

type SetFunction_getTripById = (partial: Partial<{
  trip: Trip;
  isLoading: boolean;
  error: string | null;
}>) => void;

type SetFunction_updateTrip = (partial: Partial<{
  trip: Trip;
  isLoading: boolean;
  error: string | null;
}>) => void;

type SetFunction_getCustomer = (partial: Partial<{
  customers: Customer[];
  isLoading: boolean;
  error: string | null;
}>) => void;

type SetFunction_getCostsOperation = (partial: Partial<{
  costsByParam: Cost[];
  isLoading: boolean;
  error: string | null;
}>) => void;

type SetFunction_deleteCostsOperation = (partial: Partial<{
  costsByParam: Cost[];
  isLoading: boolean;
  error: string | null;
}>) => void;

// Trade Operations

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

export const getProductDiscountTimerOperation = async (set: GetFunction_getProductDiscountTimerOperation, getTimerParams: string) => {
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

// Transport Operations

export const setTripOperation = async (set: SetFunction_setTripOperation, setTripParams: Trip) => {
  const service = 'myApp';
  const URL = 'transport/';
  set({ isLoading: true, error: null });

  try {
    const response = await axios.post('/api/proxy', setTripParams, {
      params: { service, URL },
    });
    set((state: OrdersStore) => ({
      isLoading: false,
      tripsList: [...state.tripsList, response.data.data],
    }));
    toast.success('Рейс успішно записано!')
  } catch (error) {
    set({
      error: error instanceof Error ? error.message: 'Unknown error',
    })
    toast.error('Виникла помилка з записом рейсу!')
  }
}

export const getTripsOperation = async (set: SetFunction_getTrips, ) => {
  set({ isLoading: true, error: null });
  const service = 'myApp';
  const URL = 'transport/';

  try {
    const response = await axios.get('/api/proxy', {
    params: { service, URL }
  })
  set({isLoading: false, tripsList: response.data.data.data})
  } catch (error) {
    set({ error: error instanceof Error ? error.message : 'Unknown error' })
    toast.error('Виникла помилка з завантаженням списку рейсів!')
  }
}

export const getTripByIdOperation = async (set: SetFunction_getTripById, tripId: string) => {
  set({ isLoading: true, error: null });
  const service = 'myApp';
  const URL = `transport/${tripId}`;

  try {
    const response = await axios.get('/api/proxy', {
      params: {
      service, URL
      }
    })
    set({isLoading: false, trip: response.data.data})
  } catch (error) {
    set({ error: error instanceof Error ? error.message : 'Unknown error' })
    toast.error('Виникла помилка з завантаженням даних рейса!')
  }
}

export const updateTripOperation = async (set: SetFunction_updateTrip , trip: Trip, id: string) => {
  set({ isLoading: true, error: null });
  const service = 'myApp';
  const URL = `transport/${id}`;

  try {
    const response = await axios.patch('/api/proxy', trip , {
      params: {
      service, URL
      }
    })
    set({ isLoading: false, trip: response.data.data })
    toast.success('Дані рейсу успішно оновлені!')
  } catch (error) {
    set({ error: error instanceof Error ? error.message : 'Unknown error' })
    toast.error('Виникла помилка з оновленням даних рейса!')
        
  }
}

export const setTripCustomerOperation = async (set: { (partial: OrdersStore | Partial<OrdersStore> | ((state: OrdersStore) => OrdersStore | Partial<OrdersStore>), replace?: false): void; (state: OrdersStore | ((state: OrdersStore) => OrdersStore), replace: true): void; (arg0: { (prevState: OrdersStore): Partial<{ customers: Customer[]; isLoading: boolean; error: string | null; }>; isLoading?: boolean; error?: string | null; }): void; }, customer: Customer) => {
  set({ isLoading: true, error: null });
  const service = 'myApp';
  const URL = 'transport/customer/'

  try {
    const response = await axios.post('/api/proxy', customer, {
      params: {
      service, URL
      }
    })
  set((prevState: OrdersStore) => ({
  customers: [...(prevState.customers || []), response.data.data], // Перевіряємо, чи існує customers
  isLoading: false,
  error: null
  }) as Partial<{ customers: Customer[]; isLoading: boolean; error: string | null }>);
    toast.success('Експедитора успішно додано!')

  } catch (error) {
    set({
      error: error instanceof Error ? error.message: 'Unknown error'
    })
    toast.error('Виникла помилка з записом експедитора!')
  }
}


export const getTripCustomersOperation = async (set: SetFunction_getCustomer) => {
  set({ isLoading: true, error: null });
  const service = 'myApp';
  const URL = 'transport/customers/';
  
  try {
    const response = await axios.get('/api/proxy', {
      params: {
        service, URL
      }
    });
    set({ customers: response.data.data, isLoading: false })
    
  } catch (error) {
    set({ isLoading: false, error: error instanceof Error ? error.message : 'Unknown error' });
    toast.error('Виникла помилка при завантаження переліку експедиторів!')
  }
}

export const setCostOperation = async (set: { (partial: OrdersStore | Partial<OrdersStore> | ((state: OrdersStore) => OrdersStore | Partial<OrdersStore>), replace?: false): void; (state: OrdersStore | ((state: OrdersStore) => OrdersStore), replace: true): void; (arg0: { (prevState: OrdersStore): Partial<{ costs: Cost[]; isLoading: boolean; error: string | null; }>; isLoading?: boolean; error?: string | null; }): void; }, cost: Cost) => {
  set({ isLoading: true, error: null });
  const service = 'myApp';
  const URL = 'transport/cost/';

  try {
    const response = await axios.post('/api/proxy', cost, {
      params: {
      service, URL
      }
    })
    set((prevState: OrdersStore) => ({
  costs: [...(prevState.costs || []), response.data.data], // Перевіряємо, чи існує customers
  isLoading: false, error: null
    }) as Partial<{ costs: Cost[]; isLoading: boolean; error: string | null }>);
    toast.success('Витрата успішно записана!')
  } catch (error) {
    set({ isLoading: false, error: error instanceof Error ? error.message : 'Unknown error' });
    toast.error('Виникла помилка при створенні витрати!');
  }
}

export const getCostsOperation = async (set: SetFunction_getCostsOperation, costsFilter: CostsFilter) => {
  console.log(costsFilter);
  
  set({ isLoading: true, error: null });
  const service = 'myApp';
  const URL = 'transport/costs/';

  try {
    const response = await axios.get('/api/proxy', {
      params: {
        service,
        URL,
        filter: costsFilter,
      }
    });

    set({isLoading: false, costsByParam: response.data.data.data})
  } catch (error) {
    set({ isLoading: false, error: error instanceof Error ? error.message : 'Unknown error' });
    toast.error('Виникла помилка при завантаження переліку витрат!')
  }
}

export const deleteCostsOperation = async (set: SetFunction_deleteCostsOperation, costs: Record<string, boolean>) => {
  set({ isLoading: true, error: null });
  const service = 'myApp';  

  try {
    const responses = await Promise.all(
      Object.keys(costs).map((key) => {
        const URL = `transport/cost/${key}/`
         return axios.delete('/api/proxy', {
          params: {
            service, URL
          }
        }).then((response) => ({ _id: key, data: response.data }))
      })
    );
    const costsByParam = useStore.getState().costsByParam;
    const updatedCosts = costsByParam.filter(
      (cost) => !responses.some((res) => res._id === cost._id)
    );

    set({ costsByParam: updatedCosts, isLoading: false });  
  } catch (error) {
    set({ isLoading: false, error: error instanceof Error ? error.message : 'Unknown error' });
    toast.error('Виникла помилка при видаленні переліку витрат!')
  }
}
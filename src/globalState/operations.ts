import axios from "axios";
import { log } from "console";

type Order = {
    id: number;
    promStoreId: number;
};

type SetFunction = (partial: Partial<{
    orders: Order[];
    isLoading: boolean;
    error: string | null;
}>) => void;

export const fetchAndSetOrders = async (stores: string[], set: SetFunction) => {
    set({ isLoading: true, error: null });
    const URL = 'orders/list/';
        try { 
          const responses = await Promise.all(
            stores.map((storeId) => axios
              .get('/api/proxy', { params: { storeId, URL } })
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

export const getStoreCategoriesOperation = async (store, set) => {
    const storeId = store[0];

    set({ isLoading: true, error: null });
    const URL = 'groups/list';

    let last_id = null; 
    const storeCategories = []; 
    let shouldContinue = true;
    const params = {
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


export const getProductsByCategoryIdOperation = async (store, set, group_id) => {
  const storeId = store[0];
  set({ isLoading: true, error: null });
  const URL = 'products/list/';
  try {
    const response = await axios
      .get('/api/proxy', { params: { storeId, URL, limit: 100, group_id } });
    
    const products = response.data.products;
    set({products, isLoading: false})
  } catch (error) {
    set({
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
import axios from "axios";

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
    const URL = 'groups/list'
    try {
        const response = await axios
                .get('/api/proxy', { params: { storeId, URL, limit:100, page: 1 } })
                // .then((response) => ({ storeId, data: response.data }))
                const storeCategories = response.data.groups;
                // console.log(response);
// )
        set({storeCategories, isLoading: false})
    } catch (error) {
        set({
            error: error instanceof Error ? error.message : "Unknown error",
            isLoading: false,
        })
    }
}

export const getProductsByCategoryIdOperation = async (store, set, group_id) => {
  const storeId = store[0];
  set({ isLoading: true, error: null });
  const URL = 'products/list/';
  try {
    const response = await axios
      .get('/api/proxy', { params: { storeId, URL, limit: 100, group_id } });
    console.log("products_data", response);
    
    const products = response;
  } catch (error) {
    set({
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
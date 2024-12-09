// export type storeCategories = {

// }

export type Order = {
  id: number;
  promStoreId: number;
};

export type Category = {
   id: number,
  name: string,
      name_multilang: {
        ru: string,
        uk: string
      },
      description: string,
      description_multilang: {
        ru: string,
        uk: string
      },
      image: string,
      parent_group_id: number
};

export type Product = {
    id: number,
      external_id: string,
      name: string,
      name_multilang: {
        ru: string,
        uk: string
      },
      sku: string,
      keywords: string,
      description: string,
      description_multilang: {
        ru: string,
        uk: string
      },
      selling_type: string,
      presence: string,
      in_stock: boolean,
      regions: [
        {
          id: number,
          name: string,
          name_multilang: {
            ru: string,
            uk: string
          }
        }
      ],
      price: number,
      minimum_order_quantity: number,
      discount: {
        value: number,
        type: string,
        date_start: string,
        date_end: string
      },
      currency: string,
      group: {
        id: number,
        name: string,
        name_multilang: {
          ru: string,
          uk: string
        }
      },
      category: {
        id: number,
        caption: string
      },
      prices: [
        {
          price: number,
          minimum_order_quantity: number
        }
      ],
      main_image: string,
      images: [
        {
          url: string,
          thumbnail_url: string,
          id: number
        }
      ],
      status: string,
      quantity_in_stock: number,
      measure_unit: string,
      is_variation: boolean,
      variation_base_id: number,
      variation_group_id: number
}

export type State = {
  orders: Order[];
    storeCategories: Category[];
    store: string;
    products: Product[];
  isLoading: boolean;
    error: string | null;
    stores: string[];
};

export type Actions = {
    addStores: (newStores: string[]) => void;
    fetchOrders: () => Promise<void>;
    clearOrders: () => void;
    addStore: (newStore: string) => void;
    getStoreCategories: () => void;
    getProductsByCategoryId: (group_id: number) => void;

};

export type OrdersStore = State & Actions;
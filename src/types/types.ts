// export type storeCategories = {

// }

export type Order = {
  id: number;
  promStoreId: number;
};

export type Category = {
  id: number;
  caption: string;
};

export type Discount = {
  type: string;
  value: number;
  dateEnd: string;
  dateStart: string;
};

export type Groupe = {
  id: number;
  name: string;
  name_multilang: { ru: string; uk: string };
};

export type ImageItem = {
  id: number;
  thumbnail_url: string;
  url: string;
};

export type Product = {
  category: Category;
  currency: string;
  date_modified: string;
  description: string;
  description_multilang: {
    ru: string;
    uk: string;
  };
  discount: Discount;
  external_id: string;
  group: Groupe;
  id: number;
  images: ImageItem[];
  in_stock: boolean;
  is_variation: boolean;
  keywords: string;
  main_image: string;
  measure_unit: string;
  minimum_order_quantity: number | null;
  name: string;
  name_multilang: {
    ru: string;
    uk: string;
  };
  presence: string;
  price: number | null;
  prices: number[];
  quantity_in_stock: number | null;
  regions: string[];
  selling_type: string;
  sku: string;
  status: string;
  variation_base_id: number | null;
  variation_group_id: number | null;
};

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
  setProductDiscountTimer: (timerParams: {}) => void;
};

export type OrdersStore = State & Actions;


export type Token = {
  accessToken: string
}

export type Discount = {
  type: string | undefined;
  value: number | undefined;
  date_end?: string;
  date_start?: string;
} | null;

export type Category = {
  id: number;
  caption: string;
  parent_group_id?: number | null;
};

export type CategoryElement = {
  id: number;
  name_multilang: {
    uk: string;
    [key: string]: string;
  };
  parent_group_id?: number | null;
  // Add other properties that `element` may have
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

export type OrderProduct = {
  cpa_commission: { amount: string };
  external_id: string;
  id: number;
  image: string;
  measure_unit: string;
  name: string;
  name_multilang: {
    ru: string,
    uk: string
  };
  price: string;
  quantity: number;
  sku: string;
  total_price: string;
  url: string;
}

// export type Order = {
//   id: number;
//   promStoreId: number;
//   date_created: string;
//   products: OrderProduct[];
//   // {
//   //   image: string;
//   //   name_multilang: {
//   //     uk: string;
//   //     [key: string]: string;
//   //   };
//   // }[];
//   full_price: number;
//   cpa_commission: {
//     amount: number;
//   };
// };

export type Order = {
  cancellation: string | null;
  client: {
    first_name: string; //'Анна',
    last_name: string; //'Пархоменко',
    second_name: string | null;
    id: number; //280429035
  };
  client_first_name: string; //"Анна"
  client_id: number;  //280429035
  client_last_name: string; //"Пархоменко"
  client_notes: string; // ""
  client_second_name: string | null;
  cpa_commission: {
    amount: string; //'2.86',
    is_refunded: boolean
  }
  date_created: string; //"2025-01-23T16:16:39.053131+00:00"
  date_modified: string; //"2025-01-26T09:42:44.642314+00:00"
  delivery_address: string; //"с. Доброводи (Черкаська обл.), Пункт приймання-видачі (до 30 кг): вул. Незалежності, 5а"
  delivery_cost: number; //105
  delivery_option: {
    id: number;  //14869279,
    name: string; //'Нова Пошта',
    shipping_service: string; //null
  }
  delivery_provider_data: {
    provider: string;  //'nova_poshta',
    type: string;  //'W2W',
    sender_warehouse_id: string;  //'32902192-3f5a-11e6-a9f2-005056887b8d',
    recipient_warehouse_id: string;  //'7a2dbd93-f7e5-11e9-9c59-005056b24375',
    declaration_number: string;  //'20451090131101', 
    recipient_address: {
      apartment_number: string | null;
      building_number: string | null;
      city_id: string;  //"24cd0822-cf18-11e9-b0c5-005056b24375"
      city_name: string;  //"с. Доброводи (Черкаська обл.)"
      street_id: string | null;
      street_name: string | null;
      warehouse_id: string;  //"7a2dbd93-f7e5-11e9-9c59-005056b"  
    }
    unified_status: string;  //"on_the_way"
  }
  delivery_recipient: object
  dont_call_customer_back: boolean;
  email: string | null;
  full_price: string;
  has_order_promo_free_delivery: boolean;
  id: number;
  payment_data: {
    type: string;  //'evopay',
    status: string;  //'paid',
    status_modified: string;  //'2025-01-23T16:17:16.903988+00:00'
  }
  payment_option: {
    id: number, 
    name: string
  }
  phone: string;
  price: string;
  price_with_special_offer: null;
  products: OrderProduct[];
  promStoreId: string;  //"iDoAuto";
  ps_promotion: null;
  source: string;  //"mobile_catalog_app";
  special_offer_discount: null;
  special_offer_promocode: null;
  status: string;  //"delivered";
  status_name: string;  //"Выполнен";
  utm: {
    campaign: string; // ""
    medium: string; // "trigger)"
    sourc: string; //"viber"
  }
}

export type State = {
  token: string;
  orders: Order[];
  storeCategories: PromGroup[];
  shop: string;
  products: Product[];
  isLoading: boolean;
  error: string | null;
  shops: string[];
  productsWithTimer: TimerParams[];
  tripsList: Trip[];
  trip: Trip | null;
  customers: Customer[],
  costs: Cost[],
  costsByParam: Cost[],
  excellGroups: ExcellGroup[],
};

export type TimerParams = {
  shop: string;
  productId: number;
  dayDiscountType: string;
  dayDiscount: number;
  nightDiscountType: string;
  nightDiscount: number;
}

export type GetTimerParams = {
  shop: string;
  productId: number;
}

export type Actions = {
  addStores: (newStores: string[]) => void;
  fetchOrders: () => Promise<void>;
  clearOrders: () => void;
  addStore: (newStore: string) => void;
  getStoreCategories: () => void;
  getProductsByCategoryId: (group_id: number) => void;
  getProductsByIdList: (productsList: TimerParams[]) => void;
  setProductDiscountTimer: (timerParams: TimerParams) => void;
  getProductDiscountTimer: (getTimerParams: string) => void;
  setTrip: (tripParams: Trip) => void;
  getTrips: () => void;
  getTripById: (tripId: string) => void;
  setTripCustomer: (customer: Customer) => void;
  getTripCustomers: () => void;
  updateTrip: (trip: Trip, id: string) => void;
  setCost: (cost: Cost) => void;
  getCosts: (costsFilter: CostsFilter) => void;
  deleteCosts: (costs: Record<string, boolean>) => void;
  getExcellGroups: (groupFilter: GroupFilter) => void;
};

export type OrdersStore = State & Actions;

export type STORES = Record<string, { token: string | undefined }>;

// TRANSPORT

export type Currency = 'USD' | 'UAH' | 'EUR' | string;

export type TripRowProps = {
  id: string;
  driver: string;
  truck: string[];
  loadingPlace: string;
  loadDate: string;
  unloadingPlace: string,
  unloadDate: string,
  rangeToStart: number;
  range: number;
  price: number;
}

export type Trip = {
  _id?: string | undefined,
  driver: string | undefined,
  truck: string[] | undefined,
  loadingPlace: string | undefined,
  loadDate: number | null,
  unloadingPlace: string | undefined,
  unloadDate?: number | null,
  rangeTo: number,
  range: number,
  price: number | undefined,
  currency: Currency,
  payment_Form: string | undefined,
  dispetcher_id: number | undefined,
  dispetcher_fee: number | undefined,
  dispetcher_Currency: Currency | undefined,
  weight: number
}
    
export type Customer = {
  _id?: number;
  name: string;
  company?: string;
  phone?: string;
  email?: string;
};

export type Cost = {
  _id?: string,
  name: string,
  date: number,
  odometr: number | null | undefined,
  costType: string,
  price: number,
  currency: string,
  company?: string,
  truck: string,
  driver: string,
  tripId?: string,
};

export type CostsFilter = {
  _id?: string, 
  name?: string,
  costType?: string,
  date?: string,
  truck?: string,
  driver?: string,
  tripId?: string,
};

export type ExcellGroup = {
  _id: string;
  name: string;
  code: number;
  createdAt?: string;
  updatedAt?: string;
};

export type PromGroup = {
  id: number;
  name: string;
  description: string;
  description_multilang: {
    ru: string;
    uk: string;
  };
  image: string;
  name_multilang: {
    ru: string;
    uk: string;
  }
  parent_group_id: number;
}

export type GroupFilter = {
  page?: number;
  perPage?: number;
}
'use client';

import TimersSideBar from '@/components/TimersSideBar/TimersSideBar';

export default function Page({ children }: { children: React.ReactElement }) {
  //   const {
  //     store,
  //     addStore,
  //     storeCategories,
  //     getStoreCategories,
  //     products,
  //     getProductsByCategoryId,
  //   } = useStore();
  //   const [fetchStore, setFetchStore] = useState([]);
  //   const [subCategory, setSubCategory] = useState([]);
  //   const [categoryId, setCategoryId] = useState(null);
  //   const STORE_IDS = ['AvtoKlan', 'AutoAx', 'iDoAuto', 'ToAuto'];

  return (
    <section className="flex flex-row p-3">
      <TimersSideBar />
      {children}
    </section>
  );
}

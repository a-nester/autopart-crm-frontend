'use client';

import { CategoriesNav } from '@/components/CategoriesNav/CategoriesNav';

import { useStore } from '@/globalState/store';
import { getRootCategories } from '@/helpers/getCategories';
import { useEffect } from 'react';

export type PageProps = object;

export default function Page({}: PageProps) {
  const { shop, storeCategories, getStoreCategories } = useStore();

  useEffect(() => {
    if (shop) getStoreCategories();
  }, [shop, getStoreCategories]);

  const rootCategories = getRootCategories(storeCategories);

  return (
    <section className="flex flex-col gap-3 min-w-52 max-w-32 ">
      <CategoriesNav>{rootCategories}</CategoriesNav>
    </section>
  );
}

'use client';

import { CategoriesNav } from '@/components/CategoriesNav/CategoriesNav';
import { getRootCategories } from '@/helpers/getCategories';
import { PromGroup } from '@/types/types';

export type PageProps = {
  children: PromGroup[];
  onSave: (elem: PromGroup) => void;
};
export default function CategoriesSelector({ children, onSave }: PageProps) {
  const storeCategories = children;
  const rootCategories = getRootCategories(storeCategories);

  return (
    <section className="flex flex-col gap-3 h-[85vh] overflow-y-auto">
      <CategoriesNav button={true} onSave={onSave}>
        {rootCategories}
      </CategoriesNav>
    </section>
  );
}

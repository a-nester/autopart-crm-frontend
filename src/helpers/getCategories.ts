import { CategoryElement, PromGroup } from "@/types/types";


 export const getRootCategories = (storeCategories: PromGroup[]): PromGroup[] => {
  // Перевірка на наявність значення parent_group_id
  const minParentGroupId = storeCategories.reduce(
    (min: number, elem: CategoryElement) => {
      // Якщо parent_group_id не визначено, просто пропускаємо цей елемент
      if (elem.parent_group_id === undefined || elem.parent_group_id === null) {
        return min;
      }
      // Знаходимо мінімальне значення
      return elem.parent_group_id < min ? elem.parent_group_id : min;
    },
    Infinity, // Початкове значення Infinity
  );

  // Перевірка, чи було знайдено коректне значення minParentGroupId
  if (minParentGroupId === Infinity) {
    return []; // Якщо не знайшли, повертаємо порожній масив
  }

  const rootCategories = storeCategories.filter(
    (elem) => elem.parent_group_id === minParentGroupId,
  );

  return rootCategories;
};

export const getSubcategoriesByParentId = (
  storeCategories: PromGroup[],
  parentCatId: number,
): PromGroup[] => {
  return storeCategories.filter((elem) => elem.parent_group_id === parentCatId);
};
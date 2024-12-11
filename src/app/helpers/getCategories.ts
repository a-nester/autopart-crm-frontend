

export const getRootCategories = (storeCategories) => {
    const minParentGroupId = storeCategories.reduce(
        (min: number, elem: any) =>
          elem.parent_group_id !== null && elem.parent_group_id < min
            ? elem.parent_group_id
            : min,
        Infinity,
      );
      const rootCategories = storeCategories.filter(
        (elem) => elem.parent_group_id === minParentGroupId,
      );
    return rootCategories;
}

export const getSubcategoriesByParentId = (storeCategories, parentCatId) => {
  return storeCategories.filter((elem) => elem.parent_group_id === parentCatId)
}
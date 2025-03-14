import { getSubcategoriesByParentId } from '@/helpers/getCategories';
import { useStore } from '@/globalState/store';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { useEffect, useState } from 'react';
import { CategoryElement } from '@/types/types';

// Define the type for the element prop

export function AccordionItem({ element }: { element: CategoryElement }) {
  const { storeCategories, getProductsByCategoryId } = useStore();
  const [subCategories, setSubCategory] = useState<CategoryElement[] | null>(
    null,
  );

  const group_id = element.id;

  useEffect(() => {
    const subCategories = getSubcategoriesByParentId(storeCategories, group_id);
    setSubCategory(subCategories);
  }, [group_id, storeCategories]); // Ensure dependencies are properly set

  const handleClick = () => {
    getProductsByCategoryId(group_id);
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary className="m-1 bg-gray-100 rounded-md">
          <div onClick={handleClick}>{element.name_multilang.uk}</div>
        </AccordionSummary>
        <AccordionDetails className="p-1">
          {subCategories && (
            <ul>
              {subCategories.map((subElem) => (
                <li key={subElem.id}>
                  <AccordionItem element={subElem} />
                </li>
              ))}
            </ul>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

import { getSubcategoriesByParentId } from '@/app/helpers/getCategories';
import {} from '@/globalState/operations';
import { useStore } from '@/globalState/store';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { useEffect, useState } from 'react';

export function AccordionItem({ element }) {
  const { storeCategories, getProductsByCategoryId } = useStore();
  const [subCategories, setSubCategory] = useState();

  const group_id = element.id;
  useEffect(() => {
    const subCategories = getSubcategoriesByParentId(storeCategories, group_id);
    setSubCategory(subCategories);
  }, []);

  const handleClick = () => {
    getProductsByCategoryId(group_id);
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary className="m-1 bg-gray-100 rounded-md">
          <button onClick={handleClick}>{element.name_multilang.uk}</button>
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

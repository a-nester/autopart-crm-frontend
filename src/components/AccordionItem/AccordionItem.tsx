import { getSubcategoriesByParentId } from '@/helpers/getCategories';
import { useStore } from '@/globalState/store';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { useEffect, useState } from 'react';
import { PromGroup } from '@/types/types';
import Button from '../CommonComponents/Button/Button';

export function AccordionItem({
  element,
  button,
  onSave,
}: {
  element: PromGroup;
  button?: boolean;
  onSave?: (id: PromGroup) => void;
}) {
  const { storeCategories, getProductsByCategoryId } = useStore();
  const [subCategories, setSubCategory] = useState<PromGroup[] | null>(null);

  const group_id = element.id;

  useEffect(() => {
    const subCategories = getSubcategoriesByParentId(storeCategories, group_id);
    setSubCategory(subCategories);
  }, [group_id, storeCategories]); // Ensure dependencies are properly set

  const handleClick = () => {
    getProductsByCategoryId(group_id);
  };

  const handleSave = () => {
    if (onSave) onSave(element);
  };

  return (
    <div>
      <Accordion className="w-full">
        <div className="w-full flex justify-between items-center ">
          <AccordionSummary className="m-1 bg-gray-100 rounded-md ">
            <div onClick={handleClick}>{element.name_multilang.uk}</div>
          </AccordionSummary>
          {button && <Button onClick={handleSave}>Вибрати</Button>}
        </div>
        <AccordionDetails className="p-1">
          {subCategories && (
            <ul>
              {subCategories.map((subElem) => (
                <li key={subElem.id}>
                  <AccordionItem
                    element={subElem}
                    button={button}
                    onSave={onSave}
                  />
                </li>
              ))}
            </ul>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

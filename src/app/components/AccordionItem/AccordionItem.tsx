import {} from '@/globalState/operations';
import { useStore } from '@/globalState/store';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { useEffect } from 'react';

export function AccordionItem({ children, element }) {
  const { getProductsByCategoryId } = useStore();
  const group_id = element.id;

  const handleClick = () => {
    getProductsByCategoryId(group_id);
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary>
          <button onClick={handleClick}>{element.name_multilang.uk}</button>
        </AccordionSummary>
        <AccordionDetails>{}</AccordionDetails>
      </Accordion>
    </div>
  );
}

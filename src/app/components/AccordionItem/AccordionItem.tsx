import {} from '@/globalState/operations';
import { useStore } from '@/globalState/store';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { useEffect } from 'react';

export function AccordionItem({ children, element }) {
  const { getProductsByCategoryId } = useStore();
  console.log(children);

  const group_id = element.id;
  useEffect(() => {
    getProductsByCategoryId(group_id);
  }, []);

  return (
    <div>
      <Accordion>
        <AccordionSummary>{element.name_multilang.uk}</AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
}

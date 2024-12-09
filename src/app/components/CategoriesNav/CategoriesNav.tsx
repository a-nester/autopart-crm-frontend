import { AccordionItem } from '../AccordionItem/AccordionItem';

export function CategoriesNav({ children }) {
  console.log(children);

  return (
    <section>
      {children.map((elem) => (
        <li key={elem.id}>
          <AccordionItem element={elem}>
            {/* {<AccordionItem></AccordionItem>} */}
          </AccordionItem>
        </li>
      ))}
    </section>
  );
}

'use client';

import { AccordionItem } from '../AccordionItem/AccordionItem';
import { CategoryElement } from '../../types/types';

export function CategoriesNav({ children }: { children: CategoryElement[] }) {
  //   console.log(children);
  // const [subItem, setSubItem] = useState();

  return (
    <section>
      <ul>
        {children.map((elem) => (
          <li key={elem.id}>
            <AccordionItem element={elem} />
          </li>
        ))}
      </ul>
    </section>
  );
}

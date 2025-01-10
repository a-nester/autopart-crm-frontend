'use client';

import { useState } from 'react';
import { AccordionItem } from '../AccordionItem/AccordionItem';

export function CategoriesNav({ children }) {
  //   console.log(children);
  const [subItem, setSubItem] = useState();

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

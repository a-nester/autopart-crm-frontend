'use client';

import { AccordionItem } from '../AccordionItem/AccordionItem';
import { PromGroup } from '../../types/types';

export function CategoriesNav({
  children,
  button,
  onSave,
}: {
  children: PromGroup[];
  button?: boolean;
  onSave?: (elem: PromGroup) => void;
}) {
  return (
    <section>
      <ul className="flex flex-col gap-1">
        {children.map((elem) => (
          <li
            key={elem.id}
            className="flex w-full justify-between items-center"
          >
            <AccordionItem element={elem} button={button} onSave={onSave} />
          </li>
        ))}
      </ul>
    </section>
  );
}

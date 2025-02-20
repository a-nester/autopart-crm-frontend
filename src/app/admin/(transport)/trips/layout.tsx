import Header from '@/components/header';
import { ReactNode } from 'react';

type LayoutProps = { children: ReactNode };

export default function Layout({ children }: LayoutProps) {
  return (
    <section>
      <Header>Список рейсів</Header>
      {children}
    </section>
  );
}

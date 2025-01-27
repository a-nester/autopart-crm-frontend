'use client';

import Header from '@/components/header';
import { GetStaticProps, GetStaticPaths } from 'next';

// Тип для пропсів сторінки
interface PageProps {
  companyId: string;
}

// getStaticProps для отримання companyId
export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const { id } = params!;

  // Повертаємо companyId в пропсах
  return {
    props: {
      companyId: id as string,
    },
  };
};

// getStaticPaths для динамічних маршрутів
export const getStaticPaths: GetStaticPaths = async () => {
  // Приклад динамічних шляхів
  const paths = [
    { params: { id: '1' } },
    { params: { id: '2' } },
    { params: { id: '3' } },
    // додайте інші ID компаній тут
  ];

  return {
    paths,
    fallback: false, // false означає, що для невизначених шляхів буде 404
  };
};

const Page = ({ companyId }: PageProps) => {
  return (
    <>
      <Header>Companies ({companyId})</Header>
    </>
  );
};

export default Page;

import prismadb from '@/lib/prismadb';

import { format } from 'date-fns';
import React, { FC } from 'react';

import { CategoryClient } from './components/CategoryClient';
import { CategoryColumn } from './components/Column';

interface CategoriesPageProps {
  params: { storeId: string };
}

export const CategoriesPage: FC<CategoriesPageProps> = async ({ params }) => {
  const categories = await prismadb.category.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: 'desc' },
    include: {
      billboard: true,
    },
  });

  const formattedCategory: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategory} />
      </div>
    </div>
  );
};

export default CategoriesPage;

import prismadb from '@/lib/prismadb';
import { isValidObjectId } from '@/lib/utils';

import React, { FC } from 'react';

import { Billboard, Category } from '@prisma/client';

import CategoryForm from './components/CategoryForm';

interface CategoryPageProps {
  params: { categoryId: string; storeId: string };
}

export const CategoryPage: FC<CategoryPageProps> = async ({ params }) => {
  let category: Category | null = null;
  let billboards: Billboard[] | null = null;

  if (isValidObjectId(params.categoryId)) {
    category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });
  }

  if (isValidObjectId(params.storeId)) {
    billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
};

export default CategoryPage;

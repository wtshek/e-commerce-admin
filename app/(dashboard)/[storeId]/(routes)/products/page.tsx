import prismadb from '@/lib/prismadb';
import { formatter } from '@/lib/utils';

import { format } from 'date-fns';
import React, { FC } from 'react';

import { ProductColumn } from './components/Column';
import { ProductClient } from './components/ProductClient';

interface ProductsPageProps {
  params: { storeId: string };
}

export const ProductPage: FC<ProductsPageProps> = async ({ params }) => {
  const products = await prismadb.product.findMany({
    where: { storeId: params.storeId },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(Number(item.price)),
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductPage;

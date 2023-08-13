import prismadb from '@/lib/prismadb';
import { isValidObjectId } from '@/lib/utils';

import React, { FC } from 'react';

import { Image, Product } from '@prisma/client';

import ProductForm from './components/ProductForm';

interface ProductPageProps {
  params: { productId: string; storeId: string };
}

export const ProductPage: FC<ProductPageProps> = async ({ params }) => {
  let product: Product | null = null;

  if (isValidObjectId(params.productId)) {
    product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
      },
    });
  }

  const categories = await prismadb.category.findMany({
    where: { storeId: params.storeId },
  });
  const sizes = await prismadb.size.findMany({
    where: { storeId: params.storeId },
  });
  const colors = await prismadb.color.findMany({
    where: { storeId: params.storeId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product as Product & { images: Image[] }}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
};

export default ProductPage;

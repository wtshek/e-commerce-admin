import prismadb from '@/lib/prismadb';
import { isValidObjectId } from '@/lib/utils';

import React, { FC } from 'react';

import { Size } from '@prisma/client';

import SizeForm from './components/SizeForm';

interface SizePageProp {
  params: { sizeId: string };
}

export const SizePage: FC<SizePageProp> = async ({ params }) => {
  let size: Size | null = null;

  if (isValidObjectId(params.sizeId)) {
    size = await prismadb.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
};

export default SizePage;

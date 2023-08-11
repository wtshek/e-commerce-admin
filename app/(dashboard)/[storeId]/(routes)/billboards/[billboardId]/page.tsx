import prismadb from '@/lib/prismadb';
import { isValidObjectId } from '@/lib/utils';

import React, { FC } from 'react';

import { Billboard } from '@prisma/client';

import BillboardForm from './components/BillboardForm';

interface BillboardProps {
  params: { billboardId: string };
}

export const BillboardPage: FC<BillboardProps> = async ({ params }) => {
  let billboard: Billboard | null = null;

  if (isValidObjectId(params.billboardId)) {
    billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;

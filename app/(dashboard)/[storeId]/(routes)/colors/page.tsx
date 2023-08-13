import prismadb from '@/lib/prismadb';

import { format } from 'date-fns';
import React, { FC } from 'react';

import { ColorsColumn } from './components/Column';
import { SizesClient } from './components/SizesClient';

interface ColorsPageProps {
  params: { storeId: string };
}

export const ColorPages: FC<ColorsPageProps> = async ({ params }) => {
  const colors = await prismadb.color.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: 'desc' },
  });

  const formattedColors: ColorsColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorPages;

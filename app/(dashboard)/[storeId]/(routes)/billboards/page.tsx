import prismadb from '@/lib/prismadb';

import { format } from 'date-fns';
import React, { FC } from 'react';

import { BillboardClient } from './components/BillboardClient';
import { BillboardColumn } from './components/Column';

interface BillboardsPageProps {
  params: { storeId: string };
}

export const BillboardsPage: FC<BillboardsPageProps> = async ({ params }) => {
  const billboards = await prismadb.billboard.findMany({
    where: { storeId: params.storeId },
    orderBy: { createdAt: 'desc' },
  });

  const formattedBillboard: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboard} />
      </div>
    </div>
  );
};

export default BillboardsPage;

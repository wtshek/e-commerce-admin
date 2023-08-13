'use client';

import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { FC } from 'react';

import { OrderColumn, columns } from './Column';

interface OrderClientProps {
  data: OrderColumn[];
}

export const OrderClient: FC<OrderClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders ${data.length}`}
        description="Manage billboard for your store"
      ></Heading>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="products" />
    </>
  );
};

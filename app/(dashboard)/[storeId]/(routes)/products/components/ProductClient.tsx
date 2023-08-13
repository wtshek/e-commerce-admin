'use client';

import { ApiList } from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react';

import { ProductColumn, columns } from './Column';

interface ProductClientProps {
  data: ProductColumn[];
}

export const ProductClient: FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const onClick = () => {
    router.push(`/${params.storeId}/products/new`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products ${data.length}`}
          description="Manage products for your store"
        ></Heading>
        <Button onClick={onClick}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
      <Heading title="API" description="API calls for Products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};

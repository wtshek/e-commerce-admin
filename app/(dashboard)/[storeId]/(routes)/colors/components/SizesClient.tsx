'use client';

import { ApiList } from '@/components/ui/api-list';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC } from 'react';

import { ColorsColumn, columns } from './Column';

interface SizesClientProps {
  data: ColorsColumn[];
}

export const SizesClient: FC<SizesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const onClick = () => {
    router.push(`/${params.storeId}/colors/new`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors ${data.length}`}
          description="Manage colors for your store"
        ></Heading>
        <Button onClick={onClick}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title="API" description="API calls for Colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName="colorId" />
    </>
  );
};

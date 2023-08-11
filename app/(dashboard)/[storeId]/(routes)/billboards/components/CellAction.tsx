'use client';

import { AlertModal } from '@/components/modal/AlertModal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import axios from 'axios';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

import { BillboardColumn } from './Column';

interface CellActionProps {
  data: BillboardColumn;
}

export const CellAction: FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(data.id);
    toast.success('Copied billboard id');
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);
      router.refresh();
      router.push(`/${params.storeId}/billboards/`);
      toast.success('Store deleted');
    } catch (error) {
      toast.error(
        'Make sure you removed all categories using this billboard first',
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onEdit = () => {
    router.push(`/${params.storeId}/billboards/${data.id}`);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4">Update</Edit>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onCopy}>
            <Copy className="mr-2 h-4 w-4">Copy Id</Copy>
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4">Update</Trash>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

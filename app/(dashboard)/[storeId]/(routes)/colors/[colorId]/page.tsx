import prismadb from '@/lib/prismadb';
import { isValidObjectId } from '@/lib/utils';

import React, { FC } from 'react';

import { Color } from '@prisma/client';

import ColorForm from './components/colorForm';

interface ColorPageProps {
  params: { colorId: string };
}

export const ColorPageProp: FC<ColorPageProps> = async ({ params }) => {
  let color: Color | null = null;

  if (isValidObjectId(params.colorId)) {
    color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPageProp;

import prismadb from '@/lib/prismadb';

import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    if (!name || !billboardId)
      return new NextResponse('Label and image url are required', {
        status: 400,
      });

    if (!params.storeId)
      return new NextResponse('Store Id is required', {
        status: 400,
      });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 });

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (e) {
    console.error('Categories [POST]', e);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const category = await prismadb.category.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(category);
  } catch (e) {
    console.log('Categories [GET]', e);
    return new NextResponse('Internal error', { status: 500 });
  }
}

import prismadb from '@/lib/prismadb';

import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

export async function PATCH(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    const body = await req.json();
    const { billboardId, name } = body;

    if (!billboardId || !name)
      return new NextResponse('Label and image url are required', {
        status: 400,
      });

    if (!params.categoryId)
      return new NextResponse('Billboard id is required', { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 });

    const category = await prismadb?.category.updateMany({
      where: {
        id: params.categoryId,
      },
      data: {
        billboardId,
        name,
      },
    });

    return NextResponse.json(category);
  } catch (e) {
    console.log('CATEGORY [PATCH]', e);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    if (!params.categoryId)
      return new NextResponse('Category id is required', { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 });

    const store = await prismadb?.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(store);
  } catch (e) {
    console.log('CATEGORY [DELETE]', e);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } },
) {
  try {
    if (!params.categoryId)
      return new NextResponse('Billboard id is required', { status: 400 });

    const store = await prismadb?.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(store);
  } catch (e) {
    console.log('CATEGORY [GET]', e);
    return new NextResponse('Internal error', { status: 500 });
  }
}

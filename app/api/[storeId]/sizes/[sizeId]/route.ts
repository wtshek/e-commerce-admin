import prismadb from '@/lib/prismadb';

import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

export async function PATCH(
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    const body = await req.json();
    const { name, value } = body;

    if (!name || !value)
      return new NextResponse('Name and value url are required', {
        status: 400,
      });

    if (!params.sizeId)
      return new NextResponse('Size id is required', { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 });

    const size = await prismadb?.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (e) {
    console.log('Size [PATCH]', e);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sizeId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    if (!params.sizeId)
      return new NextResponse('Size id is required', { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 });

    const size = await prismadb?.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (e) {
    console.log('Size [DELETE]', e);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { sizeId: string } },
) {
  try {
    if (!params.sizeId)
      return new NextResponse('Size id is required', { status: 400 });

    const size = await prismadb?.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (e) {
    console.log('BILLBOARD [GET]', e);
    return new NextResponse('Internal error', { status: 500 });
  }
}

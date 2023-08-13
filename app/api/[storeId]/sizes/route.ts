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
    const { name, value } = body;

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    if (!name || !value)
      return new NextResponse('Name and value are required', {
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

    const size = await prismadb.size.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(size, { status: 201 });
  } catch (e) {
    console.error('Size [POST]', e);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    const size = await prismadb.size.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(size);
  } catch (e) {
    console.log('Size [GET]', e);
    return new NextResponse('Internal error', { status: 500 });
  }
}

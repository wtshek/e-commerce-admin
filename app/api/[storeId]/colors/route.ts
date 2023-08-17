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

    const color = await prismadb.color.create({
      data: {
        name,
        value,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(color, { status: 201 });
  } catch (e) {
    console.error('Color [POST]', e);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } },
) {
  try {
    const color = await prismadb.color.findMany({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(color);
  } catch (e) {
    console.log('Color [GET]', e);
    return new NextResponse('Internal error', { status: 500 });
  }
}

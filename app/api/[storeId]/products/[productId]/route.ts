import prismadb from '@/lib/prismadb';

import { NextResponse } from 'next/server';

import { auth } from '@clerk/nextjs';

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      sizeId,
      colorId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (
      !name ||
      !price ||
      !categoryId ||
      !sizeId ||
      !colorId ||
      !images ||
      !images.length
    )
      return new NextResponse('Fields are missing', {
        status: 400,
      });

    if (!params.productId)
      return new NextResponse('Product id is required', { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 });

    const product = await prismadb?.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price: String(price),
        categoryId,
        colorId,
        sizeId,
        images: { deleteMany: {} },
        isFeatured,
        isArchived,
      },
    });

    await prismadb.product.update({
      where: { id: params.productId },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (e) {
    console.log('Product [PATCH]', e);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string; storeId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 });

    if (!params.productId)
      return new NextResponse('Product id is required', { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse('Unauthorized', { status: 403 });

    const product = await prismadb?.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (e) {
    console.log('Product [DELETE]', e);
    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } },
) {
  try {
    if (!params.productId)
      return new NextResponse('Product id is required', { status: 400 });

    const product = await prismadb?.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);
  } catch (e) {
    console.log('Product [GET]', e);
    return new NextResponse('Internal error', { status: 500 });
  }
}

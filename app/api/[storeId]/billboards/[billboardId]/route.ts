import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    console.log("hii");
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const body = await req.json();
    const { label, imageUrl } = body;

    if (!label || !imageUrl)
      return new NextResponse("Label and image url are required", {
        status: 400,
      });

    if (!params.billboardId)
      return new NextResponse("Billboard id is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const billboard = await prismadb?.billboard.updateMany({
      where: {
        id: params.billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (e) {
    console.log("BILLBOARD [PATCH]", e);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!params.billboardId)
      return new NextResponse("Billboard id is required", { status: 400 });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const store = await prismadb?.billboard.deleteMany({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(store);
  } catch (e) {
    console.log("BILLBOARD [DELETE]", e);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId)
      return new NextResponse("Billboard id is required", { status: 400 });

    const store = await prismadb?.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });

    return NextResponse.json(store);
  } catch (e) {
    console.log("BILLBOARD [GET]", e);
    return new NextResponse("Internal error", { status: 500 });
  }
}

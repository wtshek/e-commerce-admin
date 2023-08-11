import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    if (!label || !imageUrl)
      return new NextResponse("Label and image url are required", {
        status: 400,
      });

    if (!params.storeId)
      return new NextResponse("Store Id is required", {
        status: 400,
      });

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId)
      return new NextResponse("Unauthorized", { status: 403 });

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(billboard, { status: 201 });
  } catch (e) {
    console.error("Billboards [POST]", e);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const billboards = await prismadb.billboard.findFirst({
      where: { storeId: params.storeId },
    });

    return NextResponse.json(billboards);
  } catch (e) {
    console.log("Billboard [GET]", e);
    return new NextResponse("Internal error", { status: 500 });
  }
}

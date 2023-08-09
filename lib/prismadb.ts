import { PrismaClient } from "@prisma/client";

// prevent Next from initiating a bunch of client
// when hot reloading

declare global {
  var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;

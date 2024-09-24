import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Check if globalThis.prisma is undefined, then initialize it
const db = globalThis.prisma || prismaClientSingleton();

export default db;

// In development mode, assign the Prisma client to globalThis to reuse the instance
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

import { PrismaClient } from '@prisma/client';

// This prevents multiple instances of Prisma Client in development due to hot-reloading.
declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;

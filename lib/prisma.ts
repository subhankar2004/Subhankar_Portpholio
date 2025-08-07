// lib/prisma.ts (or wherever you define it)

import { PrismaClient } from '@prisma/client';

declare global {
  // Prevent TypeScript error on global prisma in dev
  var prisma: PrismaClient | undefined;
}

const prisma =
  process.env.NODE_ENV === 'production'
    ? new PrismaClient()
    : global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;

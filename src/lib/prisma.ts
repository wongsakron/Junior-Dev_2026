import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// ป้องกันการสร้าง PrismaClient หลายตัวใน Development mode
// เพราะ Next.js Hot Reload จะทำให้ module ถูกโหลดใหม่ทุกครั้ง
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;

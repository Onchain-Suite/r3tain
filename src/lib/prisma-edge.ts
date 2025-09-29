import { PrismaNeon } from "@prisma/adapter-neon";

import { PrismaClient } from "@/prismaEdge/client";

declare global {
  var prismaEdge: PrismaClient | undefined;
}

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });

export const prismaEdge =
  globalThis.prismaEdge ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalThis.prismaEdge = prismaEdge;

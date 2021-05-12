import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  req: { headers: { authorization: any } } | undefined;
}

export const context: Context = {
  prisma: prisma,
};

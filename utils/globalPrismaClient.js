import { PrismaClient } from '@prisma/client'

if (!global.prismaClient) {
  global.prismaClient = new PrismaClient();
}

export default global.prismaClient;

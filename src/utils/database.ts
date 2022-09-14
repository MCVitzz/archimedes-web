import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  const globalWithPrisma = global as typeof globalThis & {
    database: PrismaClient
  }
  if (!globalWithPrisma.database) {
    globalWithPrisma.database = new PrismaClient()
  }
  prisma = globalWithPrisma.database
}

export default prisma

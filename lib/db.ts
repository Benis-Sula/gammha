import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

function createClient(): PrismaClient | undefined {
  const url = process.env.DATABASE_URL
  if (!url) return undefined
  try {
    const adapter = new PrismaPg({ connectionString: url, connectionTimeoutMillis: 3000 })
    return new PrismaClient({ adapter, log: ['error'] })
  } catch {
    return undefined
  }
}

export const prisma: PrismaClient | undefined = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

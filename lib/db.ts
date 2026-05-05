import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// Returns a proxy whose every method rejects with a DB error.
// This lets all existing try/catch blocks handle unavailability
// without needing null checks everywhere.
function makeUnavailableClient(): PrismaClient {
  const handler: ProxyHandler<object> = {
    get: () => new Proxy(() => Promise.reject(new Error('Database unavailable')), handler),
    apply: () => Promise.reject(new Error('Database unavailable')),
  }
  return new Proxy({}, handler) as any // satisfies PrismaClient return type
}

function createClient(): PrismaClient {
  const url = process.env.DATABASE_URL
  if (!url) return makeUnavailableClient()
  try {
    const adapter = new PrismaPg({ connectionString: url, connectionTimeoutMillis: 3000 })
    return new PrismaClient({ adapter, log: ['error'] })
  } catch {
    return makeUnavailableClient()
  }
}

export const prisma: PrismaClient = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

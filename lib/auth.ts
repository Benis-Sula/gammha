import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const adminEmail = process.env.ADMIN_EMAIL
        const adminHash = process.env.ADMIN_PASSWORD_HASH
        if (!adminEmail || !adminHash) return null
        if (credentials.email !== adminEmail) return null
        const valid = await bcrypt.compare(credentials.password as string, adminHash)
        if (!valid) return null
        return { id: '1', email: adminEmail, name: 'Admin' }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
})

export async function requireAdmin() {
  const session = await auth()
  if (!session) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), session: null }
  }
  return { error: null, session }
}

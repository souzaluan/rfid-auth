import NextAuth from 'next-auth/next'
import { nextAuthConfig } from '@/config/next-auth'

const handler = NextAuth(nextAuthConfig)

export { handler as GET, handler as POST }

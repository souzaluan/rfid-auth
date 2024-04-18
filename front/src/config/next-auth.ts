import { alovaInstance } from '@/services/alova-instance'
import Credentials from 'next-auth/providers/credentials'
import { AuthOptions, User } from 'next-auth'

export const nextAuthConfig: AuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'E-mail', type: 'text' },
        password: { label: 'Senha', type: 'password' },
      },

      async authorize(credentials) {
        const response = await alovaInstance
          .Post<User>('/users/authenticate', {
            email: credentials?.email,
            password: credentials?.password,
          })
          .send()

        return response
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.user.id,
          email: user.user.email,
        }

        token.token = user.token
      }

      return token
    },

    async session({ session, token: { token, user } }) {
      if (token) {
        session.user = user
        session.token = token
      }

      return session
    },
  },

  pages: {
    signIn: '/login',
    newUser: '/registrar',
    error: '/login',
  },
}

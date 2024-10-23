import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { AdapterUser } from '@auth/core/adapters'

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        let user = null

        if (
          typeof process.env.BACKEND_URL !== 'string' ||
          typeof process.env.API_KEY !== 'string'
        ) {
          console.log('env error')
          throw new Error('Missing environment variables')
        }

        const loginUrl = process.env.BACKEND_URL + '/login'

        const res = await fetch(loginUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.API_KEY,
          },
          body: JSON.stringify(credentials),
        })

        user = await res.json()

        if (res.ok && user) {
          return user
        } else {
          throw new Error('User not found.')
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as AdapterUser
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
  },
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
})

import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { getRandomUser } from '@/utils/getRandomData'

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET

export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  pages: {
    signIn: '/'
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
      profile(profile) {
        return {
          id: String(profile.id),
          name: profile.name,
          image: profile.avatar_url
        }
      }
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'text'
        }
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }
        return getRandomUser()
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      const { name, image: avatar } = session.user!
      return {
        ...session,
        user: {
          id: token.id,
          name,
          avatar
        }
      }
    }
  }
}

export default NextAuth(authOptions)

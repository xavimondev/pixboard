import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { User } from '@/types/user'

export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET

export const authOptions = {
  secret: NEXTAUTH_SECRET,
  callbacks: {
    session({ session }: { session: any }) {
      // https://github.com/subhamg/unique-username-generator
      const userInfo: User = {
        id: 'random.user@example.com',
        name: 'Random User 🌍',
        avatar: 'https://unavatar.io/d3vcloud',
        color: '#0bf'
      }

      session.user.info = userInfo
      return session
    }
  },
  pages: {
    signIn: '/'
  },
  providers: [
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

        return {
          id: 'random.user@example.com',
          name: 'Random User 🌍',
          avatar: 'https://unavatar.io/d3vcloud',
          color: '#0bf'
        }
      }
    })

    /*
    // Use GitHub authentication
    // import GithubProvider from "next-auth/providers/github";
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    */
  ]
}

export default NextAuth(authOptions)

import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental
} = NextAuth({
  providers: [GitHub],
  callbacks: {
    jwt: async ({ token, profile }) => {
      if (profile) {
        token.id = profile.id
        token.image = profile.picture
      }
      return token
    }
    // @TODO
    // authorized({ request, auth }) {
    //   return !!auth?.user
    // }
  },
  pages: {
    signIn: '/sign-in'
  }
})

import GoogleProvider from 'next-auth/providers/google'

// from next-auth documentation
export const auth_options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      // prompt which google account to use at every login
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],

  callbacks: {
    // invoke on successful sign in
    async signIn({ profile }) {
      // 1. connect to db
      // 2. check if user exists
      // 3. if not, then add user to db
      // 4. return true to allow sign in
    },

    // modifies the session object
    async session({ session }) {
      // 1. get user from db
      // 2. assign the user id to the session
      // 3. return session
    },
  },
}

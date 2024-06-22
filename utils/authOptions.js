import { connectDB } from '@/config/db.config'
import User from '@/models/user.model'
import GoogleProvider from 'next-auth/providers/google'

// from next-auth documentation
export const authOptions = {
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
      await connectDB()

      // 2. check if user exists
      const userExists = await User.findOne({ email: profile.email })

      // 3. if not, then add user to db
      if (!userExists) {
        const username = profile.name.slice(0, 20)

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        })
      }

      // 4. return true to allow sign in
      return true
    },

    // modifies the session object
    async session({ session }) {
      // 1. get user from db
      const user = await User.findOne({ email: session.user.email })

      // 2. assign the user id to the session
      session.user.id = user._id.toString()

      // 3. return session
      return session
    },
  },
}

import { authOptions } from '@/utils/authOptions'
import NextAuth from 'next-auth/next'

const handler = NextAuth(authOptions)

// export GET route and POST route
export { handler as GET, handler as POST }

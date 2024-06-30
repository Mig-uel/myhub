import { getServerSession } from 'next-auth'
import { authOptions } from '@/utils/authOptions'

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) throw new Error('Unauthorized')

    return {
      user: session.user,
      userId: session.user.id,
    }
  } catch (error) {
    return null
  }
}

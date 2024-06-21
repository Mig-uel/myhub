import { connectDB } from '@/config/db.config'

const sendJSONWithStatusResponse = (obj, status) => {
  return new Response(JSON.stringify(obj), { status })
}

export const GET = async (request) => {
  try {
    await connectDB()

    return sendJSONWithStatusResponse({ message: 'Hello world!' }, 200)
  } catch (error) {
    console.log(error)
    return new Response('Something went wrong', { status: 500 })
  }
}

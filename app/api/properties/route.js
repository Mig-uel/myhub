import { connectDB } from '@/config/db.config'
import Property from '@/models/property.model'

const sendJSONWithStatusResponse = (obj, status) => {
  return new Response(JSON.stringify(obj), { status })
}

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB()

    const properties = await Property.find({})

    if (!properties) throw new Error('No properties found')

    return sendJSONWithStatusResponse(properties, 200)
  } catch (error) {
    console.log(error)
    return sendJSONWithStatusResponse(
      { message: `${error.message || 'Something went wrong'}` },
      404
    )
  }
}

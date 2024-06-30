import { connectDB } from '@/config/db.config'
import Property from '@/models/property.model'
import {
  sendJSONWithStatusResponse,
  sendErrorJSONWithStatusResponse,
} from '@/utils/requests'

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB()

    const properties = await Property.find({})

    if (!properties) throw new Error('No properties found')

    return sendJSONWithStatusResponse(properties, 200)
  } catch (error) {
    console.log(error)
    return sendErrorJSONWithStatusResponse(error, 404)
  }
}

// POST /api/properties
export const POST = async (request) => {
  try {
    const formData = await request.forData()

    return sendJSONWithStatusResponse({ message: 'Success' }, 200)
  } catch (error) {
    console.log(error)
    return sendErrorJSONWithStatusResponse(error, 404)
  }
}

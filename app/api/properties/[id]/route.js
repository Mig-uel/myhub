import { connectDB } from '@/config/db.config'
import Property from '@/models/property.model'
import {
  sendJSONWithStatusResponse,
  sendErrorJSONWithStatusResponse,
} from '@/utils/requests'

// GET /api/properties/:id
export const GET = async (request, { params }) => {
  const { id } = params

  try {
    await connectDB()

    const property = await Property.findById(id)

    if (!property) throw new Error('Property not found')

    return sendJSONWithStatusResponse(property, 200)
  } catch (error) {
    return sendErrorJSONWithStatusResponse(error, 404)
  }
}

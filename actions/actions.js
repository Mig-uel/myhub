'use server'
import { connectDB } from '@/config/db.config'
import { getSessionUser } from '@/utils/getSessionUser'
import Property from '@/models/property.model'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export const addProperty = async (data) => {
  const property = {
    location: {},
    rates: {},
    seller_info: {},
    amenities: [],
    images: [],
    owner: '',
  }

  // connect to db
  await connectDB()

  // get server session
  const sessionUser = await getSessionUser()

  if (!sessionUser || !sessionUser.userId) throw new Error('Unauthorized')

  // get userId from sessionUser
  const { userId } = sessionUser

  // set property data
  for (const pair of data.entries()) {
    if (pair[0].includes('.')) {
      const [outerKey, innerKey] = pair[0].split('.')

      if (outerKey === 'location') {
        property.location[innerKey] = pair[1]
      } else if (outerKey === 'rates') {
        property.rates[innerKey] = pair[1]
      } else if (outerKey === 'seller_info') {
        property.seller_info[innerKey] = pair[1]
      }
    } else if (pair[0] === 'amenities') {
      property[pair[0]].push(pair[1])
    } else if (pair[0] === 'images') {
      if (pair[1].name.length > 0) {
        property[pair[0]].push(pair[1].name)
      }
    } else if (
      pair[0] !== '$ACTION_ID_36305833e9ab8a73da44d046a249ceff02ec590f'
    ) {
      property[pair[0]] = pair[1]
    }
  }
  property.owner = userId

  console.log(property)

  // upload to db
  const newProperty = new Property(property)
  await newProperty.save()

  if (!newProperty) throw new Error()

  revalidatePath('/properties')
  redirect('/properties')
}

'use server'

import { connectDB } from '@/config/db.config'
import { getSessionUser } from '@/utils/getSessionUser'
import Property from '@/models/property.model'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import cloudinary from '@/config/cloudinary.config'

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
  const imageUploadPromises = []

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
        const imageBuffer = await pair[1].arrayBuffer()
        const imageArray = Array.from(new Uint8Array(imageBuffer))
        const imageData = Buffer.from(imageArray)

        // convert the image data to base64
        const imageBase64 = imageData.toString('base64')

        // make request to upload to cloudinary
        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${imageBase64}`,
          {
            folder: 'MyHub',
          }
        )

        imageUploadPromises.push(result.secure_url)
        // console.log(pair[1])
        // property[pair[0]].push(pair[1].name)
      }
    } else if (
      pair[0] !== '$ACTION_ID_36305833e9ab8a73da44d046a249ceff02ec590f'
    ) {
      property[pair[0]] = pair[1]
    }
  }
  property.owner = userId

  // wait and set images
  const uploadedImages = await Promise.all(imageUploadPromises)
  property.images = uploadedImages

  console.log(property)

  // upload to db
  const newProperty = new Property(property)
  await newProperty.save()

  if (!newProperty) throw new Error()

  revalidatePath('/properties')
  redirect('/properties')
}

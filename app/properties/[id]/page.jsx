import { fetchProperty } from '@/utils/requests'

const PropertyPage = async ({ params }) => {
  const { id } = params
  const property = await fetchProperty(id)

  return <>{property.name}</>
}

export default PropertyPage

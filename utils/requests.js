const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN

// response helper functions
export const sendJSONWithStatusResponse = (obj, status) => {
  return new Response(JSON.stringify(obj), { status })
}
export const sendErrorJSONWithStatusResponse = ({ message, stack }, status) => {
  return new Response(
    JSON.stringify({
      message: `${message || 'Something went wrong'}`,
      stack: process.env.NODE_ENV === 'development' ? stack : '🥞',
      status,
    }),
    { status }
  )
}

// fetch all properties
export const fetchProperties = async () => {
  try {
    if (!apiDomain) return []

    const res = await fetch(`${apiDomain}/properties`)

    if (!res.ok) throw new Error('Could not fetch properties')

    return res.json()
  } catch (error) {
    console.log(error?.message)
    return []
  }
}

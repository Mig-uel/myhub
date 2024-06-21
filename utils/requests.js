const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN

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

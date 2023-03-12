export const graphQLRequest = async (payload, options = {}) => {
  if (localStorage.getItem('accessToken')) {
    const res = await fetch(import.meta.env.VITE_GRAPHQL_SERVER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        ...options,
      },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      if (res.status === 403) {
        return null
      }
    }

    const { data } = await res.json()
    return data
  }

  return null
}

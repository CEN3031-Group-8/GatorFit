'use server'

import { auth } from '@auth'

export const searchUsers = async (query: string) => {
 if (
    typeof process.env.BACKEND_URL !== 'string' ||
    typeof process.env.API_KEY !== 'string'
  ) {
    console.log('env error')
    return { error: 'Something went wrong' }
  }

  const searchUsersUrl = process.env.BACKEND_URL + '/search-users/' + query
  try {
    const res = await fetch(searchUsersUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.API_KEY,
      },
    })

    if (!res.ok) {
      return false
    } else {
      const body = await res.json()
      return body
    }
  } catch (error: any) {
    return { error: error.message }
  }
}

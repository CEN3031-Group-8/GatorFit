'use server'

import { auth } from '@auth'

export const getActiveWorkoutPlan = async () => {
  const session = await auth()
  if(!session) {
      return { error: 'Not logged in' }
  }

  if (
    typeof process.env.BACKEND_URL !== 'string' ||
    typeof process.env.API_KEY !== 'string'
  ) {
    console.log('env error')
    return { error: 'Something went wrong' }
  }

  const createWorkoutUrl = process.env.BACKEND_URL + '/get-active-workout/' + session.user?.user?.id
  try {
    const res = await fetch(createWorkoutUrl, {
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

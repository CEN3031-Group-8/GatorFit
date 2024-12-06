'use server'

import { auth } from '@auth'

export const saveWorkout = async (data: any) => {
  const session = await auth()
    if(session) {
        data["creator"] = session.user.user.id
    } else {
        return { error: 'Not logged in' }
    }

  if (
    typeof process.env.BACKEND_URL !== 'string' ||
    typeof process.env.API_KEY !== 'string'
  ) {
    console.log('env error')
    return { error: 'Something went wrong' }
  }

  const createWorkoutUrl = process.env.BACKEND_URL + '/workout'
  data.exercises = JSON.parse(data.exercises)
  try {
    const res = await fetch(createWorkoutUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Key': process.env.API_KEY,
      },
      body: JSON.stringify(data),
    })


    if (!res.ok) {
      const body = await res.json()
      return { error: body.error }
    } else {
      return { success: 'Saved successfully!' }
    }
  } catch (error: any) {
    return { error: error.message }
  }
}

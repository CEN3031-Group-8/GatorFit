'use server'

import { auth } from '@auth'

export const saveFood = async (foodData: any, date: any) => {
  const data = {
    foods: foodData,
    date: date
  }
  const session = await auth()
    if(session) {
      const user: any = session.user
      data["creator"] = user.user.id
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

  const url = process.env.BACKEND_URL + '/save-food'
  try {
    const res = await fetch(url, {
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

'use server'

import { auth } from '@auth'

export const createFollow = async (followeeid: string) => {
  const session = await auth()
  if(!session) return { error: 'Not logged in' }
  const user : any = session.user

  if (
      typeof process.env.BACKEND_URL !== 'string' ||
      typeof process.env.API_KEY !== 'string'
  ) {
      console.log('env error')
      return { error: 'Something went wrong' }
  }

  const createWorkoutUrl = process.env.BACKEND_URL + `/create-follow/${user.user.id}/${followeeid}`
  try {
      const res = await fetch(createWorkoutUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'API-Key': process.env.API_KEY,
      },
      })
      
      
      if (!res.ok) {
      const body = await res.json()
      return { error: body.error }
      } else {
      return { success: 'Followed successfully!' }
      }
  } catch (error: any) {
      return { error: error.message }
  }
}

'use server'

import bcrypt from 'bcryptjs'

import { RegisterSchema, RegisterOptions } from '@schema'

export const register = async (values: RegisterOptions) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields' }
  }

  const { username, email, password } = validatedFields.data
  const hashed = await bcrypt.hash(password, 10)

  if (
    typeof process.env.BACKEND_URL !== 'string' ||
    typeof process.env.API_KEY !== 'string'
  ) {
    console.log('env error')
    return { error: 'Something went wrong' }
  }

  const registerUrl = process.env.BACKEND_URL + '/register'
  try {
    const res = await fetch(registerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: process.env.API_KEY,
      },
      body: JSON.stringify({ username, email, password: hashed }),
    })

    if (!res.ok) {
      const body = await res.json()
      return { error: body.error }
    } else {
      return { success: 'Registered successfully!' }
    }
  } catch (error: any) {
    return { error: error.message }
  }
}

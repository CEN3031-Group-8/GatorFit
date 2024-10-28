'use server'

import { LoginSchema, LoginOptions } from '@schema'
import { signIn } from '@auth'
import { DEFAULT_LOGIN_REDIRECT } from '@routes'
import { AuthError } from 'next-auth'

export const login = async (values: LoginOptions) => {
  const validatedFields = LoginSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'invalid fields' }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error: any) {
    throw error
  }
}

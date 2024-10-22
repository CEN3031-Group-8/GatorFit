'use server'

import { LoginSchema, LoginOptions } from '@schema'

export const login = async (values: LoginOptions) => {
  const validatedFields = LoginSchema.safeParse(values)
  if (!validatedFields.success) {
    return { error: 'invalid fields' }
  }
  return { success: "You're now logged-in" }
}

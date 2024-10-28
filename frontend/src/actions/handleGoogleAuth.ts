'use server'

import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { signIn } from '@auth'

export const handleGoogleAuth = async () => {
  await signIn('google', { redirectTo: DEFAULT_LOGIN_REDIRECT })
}

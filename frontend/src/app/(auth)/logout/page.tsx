'use client'

import { useEffect, useState } from 'react'

import { logout } from '@actions'
import FormError from '../FormError'

const LogoutPage = () => {
  const [error, setError] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
    } catch {
      setError(true)
    }
  }

  useEffect(() => {
    handleLogout()
  }, [])

  return <div>{error && <FormError message='Error logging out' />}</div>
}

export default LogoutPage

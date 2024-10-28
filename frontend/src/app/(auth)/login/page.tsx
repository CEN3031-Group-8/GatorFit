import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'

import { handleGoogleAuth } from '@actions'
import LoginForm from './LoginForm'

export const metadata = {
  title: 'Login - GatorFit',
  description: 'Login to access GatorFit',
}

const LoginPage = () => (
  <>
    <h1 className='mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white'>
      Sign In
    </h1>

    <LoginForm />

    <button
      onClick={handleGoogleAuth}
      className='flex items-center w-full justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
    >
      <FcGoogle className='w-6 h-6 mx-2' />
      <span className='mx-2'>Continue with Google</span>
    </button>

    <div className='mt-6 text-center '>
      <Link
        href='/register'
        className='text-sm text-blue-500 hover:underline dark:text-blue-400'
      >
        Don’t have an account yet? Sign up
      </Link>
    </div>
  </>
)

export default LoginPage

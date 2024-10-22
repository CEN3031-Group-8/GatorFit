import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'

import RegisterForm from './RegisterForm'

export const metadata = {
  title: 'Sign Up - GatorFit',
  description: 'Register to get access to a social fitness experience',
}

const RegisterPage = () => (
  <>
    <h1 className='mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white'>
      Sign Up
    </h1>

    <RegisterForm />

    <a
      href='#'
      className='flex items-center justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'
    >
      <FcGoogle className='w-6 h-6 mx-2' />
      <span className='mx-2'>Continue with Google</span>
    </a>

    <div className='mt-6 text-center '>
      <Link
        href='/login'
        className='text-sm text-blue-500 hover:underline dark:text-blue-400'
      >
        Already have an account? Log in.
      </Link>
    </div>
  </>
)

export default RegisterPage

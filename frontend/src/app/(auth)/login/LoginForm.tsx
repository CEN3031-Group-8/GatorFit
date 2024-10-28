'use client'

import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import FormError from '../FormError'
import { login } from '@actions'
import { LoginSchema, LoginOptions } from '@schema'

const LoginForm = () => {
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<LoginOptions>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: LoginOptions) => {
    startTransition(() => {
      login(values).catch((loginError) => {
        setError('That email/password combination does not exist')
      })
    })
  }

  const onError = (error: any) => {
    console.log('error submit')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className='flex flex-col gap-y-4'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative flex items-center mt-8'>
                  <span className='absolute'>
                    <AiOutlineMail className='w-5 h-5 mx-3 text-gray-300 dark:text-gray-500' />
                  </span>

                  <Input
                    {...field}
                    type='email'
                    className='block w-full h-10 py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                    placeholder='Email address'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative flex items-center'>
                  <span className='absolute'>
                    <AiOutlineLock className='w-5 h-5 mx-3 text-gray-300 dark:text-gray-500' />
                  </span>

                  <Input
                    {...field}
                    type='password'
                    className='block w-full h-10 pl-11 pr-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                    placeholder='Password'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError message={error} />

        <Button
          type='submit'
          disabled={isPending}
          className='w-fullpx-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
        >
          Login
        </Button>
      </form>
    </Form>
  )
}

export default LoginForm

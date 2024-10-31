'use client'

import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@components/ui/form'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import FormError from '@components/form/FormError'
import FormSuccess from '@components/form/FormSuccess'
import { register } from '@actions'
import { RegisterSchema, RegisterOptions } from '@schema'
import { useState, useTransition } from 'react'

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<RegisterOptions>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: RegisterOptions) => {
    startTransition(() => {
      register(values).then(({ success, error }) => {
        setSuccess(success)
        setError(error)
      })
    })
  }

  const onError = () => {
    console.log('error submitting')
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className='flex flex-col gap-y-4'
      >
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative flex items-center mt-8'>
                  <span className='absolute'>
                    <RxAvatar className='w-5 h-5 mx-3 text-gray-300 dark:text-gray-500' />
                  </span>

                  <Input
                    {...field}
                    type='text'
                    className='block w-full h-10 py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                    placeholder='Username'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative flex items-center'>
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

        <FormField
          control={form.control}
          name='confirm'
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
                    placeholder='Confirm Password'
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button
          type='submit'
          disabled={isPending}
          className='w-fullpx-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50'
        >
          Sign Up
        </Button>
      </form>
    </Form>
  )
}

export default RegisterForm

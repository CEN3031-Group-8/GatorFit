import * as z from 'zod'

const PasswordSchema = z
  .string()
  .min(8, {
    message: 'Password must be at least 8 characters',
  })
  .max(20, {
    message: 'Password must be at most 20 characters',
  })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must contain an uppercase letter',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password must contain a lowercase letter',
  })
  .refine((password) => /[0-9]/.test(password), {
    message: 'Password must contain a number',
  })

export const RegisterSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters' })
      .max(20, { message: 'Username must be at most 20 characters' }),
    email: z
      .string()
      .min(1, {
        message: 'Email is required',
      })
      .email(),
    password: PasswordSchema,
    confirm: z.string().min(1, {
      message: 'Password confirmation is required',
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords do not match',
    path: ['confirm'],
  })

export type RegisterOptions = z.infer<typeof RegisterSchema>

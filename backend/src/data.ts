import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { User, Workout } from './models'

export const register = async (data: any) => {
  try {
    const newUser = new User({ ...data })
    await newUser.save()
    return { success: true }
  } catch (error: any) {
    if (error.code === 11000) {
      // duplicate value error
      const field = Object.keys(error.keyValue)[0]
      return {
        error: { status: 400, message: `That ${field} is taken` },
      }
    }

    return {
      error: { status: 400, message: 'Something went wrong' },
    }
  }
}

export const login = async (data: any) => {
  if (!data.email || !data.password) {
    return {
      error: { status: 401, message: 'Invalid credentials' },
    }
  }

  const user = await User.findOne({ email: data.email })
  if (!user) {
    return {
      error: { status: 401, message: 'Invalid credentials' },
    }
  }

  const passwordsMatch = await bcrypt.compare(data.password, user.password)
  if (!passwordsMatch) {
    return {
      error: { status: 401, message: 'Invalid credentials' },
    }
  }

  const token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET as string, {
    expiresIn: '1h',
  })

  return {
    payload: {
      token,
      user: { id: user._id, email: user.email, username: user.username },
    },
  }
}

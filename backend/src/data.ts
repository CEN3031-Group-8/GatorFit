import { User } from './models'

export const register = async (data: any) => {
  try {
    const newUser = new User(data)
    await newUser.save()
    return { success: true, error: { status: 200, message: '' } }
  } catch (error: any) {
    if (error.code === 11000) {
      // duplicate value error
      const field = Object.keys(error.keyValue)[0]
      return {
        success: false,
        error: { status: 400, message: `That ${field} is taken` },
      }
    }

    return {
      success: false,
      error: { status: 400, message: 'Something went wrong' },
    }
  }
}

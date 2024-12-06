import { Like, User } from '../models'

export const saveLike = async (data: any) => {
  try {
    const newLike = new Like({ ...data })
    await newLike.save()
    return { success: true }
  } catch (error: any) {
    return {
      error: { status: 400, message: 'Something went wrong' },
    }
  }
}
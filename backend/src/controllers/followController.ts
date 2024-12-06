import { Follow} from '../models'

export const saveFollow = async (data: any) => {
  try {
    const newFollow = new Follow({ ...data })
    await newFollow.save()
    return { success: true }
  } catch (error: any) {
    return {
      error: { status: 400, message: 'Something went wrong' },
    }
  }
}
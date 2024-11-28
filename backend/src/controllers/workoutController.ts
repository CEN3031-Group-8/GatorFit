import { Workout } from '../models'

export const saveWorkout = async (data: any) => {
  try {
    const newWorkout = new Workout({ ...data })
    await newWorkout.save()
    return { success: true }
  } catch (error: any) {
    return {
      error: { status: 400, message: 'Something went wrong' },
    }
  }
}
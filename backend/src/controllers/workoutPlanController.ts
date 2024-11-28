import { activeWorkoutPlan, WorkoutPlan } from '../models'

export const saveWorkoutPlan = async (data: any) => {
  try {
    const newWorkoutPlan = new WorkoutPlan({ ...data })
    const newActiveWorkoutPlan = new activeWorkoutPlan({ creator: newWorkoutPlan.creator, workoutPlan: newWorkoutPlan })
    await newWorkoutPlan.save()
    await newActiveWorkoutPlan.save()
    return { success: true }
  } catch (error: any) {
    return {
      error: { status: 400, message: 'Something went wrong' },
    }
  }
}
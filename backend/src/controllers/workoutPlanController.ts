import { parseJsonText } from 'typescript'
import { ActiveWorkoutPlan, WorkoutPlan } from '../models'

export const saveWorkoutPlan = async (data: any) => {
  try {
    console.log(data)
    const newWorkoutPlan = new WorkoutPlan({ ...data })
    await newWorkoutPlan.save()
    const currentActiveWorkoutPlan = await ActiveWorkoutPlan.findOne({creator : newWorkoutPlan.creator._id})
    if (currentActiveWorkoutPlan) {
      currentActiveWorkoutPlan.workoutPlan = newWorkoutPlan.id
      await currentActiveWorkoutPlan.save()
    } else {
      const newActiveWorkoutPlan = new ActiveWorkoutPlan({ creator: newWorkoutPlan.creator, workoutPlan: newWorkoutPlan })
      await newActiveWorkoutPlan.save()
    } 
    return { success: true }
  } catch (error: any) {
    console.log(error)
    return {
      error: { status: 400, message: 'Something went wrong' },
    }
  }
}

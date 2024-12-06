import { Workout, ActiveWorkoutPlan, WorkoutPlan } from '../models'

export const saveWorkout = async (data: any) => {
  try {
    const newWorkout = new Workout({ ...data })
    const activeWorkoutPlan = await ActiveWorkoutPlan.findOne({ creator: data.creator}).populate('workoutPlan')
    console.log(activeWorkoutPlan)
    // set activeWorkoutIndex to next day
    if(activeWorkoutPlan) {
      activeWorkoutPlan.workoutDayIndex = (activeWorkoutPlan.workoutDayIndex + 1) % activeWorkoutPlan.workoutPlan.workoutDays.length
      await activeWorkoutPlan.save()
    }
    await newWorkout.save()
    return { success: true }
  } catch (error: any) {
    return {
      error: { status: 400, message: 'Something went wrong' },
    }
  }
}
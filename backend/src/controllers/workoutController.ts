import { Workout, ActiveWorkoutPlan, WorkoutPlan } from '../models'
import { Post } from '../models/Post'

export const saveWorkout = async (data: any) => {
  try {
    const newWorkout = new Workout({ ...data })
    const activeWorkoutPlan = await ActiveWorkoutPlan.findOne({ creator: data.creator}).populate('workoutPlan')
    // set activeWorkoutIndex to next day
    if(activeWorkoutPlan) {
      activeWorkoutPlan.workoutDayIndex = (activeWorkoutPlan.workoutDayIndex + 1) % activeWorkoutPlan.workoutPlan.workoutDays.length
      await activeWorkoutPlan.save()
    }
    // create post
    const postData = {
      creator: newWorkout.creator,
      workout: newWorkout,
      message: "I just finished " + newWorkout.title + "!"
    }
    const newPost = new Post({ ...postData})
    await newPost.save()
    await newWorkout.save()
    return { success: true }
  } catch (error: any) {
    return {
      error: { status: 400, message: 'Something went wrong' },
    }
  }
}
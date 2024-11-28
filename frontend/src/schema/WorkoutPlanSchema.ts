import * as z from 'zod'
import { Exercise, WorkoutDay } from '../app/(protected)/create-workout/CreateWorkoutForm'

export const WorkoutPlanSchema = z
  .object({
    workoutPlanTitle: z
      .string()
      .min(1, { message: 'Title must be at least 1 characters' })
      .max(20, { message: 'Title must be at most 20 characters' }),
    // workoutDays: z
    // .array(z.)
  })
  // .refine((data) => data.password === data.confirm, {
  //   message: 'Passwords do not match',
  //   path: ['confirm'],
  // })

export type WorkoutPlanOptions = z.infer<typeof WorkoutPlanSchema>

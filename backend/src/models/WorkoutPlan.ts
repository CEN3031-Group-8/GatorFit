import { Schema, model } from 'mongoose'
import { exerciseSchema, userSchema} from './'

export const exercisePlanSchema = new Schema({
  exercise: {
    type: exerciseSchema,
    required: true
  },
  numSets: {
    type: Number,
    required: true
  }
})

export const workoutDaySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: false,
    minlength: 3,
    maxlength: 20,
  },
  exercisePlans: {
    type: [exercisePlanSchema]
  }
})

export const workoutPlanSchema = new Schema({
  creator: {
    type: userSchema,
    required: true
  },
  title: {
    type: String,
    required: true,
    unique: false,
    minlength: 3,
    maxlength: 20,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  workoutDays: {
    type: [workoutDaySchema]
  }
})

export const activeWorkoutPlan = new Schema({
  creator: {
    type: userSchema,
    required: true
  },
  workoutPlan: {
    type: workoutPlanSchema,
    required: true
  }
})

// Create models
export const WorkoutPlan = model('WorkoutPlan', workoutPlanSchema);
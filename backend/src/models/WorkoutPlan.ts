import { Schema, model } from 'mongoose'
import { exerciseSchema, userSchema, workoutSchema } from './'

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
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  workoutDays: {
    type: [workoutDaySchema]
  }
})

// Create models
export const WorkoutPlan = model('WorkoutPlan', workoutPlanSchema);
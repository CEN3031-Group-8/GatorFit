import { Schema, model } from 'mongoose'
import { exerciseSchema, userSchema} from './'

export const plannedExerciseSchema = new Schema({
  exercise: {
    type: String,
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
    minlength: 1,
    maxlength: 20,
  },
  plannedExercises: {
    type: [plannedExerciseSchema]
  }
})

export const workoutPlanSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: false
  },

  title: {
    type: String,
    required: true,
    minlength: 1,
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

export const activeWorkoutPlanSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  workoutPlan: {
    type: Schema.Types.ObjectId,
    ref: 'WorkoutPlan',
    required: true
  },
  workoutDayIndex: {
    type: Number,
    required: true,
    default: 0
  }
})

// Create models
export const WorkoutPlan = model('WorkoutPlan', workoutPlanSchema);
export const ActiveWorkoutPlan = model('ActiveWorkoutPlan', activeWorkoutPlanSchema);
import { Schema, model } from 'mongoose'

export const setSchema = new Schema({
    reps: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    }
})

export const exerciseSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false,
        minlength: 3,
        maxlength: 20,
    },
    sets: {
        type: [setSchema]
    }
})

export const workoutSchema = new Schema({
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
  exercises: {
    type: [exerciseSchema]
  }
})

// Create models
export const Workout = model('Workout', workoutSchema);
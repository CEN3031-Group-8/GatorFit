import { Schema, model } from 'mongoose'
import { userSchema } from './'

export const postSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  workout: {
    type: Schema.Types.ObjectId,
    ref: 'Workout',
    required: true
  },
  message: {
    type: String,
    maxlength: 250,
    required: false
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

// Create models
export const Post = model('Post', postSchema);
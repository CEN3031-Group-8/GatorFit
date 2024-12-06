import { Schema, model } from 'mongoose'

export const followSchema = new Schema({
  follower: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  followee: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

// Create models
export const Follow = model('Follow', followSchema);
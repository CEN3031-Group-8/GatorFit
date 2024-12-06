import { Schema, model } from 'mongoose'

export const likeSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

// Create models
export const Like = model('Like', likeSchema);
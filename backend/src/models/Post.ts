import mongoose, { Schema, model, mongo } from 'mongoose'
import { userSchema } from './'
import { Like } from './Like';

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

postSchema.methods.getLikeCount = async function (): Promise<number> {
    const likeCount = await Like.countDocuments({ post: this._id });
    return likeCount;
};

// Create models
export const Post = model('Post', postSchema);
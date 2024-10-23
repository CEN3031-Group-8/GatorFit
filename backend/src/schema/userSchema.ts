import { Schema } from 'mongoose'

export const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  },
  password: {
    type: String,
    required: true,
    length: 60,
  },
  emailVerified: {
    type: Date,
  },
})

userSchema.set('toObject', {
  transform: (_, ret) => {
    delete ret.__v
    return ret
  },
})

// Initializes the express app
import cors from 'cors'
import dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from 'express'
import mongoose from 'mongoose'

import routes from './routes'

dotenv.config()

if (!process.env.MONGO_URI) {
  throw new Error('Missing environment variable: MONGO_URI')
}

if (!process.env.API_KEY) {
  throw new Error('Missing environment variable: API_KEY')
}

if (!process.env.FRONTEND_URL) {
  throw new Error('Missing environment variable: FRONTEND_URL')
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

const app = express()
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const validateAuth = (req: Request, res: Response, next: NextFunction) => {
  const key = req.get('Authorization')
  if (key === process.env.API_KEY) {
    next()
  } else {
    res.status(401).json({ error: 'Invalid/missing API key' })
  }
}

app.use(validateAuth)
app.use('/', routes)

export default app

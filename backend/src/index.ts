// Initializes the express app
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'

dotenv.config()
const mongoUri = process.env.MONGO_URI || ''

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

const app = express()
app.use('/', routes)

export default app

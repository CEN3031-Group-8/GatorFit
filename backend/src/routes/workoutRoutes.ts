// Houses all of the express routes
import express from 'express'

import { saveWorkout } from '../controllers/workoutController'

const routes = express.Router()

routes.post('/workout', async (req, res) => {
  const { success, error } = await saveWorkout(req.body)
  if (success) {
    console.log('POST /workout 200')
    res.sendStatus(200)
  } else if (error) {
    console.log(`POST /workout ${error.status}`)
    res.status(error.status).json({ error: error.message })
  }
})

export default routes

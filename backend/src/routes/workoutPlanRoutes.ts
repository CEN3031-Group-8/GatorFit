// Houses all of the express routes
import express from 'express'

import { saveWorkoutPlan } from '../controllers/workoutPlanController'

const routes = express.Router()

routes.post('/create-workout', async (req, res) => {
  const { success, error } = await saveWorkoutPlan(req.body)
  if (success) {
    console.log('POST /workout 200')
    res.sendStatus(200)
  } else if (error) {
    console.log(`POST /workout ${error.status}`)
    res.status(error.status).json({ error: error.message })
  }
})

export default routes

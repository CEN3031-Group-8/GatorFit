// Houses all of the express routes
import express from 'express'

import { login, register } from './controllers/userController'
import { saveWorkoutPlan } from './controllers/workoutPlanController'
import { saveWorkout } from './controllers/workoutController'


const routes = express.Router()

routes.post('/register', async (req, res) => {
  const { success, error } = await register(req.body)
  if (success) {
    console.log('POST /login 200')
    res.sendStatus(200)
  } else if (error) {
    console.log(`POST /register ${error.status}`)
    res.status(error.status).json({ error: error.message })
  }
})

routes.post('/login', async (req, res) => {
  const { error, payload } = await login(req.body)
  if (payload) {
    console.log('POST /login 200')
    res.json(payload)
  } else if (error) {
    console.log(`POST /login ${error.status}`)
    res.status(error.status).json({ error: error.message })
  }
})

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
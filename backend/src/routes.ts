// Houses all of the express routes
import express from 'express'

import { login, register } from './data'

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

export default routes

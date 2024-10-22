// Houses all of the express routes
import express from 'express'

import { register } from './data'

const routes = express.Router()

routes.post('/register', async (req, res) => {
  const { success, error } = await register(req.body)
  if (success) {
    res.status(200)
    res.send()
  } else {
    res.status(error.status)
    res.send(JSON.stringify({ error: error.message }))
  }
})

export default routes

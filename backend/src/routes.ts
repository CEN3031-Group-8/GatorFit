// Houses all of the express routes
import express from 'express'

const routes = express.Router()

routes.get('/', (req, res) => {
  res.send('root')
})

export default routes

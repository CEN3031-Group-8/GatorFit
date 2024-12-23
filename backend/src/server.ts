// Entry point for the app
import app from './config'
import { Follow } from './models'

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log('GatorFit Backend Running')
  console.log(`listening on port ${port}`)
})
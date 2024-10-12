// Entry point for the app
import app from './index'

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`GatorFit Backend Up\nlistening on port ${port}`)
})

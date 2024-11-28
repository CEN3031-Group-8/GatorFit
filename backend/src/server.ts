// Entry point for the app
import app from './config'

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log('GatorFit Backend Running')
  console.log(`listening on port ${port}`)
})

// import { Workout } from './models/Workout'


// const testWorkout = new Workout({
//   title: "Leg Day Workout",
//   exercises: [
//     {
//       title: "Squats",
//       sets: [
//         { reps: 10, weight: 100 },
//         { reps: 8, weight: 120 }
//       ]
//     },
//     {
//       title: "Lunges",
//       sets: [
//         { reps: 12, weight: 40 },
//         { reps: 10, weight: 50 }
//       ]
//     }
//   ]
// })
// testWorkout.save()
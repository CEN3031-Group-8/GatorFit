// Houses all of the express routes
import express from 'express'

import { login, register } from './controllers/userController'
import { saveWorkoutPlan } from './controllers/workoutPlanController'
import { saveWorkout } from './controllers/workoutController'
import { saveLike } from './controllers/likeController'

import { ActiveWorkoutPlan, Follow, Like, Post, User } from './models'
import { saveFollow } from './controllers/followController'


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

routes.get('/get-active-workout/:userid', async (req, res) => {
  const activeWorkoutPlan = await ActiveWorkoutPlan.findOne({ creator: req.params.userid}).populate('workoutPlan')
  console.log(activeWorkoutPlan);
  if (activeWorkoutPlan) {
    res.status(200).json(activeWorkoutPlan)
  } else {
    res.status(400).json({error : "Could not find active workout plan"})
  }
})

routes.get('/get-feed/:userid', async (req, res) => {
  try {
    // const activeWorkoutPlan = await ActiveWorkoutPlan.findOne({ creator: req.params.userid}).populate('workoutPlan')
    const followObjects = await Follow.find({ follower: req.params.userid})
    const followeeIds = followObjects.map(item => item.followee)
    const posts = await Post.find({ creator: { $in: followeeIds } }).populate(['workout','creator',])
    const updatedPosts : any = []
    for (let i = 0; i < posts.length; i++) {
      const post: any = posts[i]
      const numLikes = await post.getLikeCount()
      const updatedPost: any = posts[i].toObject()
      updatedPost.numLikes = numLikes

      const liked = await Like.findOne({ creator: req.params.userid, post: post._id})
      if(liked) updatedPost.liked = true
      else updatedPost.liked = false
      updatedPosts.push(updatedPost)
    }
    res.status(200).json(updatedPosts)
  } catch {
    res.status(400).json({error : "Something went wrong"})
  }
})

routes.post('/create-like/:userid/:postid', async (req, res) => {
  try {
    const likeData = {
      creator: req.params.userid,
      post: req.params.postid
    }
    await saveLike(likeData)
    console.log('POST /workout 200')
    res.sendStatus(200)
  } catch (error) {
    res.status(400).json({error : "Something went wrong"})

  }
})

routes.post('/delete-like/:userid/:postid', async (req, res) => {
  try {
    await Like.deleteOne({ creator: req.params.userid})
    console.log('POST /workout 200')
    res.sendStatus(200)
  } catch (error) {
    res.status(400).json({error : "Something went wrong"})

  }
})

routes.get('/search-users/:query/:userid', async (req, res) => {
  try {
    const users = await User.find({ username: { $regex: req.params.query, $options: 'i' } })
    const updatedUsers: any = []
    for(let i = 0; i < users.length; i++) {
      const user = users[i]
      const updatedUser: any = user.toObject()
      const following = await Follow.findOne({ follower: req.params.userid, followee: user._id })
      if(following) updatedUser.following = true
      else updatedUser.following = false
      updatedUsers.push(updatedUser)
    }
    res.status(200).json(updatedUsers)
  } catch {
    res.status(400).json({error : "Something went wrong"})
  }
})

routes.post('/create-follow/:followerid/:followeeid', async (req, res) => {
  try {
    const followData = {
      follower: req.params.followerid,
      followee: req.params.followeeid
    }
    await saveFollow(followData)
    console.log('POST /follow 200')
    res.sendStatus(200)
  } catch (error) {
    res.status(400).json({error : "Something went wrong"})

  }
})

routes.post('/delete-follow/:followerid/:followeeid', async (req, res) => {
  try {
    await Follow.deleteOne({ follower: req.params.followerid, followee: req.params.followeeid})
    res.sendStatus(200)
  } catch (error) {
    res.status(400).json({error : "Something went wrong"})

  }
})

export default routes

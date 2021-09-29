const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Photo = require('../models/photo')
const Recipe = require('../models/recipe')
const Comment = require('../models/comment')
const Reply = require('../models/reply')

/* GET users listing. */
router.get('/', async (req, res) => {
  const query = {}

  if (req.query.name) {
    query.name = req.query.name
  }

  if (req.query.email) {
    query.email = req.query.email
  }

  res.send(await User.find(query))
})

/* POST create a user */
router.post('/', async (req, res) => {
  const createdUser = await User.create(req.body)
  res.send(createdUser)
})

router.get('/initialize', async (req, res) => {
  const selman = await User.create({ name: 'selman', email: 'selman@gmail.com' })
  const armagan = await User.create({ name: 'armagan', email: 'armagan@gmail.com' })
  const neslihan = await User.create({ name: 'neslihan', email: 'neslihan@gmail.com' })

  const armaganKitchen = await Photo.create({ photoname: 'armaganKitchen.jpg' })
  const neslihanKitchen = await Photo.create({ photoname: 'neslihanKitchen.jpg' })
  const selmanKitchen = await Photo.create({ photoname: 'selmanKitchen.jpg' })

  await armagan.addPhoto(armaganKitchen)
  await neslihan.addPhoto(neslihanKitchen)
  await selman.addPhoto(selmanKitchen)

  await neslihan.likePhoto(armaganKitchen)
  await selman.likePhoto(armaganKitchen)
  await armagan.likePhoto(selmanKitchen)
  await selman.likePhoto(neslihanKitchen)

  const recipeMucver = await Recipe.create({ recipename: 'Mucver' })
  const recipeBakedSalmon = await Recipe.create({ recipename: 'Baked Salmon' })
  const recipeFishAndChips = await Recipe.create({ recipename: 'Fish and Chips' })

  await armagan.addRecipe(recipeMucver)
  await selman.likeRecipe(recipeMucver)

  await selman.addRecipe(recipeBakedSalmon)
  await neslihan.likeRecipe(recipeBakedSalmon)

  await neslihan.addRecipe(recipeFishAndChips)
  await armagan.likeRecipe(recipeFishAndChips)
  await selman.likeRecipe(recipeFishAndChips)

  const commentSelman = await Comment.create({ comment: 'Taste my delicious baked Salmon' })
  const commentSelman2 = await Comment.create({ comment: 'What do you think about my profile?' })
  await selman.addComment(commentSelman)
  await armagan.likeComment(commentSelman)
  await selman.addComment(commentSelman2)
  await neslihan.likeComment(commentSelman2)

  const replyNeslihan = await Reply.create({ reply: 'Tastes great!' })
  await neslihan.replyComment(commentSelman, replyNeslihan)
  await selman.likeReply(replyNeslihan)
  await armagan.likeReply(replyNeslihan)
  res.sendStatus(200)
})

router.post('/:userId/photos', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const photo = await Photo.findById(req.body.photoId)

  await user.addPhoto(photo)
  res.sendStatus(200)
})

router.post('/:userId/likedPhotos', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const photo = await Photo.findById(req.body.photoId)

  await user.likePhoto(photo)
  res.sendStatus(200)
})

router.post('/:userId/recipes', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const recipe = await Recipe.findById(req.body.recipeId)

  await user.addRecipe(recipe)
  res.sendStatus(200)
})

router.post('/:userId/likedRecipes', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const recipe = await Recipe.findById(req.body.recipeId)

  await user.likeRecipe(recipe)
  res.sendStatus(200)
})

router.post('/:userId/comments', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const comment = await Comment.findById(req.body.photoId)

  await user.addComment(comment)
  res.sendStatus(200)
})

router.post('/:userId/likedComments', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const comment = await Comment.findById(req.body.photoId)

  await user.likeComment(comment)
  res.sendStatus(200)
})

router.get('/:userId', async (req, res) => {
  // const user = users[req.params.userId]
  const user = await User.findById(req.params.userId)

  if (user) res.render('user', { user })
  else res.sendStatus(404)
})

router.get('/:userId/json', async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.send(user)
})

module.exports = router

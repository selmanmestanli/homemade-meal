const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Photo = require('../models/photo')
const Recipe = require('../models/recipe')

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

router.get('/initialize', async (req, res) => {
  const selman = await User.create({ name: 'selman', email: 'selman@gmail.com' })
  const armagan = await User.create({ name: 'armagan', email: 'armagan@gmail.com' })
  const neslihan = await User.create({ name: 'neslihan', email: 'neslihan@gmail.com' })

  const berlinPhoto = await Photo.create({ photoname: 'berlin.jpg' })
  const munichPhoto = await Photo.create({ photoname: 'munich.jpg' })

  await armagan.addPhoto(berlinPhoto)
  await neslihan.addPhoto(munichPhoto)

  await neslihan.likePhoto(berlinPhoto)
  await selman.likePhoto(berlinPhoto)

  const recipeMucver = await Recipe.create({ recipename: 'Mucver' })

  await armagan.addRecipe(recipeMucver)
  await selman.likeRecipe(recipeMucver)

  res.sendStatus(200)
})

router.get('/:userId', async (req, res) => {
  // const user = users[req.params.userId]
  const user = await User.findById(req.params.userId)

  if (user) res.render('user', { user })
  else res.sendStatus(404)
})

module.exports = router

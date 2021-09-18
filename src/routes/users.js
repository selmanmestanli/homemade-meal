const express = require('express')

const router = express.Router()

const User = require('../models/user')
const Photo = require('../models/photo')
const Recipe = require('../models/recipe')

const selman = new User('selman', 'selman@gmail.com')
const armagan = new User('armagan', 'armagan@gmail.com')

const neslihan = new User('neslihan', 'neslihan@gmail.com')

const berlinPhoto = new Photo('berlin.jpg')
const munichPhoto = new Photo('munich.jpg')

armagan.addPhoto(berlinPhoto)
neslihan.addPhoto(munichPhoto)

neslihan.likePhoto(berlinPhoto)
selman.likePhoto(berlinPhoto)

const recipeMucver = new Recipe('Mucver')
armagan.addRecipe(recipeMucver)
selman.likeRecipe(recipeMucver)

const users = [selman, armagan, neslihan]

/* GET users listing. */
router.get('/', (req, res) => {
  let result = users

  if (req.query.name) {
    result = users.filter(user => user.name == req.query.name)
  }

  res.send(result)
})

router.get('/:userId', (req, res) => {
  const user = users[req.params.userId]

  if (user) res.render('user', { user })
  else res.sendStatus(404)
})

module.exports = router

const express = require('express')

const router = express.Router()
const Recipe = require('../models/recipe')

/* POST create a recipe */
router.post('/', async (req, res) => {
  const createdRecipe = await Recipe.create(req.body)
  res.send(createdRecipe)
})

module.exports = router

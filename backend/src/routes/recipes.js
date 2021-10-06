const express = require('express')

const router = express.Router()
const Recipe = require('../models/recipe')

/* POST create a recipe */
router.post('/', async (req, res) => {
  const recipeToCreate = {
    recipename: req.body.recipename,
  }

  const createdRecipe = await Recipe.create(recipeToCreate)
  res.send(createdRecipe)
})

module.exports = router

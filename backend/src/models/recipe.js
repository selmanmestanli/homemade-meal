const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const recipeSchema = new mongoose.Schema({
  recipename: String,
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
  ],
  addedBy: String,
})

recipeSchema.plugin(autopopulate)
module.exports = mongoose.model('Recipe', recipeSchema)

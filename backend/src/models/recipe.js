const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const recipeSchema = new mongoose.Schema({
  recipename: {
    type: String,
    required: true,
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { maxDepth: 2 },
    },
  ],
  addedBy: {
    type: String,
    ref: 'User',
  },
})

recipeSchema.plugin(autopopulate)
module.exports = mongoose.model('Recipe', recipeSchema)

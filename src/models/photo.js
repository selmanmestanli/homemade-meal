const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const photoSchema = new mongoose.Schema({
  photoname: String,
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
  ],
  addedBy: String,
})

photoSchema.plugin(autopopulate)
module.exports = mongoose.model('Photo', photoSchema)

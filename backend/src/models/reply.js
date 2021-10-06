const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const replySchema = new mongoose.Schema({
  reply: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    ref: 'Comment',
    required: true,
  },
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
  ],
  author: String,
})

replySchema.plugin(autopopulate)
module.exports = mongoose.model('Reply', replySchema)

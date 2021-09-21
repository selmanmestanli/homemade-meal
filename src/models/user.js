const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: String,
  postCode: Number,
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
      autopopulate: true,
    },
  ],
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      autopopulate: true,
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      autopopulate: true,
    },
  ],
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reply',
      autopopulate: true,
    },
  ],
  likedPhotos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
    },
  ],
  likedRecipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
    },
  ],
  likedComments: [],
  likedReplies: [],
})
class User {
  async addRecipe(recipe) {
    this.recipes.push(recipe)
    recipe.addedBy = this.name

    await recipe.save()
    await this.save()
  }

  async addPhoto(photo) {
    this.photos.push(photo)
    photo.addedBy = this.name

    await photo.save()
    await this.save()
  }

  addComment(comment) {
    this.comments.push(comment)
    comment.author = this.name
  }

  replyComment(comment, reply) {
    comment.repliedBy.push(this)
    reply.author = this.name
    this.replies.push(comment, reply)
  }

  async likePhoto(photo) {
    photo.likedBy.push(this)
    this.likedPhotos.push(photo)

    await photo.save()
    await this.save()
  }

  async likeRecipe(recipe) {
    recipe.likedBy.push(this)
    this.likedRecipes.push(recipe)

    await recipe.save()
    await this.save()
  }

  likeComment(comment) {
    comment.likedBy.push(this)
    this.likedComments.push(comment)
  }

  likeReply(reply) {
    reply.likedBy.push(this)
    this.likedReplies.push(reply)
  }
}

userSchema.loadClass(User)
userSchema.plugin(autopopulate)

module.exports = mongoose.model('User', userSchema)

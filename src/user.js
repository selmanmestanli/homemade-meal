class User {
  constructor(name, email, address, postCode) {
    this.name = name;
    this.email = email;
    this.address = address
    this.postCode = postCode
    this.photos = [];
    this.recipes = [];
    this.comments = [];
    this.replies = [];
    this.likedPhotos = [];
    this.likedRecipes = [];
    this.likedComments = [];
    this.likedReplies = [];
  }

  addRecipe(recipe) {
      this.recipes.push(recipe);
      recipe.addedBy = this.name
  }

  addPhoto(photo) {
      this.photos.push(photo);
      photo.addedBy = this.name
  }

  addComment(comment) {
      this.comments.push(comment);
      comment.author = this.name
  }

  replyComment(comment, reply) {
      comment.repliedBy.push(this);
      reply.author = this.name
    this.replies.push(comment, reply);
  }

  likePhoto(photo) {
    photo.likedBy.push(this);
    this.likedPhotos.push(photo);
  }

  likeRecipe(recipe) {
    recipe.likedBy.push(this);
    this.likedRecipes.push(recipe);
  }

  likeComment(comment) {
    comment.likedBy.push(this);
    this.likedComments.push(comment);
  }
  likeReply(reply) {
    reply.likedBy.push(this);
    this.likedReplies.push(reply);
  }
}

module.exports = User

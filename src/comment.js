class Comment {
  constructor(comment) {
    this.comment = comment
    this.likedBy = []
    this.repliedBy = []
    this.author = ''
  }
}

module.exports = Comment

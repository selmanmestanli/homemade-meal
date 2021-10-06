const express = require('express')

const router = express.Router()
const Comment = require('../models/comment')

/* POST create a comment */
router.post('/', async (req, res) => {
  const commentToCreate = {
    comment: req.body.comment,
  }

  const createdComment = await Comment.create(commentToCreate)
  res.send(createdComment)
})

module.exports = router

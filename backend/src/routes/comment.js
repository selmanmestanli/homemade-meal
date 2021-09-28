const express = require('express')

const router = express.Router()
const Comment = require('../models/comment')

/* POST create a comment */
router.post('/', async (req, res) => {
  const createdComment = await Comment.create(req.body)
  res.send(createdComment)
})

module.exports = router

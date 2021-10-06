const express = require('express')

const router = express.Router()
const Photo = require('../models/photo')

/* POST create a photo */
router.post('/', async (req, res) => {
  const photoToCreate = {
    photoname: req.body.photoname,
  }

  const createdPhoto = await Photo.create(photoToCreate)
  res.send(createdPhoto)
})

module.exports = router

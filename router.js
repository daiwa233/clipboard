const express = require('express')
const router = express.Router()
const { upload, initZone } = require('./controller')
router.post('/initzone', (req, res) => {
  initZone(req, res)
})

router.post('/upload', (req, res) => {
  upload(req, res)
})

module.exports = router
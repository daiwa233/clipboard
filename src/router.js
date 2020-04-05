const express = require('express')
const router = express.Router()
const { upload, initZone, isInitial, quit } = require('./controller')

// 初始化云存储空间
router.post('/initzone', (req, res) => {
  initZone(req, res)
})
// 上传图片
router.post('/upload', (req, res) => {
  upload(req, res)
})
// 判断用户是否初始化过
router.get('/isInitial', (req, res) => {
  isInitial(req, res)
})
// 退出
router.get('/quit', (req, res) => {
  quit(req, res)
})

module.exports = router
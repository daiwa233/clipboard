const express = require('express')
const router = express.Router();
const multer = require('multer');
const { upload, initZone, isInitial, quit } = require('./controller')
let FileLimit = 5*1024*1024;
const uploadMiddleWare = multer({
  limits: {
    fileSize: FileLimit
  }
})
// 初始化云存储空间
router.post('/initzone', (req, res, next) => {
  initZone(req, res, next)
})
// 上传图片
router.post('/upload',uploadMiddleWare.any(), (req, res, next) => {
  upload(req, res, next)
})
// 判断用户是否初始化过
router.get('/isInitial', (req, res, next) => {
  isInitial(req, res, next)
})
// 退出
router.get('/quit', (req, res, next) => {
  quit(req, res, next)
})

module.exports = router
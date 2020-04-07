const {
  initQiniu
} = require('./zone/qiniu');
const {
  success,
  notInitial,
  alreadyExist,
  wrongConf,
  missConf
} = require('./config/index')
const { bufferToStream } = require('./util');
module.exports = {
  // 初始化空间实例
  initZone(req, res, next) {
    // 如果req中存在session，则返回
    if (req.session.data) {
      return res.status(400).json(alreadyExist)
    }
    // 还需要一个域名的参数
    // 占坑，允许设置cookie的时长
    const {
      type,
      accessKey,
      secretKey,
      scope, // 空间
      zone, // 空间所在地区
      domain // 域名，用于返回上传后的图片的连接
    } = req.body;
    if (!(accessKey && secretKey && scope && zone && domain))
      return res.json(missConf)

    let instance;
    if (type === 'qiniu') {
      instance = initQiniu(req.body);
    }
    // 测试云存储空间实例能否正常工作
    if (instance) {

      return instance.uploadTest()
        .then(resBody => {
          // 上传成功,设置session
          req.session.data = {
            type,
            accessKey,
            secretKey,
            scope, // 空间
            zone, // 空间所在地区
            domain // 域名，用于返回上传后的图片的连接
          }
          return res.json(success)
        })
        .catch(err => {   
          // 出现错误
          res.json(wrongConf);
          return next(err);
        })
    }

    // 没有对应的类型则返回
    return res.json({...wrongConf, tips: 'type is not avaliable'})

  },
  // 向云存储空间上传
  upload(req, res, next) {
    if (!req.session.data) {
      return res.json(notInitial)
    }
    const {
      Fname
    } = req.body,
    FileList = req.files;

    if (!(FileList && Fname)) {
      return res.json(missConf)
    }
      
    const {
      type,
      domain
    } = req.session.data;

    let instance;
    // 这次木需要判断instance不存在的情况
    if (type === 'qiniu') {
      instance = initQiniu(req.session.data);
    }
    return instance
      .upload(Fname, bufferToStream(FileList[0].buffer))
      .then(resBody => {
        return res.json({...success, url: `${domain}/${Fname}`});
      })
      .catch(err => {
        // 出现错误
        res.json(wrongConf);
        return next(err)
      })

  },
  // 是否已经创建了存储空间
  isInitial(req, res) {
    if (req.session.data) {
      return res.json(success)
    } else {
      return res.json(notInitial)
    }

  },
  // 退出
  // 持久化的session是否需要清除掉？
  quit(req, res) {
    if (req.session.data) {
      req.session.data = null;
    }
    return res.json(success)
  }
}
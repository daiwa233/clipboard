const initQiniu = require('./zone/qiniu');
const { initImgName } = require('./util')
module.exports = {
  // 初始化空间实例
  initZone(req, res, next) {
    // 如果req中存在session，则返回
    if (req.session.data) {
      return res.status(400).json({
        message: 'a zone has been exist',
        status: 400
      })
    }
    // 还需要一个域名的参数
    // 占坑，允许设置cookie的时长
    const { 
      type,
      accessKey,
      secretKey,
      scope,
      zone,
      domain
     } = req.body;
    if (!(accessKey && secretKey && scope && zone && domain))
    return res.json({
      status: 402,
      message: 'someconfig is required'
    })

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
          instance
        }
        return res.json({
          status: 200,
          message: 'init zone successfully'
        })
      })
      .catch(err => {
        // 出现错误
        return res.json({
          status: 401,
          message: 'someconfig is wrong'
        })
      })
    }

    // 没有创建实例返回
    return res.json({
      status: 402,
      message: 'zone type is not avaliable'
    })
    
  },
  // 向云存储空间上传
  upload(req, res) {
    const imgName = initImgName(),
          { ImgBlob } = req.body,
          { instance } = req.session.data;
    return instance
      .upload(imgName, ImgBlob)
      .then(resBody => {
        return res.json({
          status: 200,
          url: `${this.domain}/${imgName}`,
          message: 'ok'
        })
      })
      .catch(err => {
        // 出现错误
        return res.json({
          status: 401,
          message: 'someconfig is wrong'
        })
      })

  },
  // 是否已经创建了存储空间
  isInitial(req, res) {
    if (req.session.data) {
      return res.json({
        status: 200,
        message: 'have been initialed'
      })
    } else {
      return res.json({
        status: 201,
        message: 'did not initial'
      })
    }

  },
  // 退出
  // 持久化的session是否需要清除掉？
  quit(req, res) {
    if (req.session.data) {
      req.session.data = null;
    }
    return res.json({
        status: 200,
        message: 'ok'
    })
  }
}
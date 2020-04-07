const qiniu = require('qiniu');
const path = require('path');
const { initImgName } = require('../util');
const testFilePath = path.resolve(__dirname, '../../test.png');
const testFileName = initImgName();
class Qiniu {
  /**
   * 需要的配置项
   * accessKey
   * secretKey
   * scope 空间名
   * zone 空间所处的机房
   * @param {Object} options 
   */
  constructor(options) {
    const {
      accessKey,
      secretKey,
      scope, // 空间
      zone, // 空间所在地区
    } = options;
    console.log(options)
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone[zone];
    const putPolicy = new qiniu.rs.PutPolicy({
      scope,
      returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    });

    this.uploadToken = putPolicy.uploadToken(mac);
    this.uploader = new qiniu.form_up.FormUploader(config)
    this.putExtra = new qiniu.form_up.PutExtra();

  }
  /**
   * 
   * @param {String} method 七牛云上传文件的方法
   * @param {String} name  文件名
   * @param {any} content 文件内容或文件路径或可读流
   */
  upload(name, content, method='putStream') {
    return new Promise((resolve, reject) => {
      this.uploader[method](this.uploadToken, name, content, this.putExtra, function (respErr, respBody, respInfo) {
        
        if (respErr) {
          return reject(respErr);
        }
        if (respInfo.statusCode == 200) {
          resolve(respBody)
        } else {
          
          reject(respInfo);
        }
      });
      
    })
  }

  uploadTest() {
    return this.upload( testFileName, testFilePath, 'putFile')
  }
}

module.exports = {
  initQiniu(opts) {
      return new Qiniu(opts)
  }
}
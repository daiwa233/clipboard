const qiniu = require('qiniu');


module.exports = class Qiniu{
  /**
   * 需要的配置项
   * accessKey
   * secretKey
   * scope
   * @param {Object} options 
   */
  constructor(options) {
    const { accessKey, secretKey, scope } = options;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z2;
    const putPolicy = new qiniu.rs.PutPolicy({
      scope,
      returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    });

    this.uploadToken=putPolicy.uploadToken(mac);
    
    this.uploader = new qiniu.form_up.FormUploader(config)
    this.putExtra = new qiniu.form_up.PutExtra();
    
  }

  upload(key, buffers) {
    return new Promise((resolve, reject) => {
      this.uploader.putStream(this.uploadToken, key, bufferToStream(buffers), this.putExtra, function(respErr,
        respBody, respInfo) {
          
        if (respErr) {
          reject(respErr);
        }
        if (respInfo.statusCode == 200) {
          
          resolve(respBody)
        } else {
          reject(respInfo);
        }
      });
    })
  }

}
const cryptoRandomString = require('crypto-random-string');

module.exports = {
  // 生成一个不重复的img名字
  initImgName() {
    return cryptoRandomString({length: 10, type: 'url-safe'});
  }
}
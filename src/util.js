const cryptoRandomString = require('crypto-random-string');
const Duplex = require('stream').Duplex;

module.exports = {
  // 生成一个不重复的img名字
  initImgName() {
    return cryptoRandomString({length: 10, type: 'url-safe'});
  },
  bufferToStream(buffer) {
    let stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }
}
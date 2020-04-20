
// 读取浏览器中的一部分配置
/**
 * 上传图片的配置项：
 * 1. 要拼接的域名 'domain'， 因为七牛云的SDK不能获得域名
 * 2. cookie的有效期，即保存信息的有效期，默认值为一个月
 * 3. 图片上传大小限制，默认为5M，不建议过大
 * 4. 是否自动生成图片名字，即xxx.png/jpeg, 默认为true
 * 客户端配置：
 * 1. 图片失效时的文字 'AltText'
 * 2. 程序主要是获得一个iframe里面的textarea通过监听事件来完成，但是不可避免的就是
 * 有道云可能会更改这个ID，所以作为一个配置项
 * 3. 
 */

// 其实应该调用Chrome的storageAPI来获得popup脚本存储的配置
// 而不是localStorage
let data = JSON.parse(localStorage.getItem('clipboardData')) || {
	AltText: 'image',
	domain: 'http://img.start-here.cn',
	iframeID: 'mdEditor',
	uploadImpl: 'http://localhost:3001'
};
const { AltText, domain, iframeID } = data;

export { AltText, domain, iframeID, uploadImpl }
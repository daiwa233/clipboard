
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

let item = localStorage.getItem('clipboardData');

let data = JSON.parse(item) || {
			AltText: 'image',
			domain: '',
			iframeID: 'mdEditor',
			uploadImpl: 'http://localhost:3001',
			notInit: true
		},
	isInit = false;

	// 监听storage改变的事件
chrome.storage.onChanged.addListener(function (changes) {

	let { clipboardData } = changes;
	console.log(changes)
	// null 也可以被JSON.parse parse，不会报错，所以此处typeof === 'object'即可
	if (clipboardData && typeof clipboardData.newValue === 'object') {
		
		localStorage.setItem('clipboardData', JSON.stringify(clipboardData.newValue));
	}
	if (clipboardData && clipboardData.oldValue && !clipboardData.newValue) {
		localStorage.removeItem('clipboardData'); // 当清空storage时，删除localStorage中的内容。
	}
});

const { AltText, domain, iframeID, uploadImpl, notInit } = data;

if (!notInit) isInit = true;

export { AltText, domain, iframeID, uploadImpl, isInit }
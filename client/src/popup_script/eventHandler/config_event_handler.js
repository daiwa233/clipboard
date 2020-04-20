import { query, publish } from '../util.js'
export function init() {
	let backBtn = query('#back'),
			submitBtn = query('#submit');
	backBtn.addEventListener('click', function(e) {
		// 此处暂时写死，没有想到很好的解决办法
		publish('toWork', {detail: 'qiniu'})
	})

	submitBtn.addEventListener('click', function(e) {
		e.preventDefault()
		// 更改storage中的配置项
	})

}
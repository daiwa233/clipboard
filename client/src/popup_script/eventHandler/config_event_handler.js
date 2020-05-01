import { query, publish, saveConfig } from '../util.js'
export function init() {
	const backBtn = query('#back'),
			submitBtn = query('#submit');
	backBtn.addEventListener('click', function(e) {
		// 此处暂时写死，没有想到很好的解决办法
		publish('toWork', {detail: 'qiniu'})
	})

	submitBtn.addEventListener('click', function(e) {
		e.preventDefault()
		// 更改storage中的配置项
		const inputList = document.querySelectorAll('input[type="text"]');
		let config = {};
		[...inputList].forEach(item => {
			if (!(item.value)) item.value = item.placeholder;
			config[item.id] = item.value;
		})
		saveConfig(config);
	})

}
import { query, publish } from '../util.js'
export function init() {
	let changeBtn = query('#change-btn'),
			configBtn = query('#config-btn');

	changeBtn.addEventListener('click', function() {
		publish('backToHome')
	})

	configBtn.addEventListener('click', function() {
		publish('toConfig');
	})
}
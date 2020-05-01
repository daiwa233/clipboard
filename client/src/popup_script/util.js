

const query = (str) => document.querySelector(str);

function showMessage(el, str) {
  el.classList.remove('hidden');
  el.innerText = str;
}

function hideMessage(el) {
  el.classList.add('hidden');
  el.innerText = ''
}
let map = {
  qiniu: '七牛云'
}
function publish(type, payload=null) {
  let event = new CustomEvent(type, payload);
  document.body.dispatchEvent(event)
}
export function saveConfig(json, callback) {
  chrome.storage.sync.set({'clipboardData': json}, function() {
    callback && callback()
  })
}

export const uploadImpl = 'http://localhost:3001'

export { query, showMessage, hideMessage, map, publish }
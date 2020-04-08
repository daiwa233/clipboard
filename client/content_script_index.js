import { initEvent } from './src/content_script/event.js'

window.addEventListener('load', function(){
  initEvent();
})
axios.defaults.withCredentials = true;

import { initEvent } from './src/content_script/event.js'
import {
  isInit
} from './src/content_script/config.js'
window.addEventListener('load', function(){
  if (isInit) {
    initEvent();
  } else {
    console.log('如果要使用剪贴板插件，需要先点击扩展程序图标进行初始化。初始化完以后要刷新嗷');
  }
  
})
axios.defaults.withCredentials = true;


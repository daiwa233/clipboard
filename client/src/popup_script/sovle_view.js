import { info, work, home, error, config } from './view.js'
import {
  uploadImpl
} from './util.js'
axios.defaults.withCredentials = true;

function homeToinfo() {
  // 通过浏览器的构造事件的api，实现了一个简单的发布订阅模式。
  document.body.addEventListener('chooseType', function(e) {
    const { detail } = e;
    info(detail)
  })
}

function backToHome() {
  document.body.addEventListener('backToHome', function() {
    // home页面
    home();
  })
}

function toWork() {
  document.body.addEventListener('toWork', function(e) {
    const { detail } = e;
    work(detail);
  })
}
function toConfig() {
  document.body.addEventListener('toConfig', function() {
    config()
  })
}

async function initView() {
  let resData;
  try{
    // 首先先请求接口判断是否已经初始化过了
    resData = await axios
    .get(`${uploadImpl}/isInitial`);
  } catch {
    error('服务器未开启或者其它原因导致请求失败');
    return;
  }
  const { status, type } = resData.data;
  if (status == '200') {
    // 已经初始化
    work(type);
    
  } else if ( status == '301') {
    chrome.storage.sync.clear();// 未初始化时，删除存储中的内容
    home();
    
  }
  // 订阅用户选择类型的事件，改变视图
  homeToinfo();
  backToHome();
  toWork();
  toConfig();
}
export { initView }
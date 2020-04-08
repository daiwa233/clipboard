import { info, work, home } from './view.js'
// 首先先请求接口判断是否已经初始化过了

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

async function initView() {
  const resData = await axios
  .get('http://localhost:3001/isInitial')
  .catch(err => {
    console.log(err)
  });
  const { status, type } = resData.data;
  if (status == '200') {
    // 已经初始化
    work(type);
    
  } else if ( status == '301') {
    // 没有初始化
    home();
  }
  // 订阅用户选择类型的事件，改变视图
  homeToinfo();
  backToHome();
  toWork();
}
export { initView }
import { query, map, publish, uploadImpl } from './util.js'

// 根据状态，添加和删除相应的dom元素，从而替换页面
const APP = query('#app'),
      homeView = query('#home'),
      qiniuInfoView = query('#qiniu-info-view'), // 填写信息的template
      workView = query('#work-view'), // 正在工作的template
      confView = query('#config-view'), // 设置页面的template
      errorView = query('#error-view');
// template dom元素的content属性就是一个文档碎片，所以直接插入即可

function home() {
  import('./eventHandler/home_event_handler.js')
  .then(module => {
    module.init();
  });
  APP.innerHTML = '';
  let clone = document.importNode(homeView.content, true);
  APP.appendChild(clone)
}

// 填写信息页面 ,当前只针对了七牛云，如果是其他云存储空间还要改写。
async function info(type) {
  try{
    let { data } = await axios.get(`${uploadImpl}/isInitial`);
    // 当前做法是直接到之前初始化的云空间的页面，而不一定是用户点击的
    if (data && data.type) {
      publish('toWork', {detail: data.type});
      return;
    } else {
      chrome.storage.sync.clear();// 未初始化时，删除存储中的内容
    }
  } catch {
    error('服务器未开启或者其它原因导致请求失败');
    return;
  }
  let clone;
  // 不同类型直接导致的是不同的填入信息的界面
  if (type === 'qiniu') {
    import('./eventHandler/info_event_handler.js')
    .then(module => {
      // 此处需要动态引入脚本且要保证脚本中的选择器选择到正确的DOM元素
      // 所以调用导出的init方法
      module.QiniuInit();
    }); // 动态引入js 
    clone = document.importNode(qiniuInfoView.content, true);
  }
  APP.innerHTML = '';
  APP.appendChild(clone);
  
}

function work(type) {
  import('./eventHandler/work_event_handler.js')
  .then(module => {
    module.init();
  });
  APP.innerHTML = '';
  let typeBox = workView.content.querySelector('#type');
  typeBox.textContent = map[type];
  let clone = document.importNode(workView.content, true);
  APP.appendChild(clone)
}

function error(msg) {
  APP.innerHTML = '';
  let msgBox = errorView.content.querySelector('#error-view-msg');
  msgBox.textContent = msg;
  let clone = document.importNode(errorView.content, true);
  APP.appendChild(clone)
}

function config() {

  APP.innerHTML = '';
  // 初始化时读取Storage中的配置将其写入placeholder中
  chrome.storage.sync.get(null, function(e) {
    // 获取storage中的数据是异步的，而且猜测是宏任务，所以只能在回调中引入包
    import('./eventHandler/config_event_handler.js')
    .then(module => {
      module.init();
    });
    const form = confView.content.querySelectorAll('input[type="text"]');
    [...form].forEach(item => {
      const {clipboardData: data} = e;
      item.placeholder = data[item.id];
    })
  
    let clone = document.importNode(confView.content, true);
    APP.appendChild(clone)
  });

}

export { info, work, home, error, config }


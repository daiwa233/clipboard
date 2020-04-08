import { query, map } from './util.js'

// 根据状态，添加和删除相应的dom元素，从而替换页面
const APP = query('#app'),
      homeView = query('#home'),
      qiniuInfoView = query('#qiniu-info-view'), // 填写信息的template
      workView = query('#work-view'), // 正在工作的template
      confView = query('#config-view'); // 设置页面的template
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
function info(type) {
  // 不同类型直接导致的是不同的填入信息的界面
  if (type === 'qiniu') {
    import('./eventHandler/info_event_handler.js')
    .then(module => {
      module.init();
    }); // 动态引入js
    APP.innerHTML = '';
    let clone = document.importNode(qiniuInfoView.content, true);
    APP.appendChild(clone)

  }
  
  
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

export { info, work, home }

